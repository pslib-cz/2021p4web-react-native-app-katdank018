import axios from "axios";
import { useState, useEffect } from "react";
import { Text, TextInput, View, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { api } from "../configuration/spotifyConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArtistCard from "./ArtistCard";
import { styles } from "../styles/Style";
import { SafeAreaView } from "react-native-safe-area-context";

export const MainPage = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [results, setResults] = useState([]);
  const [artists, setArtists] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const isFocused = useIsFocused();
  const [gotAlbums, setGotAlbums] = useState(false);

  useEffect(() => {
    if (searchText !== "") {
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
    if (artists.length > 0 && !gotAlbums) {
      artists.map((x) => {
        axios({
          method: "get",
          url: api + "artists/" + x.id + "/albums?market=CZ",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }).then(function (response) {
          const unique = [
            ...new Map(
              response.data.items.map((item) => [item["name"], item])
            ).values(),
          ];
          if (
            !(
              JSON.stringify(artists.find((a) => a.id === x.id).albums) ===
              JSON.stringify(unique.map((b) => b.id))
            )
          ) {
            setNewAlbums((n) => [...n, x]);
          }
        });
      });
      setGotAlbums(true);
    }
  }, [artists]);

  useEffect(() => {
    if (isFocused) {
      setGotAlbums(false);
      setAccessToken(null);
      setNewAlbums([]);
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Searchbar */}
        <TextInput
          style={results.length > 0 ? styles.searchbar_open : styles.searchbar}
          placeholder="Hledat umělce..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        ></TextInput>
        {results.length > 0 ? (
          <View style={styles.search_results}>
            {results.map((item, index) => (
              <Text
                style={styles.result}
                id={item.id}
                key={index}
                onPress={() =>
                  navigation.navigate(
                    "Umělec",
                    { id: item.id },
                    setSearchText("")
                  )
                }
              >
                {item.name}
              </Text>
            ))}
          </View>
        ) : (
          <></>
        )}

        {/* Uložené */}
        <View>
          <Text>Uložené</Text>
          <View>
            {artists?.slice(0, 10).map((item, index) => (
              <ArtistCard key={index} item={item} navigation={navigation} />
            ))}
            <ArtistCard key="AddNew" navigation={navigation} />
          </View>
        </View>
        {/* Nové */}
        <View>
          <Text>Nová alba</Text>
          <View>
            {newAlbums?.map((item, index) => (
              <ArtistCard key={index} item={item} navigation={navigation} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainPage;
