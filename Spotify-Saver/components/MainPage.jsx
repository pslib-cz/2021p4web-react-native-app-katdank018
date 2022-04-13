import axios from "axios";
import { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { api } from "../configuration/spotifyConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArtistCard from "./ArtistCard";

export const MainPage = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [results, setResults] = useState([]);
  const [artists, setArtists] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const isFocused = useIsFocused();
  const [gotAlbums, setGotAlbums] = useState(false);

  //Výsledky vyhledávání
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

  //Výpis umělců
  useEffect(() => {
    console.log(isFocused);
    console.log(accessToken);
    AsyncStorage.getItem("access_token").then((res) => {
      setAccessToken(res);
    });

    AsyncStorage.getItem("artists").then((res) => {
      setArtists(JSON.parse(res));
    });
  }, [accessToken]);

  useEffect(() => {
    //Získá alba všech umělců, které sleduji
    if (artists.length > 0 && !gotAlbums) {
      const array = [];
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
            console.log(x.name);
            setNewAlbums((n) => [...n, x]);
          }

          // console.log(
          //   JSON.stringify(artists.find((a) => a.id === x.id).albums) ===
          //     JSON.stringify(unique.map((b) => b.id))
          // );
        });
      });
      setGotAlbums(true);
    }
  }, [artists]);

  useEffect(() => {
    if (isFocused) {
      setGotAlbums(false);
      setAccessToken(null);
    }
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      {/* Searchbar */}
      <View>
        <TextInput
          style={styles.search}
          placeholder="Hledat umělce..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        ></TextInput>
        {results.map((item, index) => (
          <Text
            id={item.id}
            key={index}
            onPress={() =>
              navigation.navigate("Umělec", { id: item.id }, setSearchText(""))
            }
          >
            {item.name}
          </Text>
        ))}
      </View>
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
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  search: {
    borderWidth: 1,
    margin: 20,
    height: 50,
    padding: 10,
  },
});

export default MainPage;
