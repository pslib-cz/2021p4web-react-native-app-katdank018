import axios from "axios";
import { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
  Keyboard,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { api } from "../configuration/spotifyConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArtistCard from "./ArtistCard";
import ListObject from "./ListObject";
import { styles } from "../styles/Style";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

export const MainPage = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [results, setResults] = useState([]);
  const [artists, setArtists] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const isFocused = useIsFocused();
  const [gotAlbums, setGotAlbums] = useState(false);
  const [hiddenResults, setHiddenResults] = useState(false);

  useEffect(() => {
    if (searchText !== "" && accessToken) {
      setHiddenResults(false);
      axios({
        method: "get",
        url: api + "search?q=" + searchText + "&type=artist&limit=3",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then(function (response) {
          setResults(response.data.artists.items);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setResults([]);
    }
  }, [searchText]);

  useEffect(() => {
    AsyncStorage.getItem("access_token").then((res) => {
      setAccessToken(res);
    });

    AsyncStorage.getItem("artists").then((res) => {
      setArtists(JSON.parse(res));
    });
  }, [accessToken]);

  useEffect(() => {
    if (artists?.length > 0 && !gotAlbums) {
      artists.map((x) => {
        if (newAlbums.find((e) => e.id == x.id) === undefined) {
          GetAlbums(
            api +
              "artists/" +
              x.id +
              "/albums?include_groups=album%2Csingle&market=CZ&limit=50&offset=0",
            0
          ).then((res) => {
            if (!(artists.find((a) => a.id === x.id).albums.length === res)) {
              const newArtist = {
                albums: x.albums,
                id: x.id,
                img: x.img,
                name: x.name,
                count: res - x.albums.length,
              };
              setNewAlbums((n) => [...n, newArtist]);
            }
          });
        }
      });
    }
    setGotAlbums(true);
  }, [artists]);

  const GetAlbums = async (url, count) => {
    const res = await axios({
      method: "get",
      url: url,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }).then(function (response) {
      const unique = [
        ...new Map(
          response.data.items.map((item) => [item["name"], item])
        ).values(),
      ];
      count = count + unique.length;
      if (response.data.next != null) {
        count = GetAlbums(response.data.next, count).then((r) => {
          return r;
        });
      }
      return count;
    });
    return await res;
  };

  useEffect(() => {
    if (isFocused) {
      setGotAlbums(false);
      setAccessToken(null);
      setNewAlbums([]);
    }
    setSearchText("");
  }, [isFocused]);

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", () => {
      setHiddenResults(true);
    });
  }, []);

  const renderItem = ({ item }) => (
    <ListObject item={item} navigation={navigation} />
  );

  const renderHeader = () => (
    <View>
      {/* Uložené */}
      <View style={styles.main_saved_new_container}>
        <Text style={styles.main_saved_text}>Uložené</Text>
        <Svg
          style={styles.main_saved_icon}
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <Path
            d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
            fill="#3A506B"
          />
        </Svg>
      </View>
      <ScrollView horizontal={true} style={styles.main_saved_container}>
        {artists?.slice(0, 10).map((item, index) => (
          <ArtistCard key={index} item={item} navigation={navigation} />
        ))}
        {artists?.length !== 0 ? (
          <ArtistCard key="AddNew" navigation={navigation} />
        ) : (
          <></>
        )}
      </ScrollView>

      {/* Nové */}
      <View style={styles.main_saved_new_container}>
        <Text style={styles.main_saved_text}>Nová alba</Text>
        <Svg
          style={styles.main_saved_icon}
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <Path
            d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M13,17H11V15H13V17M13,13H11V7H13V13Z"
            fill="#3A506B"
          />
        </Svg>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sticky_view}>
        <View style={styles.search}>
          {/* Searchbar */}
          <TextInput
            style={
              results.length > 0 && !hiddenResults
                ? styles.searchbar_open
                : styles.searchbar
            }
            placeholder="Hledat umělce..."
            placeholderTextColor="#bcd4e6"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            onSubmitEditing={() => setHiddenResults(false)}
          />
          <Svg
            style={styles.search_icon}
            width={24}
            height={24}
            viewBox="0 0 24 24"
            onPress={() => setHiddenResults(false)}
          >
            <Path
              d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
              fill="#0B132B"
            />
          </Svg>
        </View>

        {results.length > 0 && !hiddenResults ? (
          <View style={styles.search_results}>
            {results.map((item, index) => (
              <Text
                style={styles.result}
                id={item.id}
                key={index}
                numberOfLines={1}
                ellipsizeMode="tail"
                onPress={() => {
                  navigation.navigate("Detail", { id: item.id });
                  Keyboard.dismiss();
                }}
              >
                {item.name}
              </Text>
            ))}
          </View>
        ) : null}
      </View>
      <FlatList
        style={styles.main_page_flatlist}
        data={newAlbums}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
};

export default MainPage;
