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
  const [newArtists, setNewArtists] = useState([]);
  const isFocused = useIsFocused();

  //Výsledky vyhledávání
  useEffect(() => {
    if (searchText !== "") {
      axios({
        method: "get",
        url: api + "search?q=" + searchText + "&type=artist&limit=3",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }).then(function (response) {
        setResults(response.data.artists.items);
      }).catch((e) => {
        console.log(e);
      });
    } else {
      setResults([]);
    }
  }, [searchText]);

  //Výpis umělců
  useEffect(() => {
    AsyncStorage.getItem("access_token").then((res) => {
      setAccessToken(res);
    });

    AsyncStorage.getItem("artists").then((res) => {
      if (JSON.parse(res)) {
        if (JSON.parse(res).length > 0) {
          setArtists(JSON.parse(res).slice(0, 10));
        } else {
          setArtists(JSON.parse(res));
        }

        //Kontrola neuložených alb každého sledovaného umělce
        JSON.parse(res).forEach((x) => {
          axios({
            method: "get",
            url: api + "artists/" + x.id + "/albums?market=CZ",
            headers: {
              Authorization: "Basic " + accessToken,
            },
          }).then(function (response) {
            if (
              newAlbums.indexOf(x.id) === -1 &&
              response.data.items //ids
                .map((x) => x.id)
                .filter(function (item) {
                  return !x.albums.includes(item);
                }).length > 0
            ) {
              setNewAlbums([...newAlbums, x.id]);
            }
          }).catch((e) => {
            console.log(e);
          });
        });
      }
    });

    //Pokud nějaká nová přidat umělce do proměnné
    if (newAlbums.length > 0) {
      axios({
        method: "get",
        url: api + "artists?ids=" + newAlbums.join(),
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }).then(function (response) {
        response.data.artists.forEach((x) => {
          const obj = {
            id: x.id,
            name: x.name,
            img: x.images[2].url,
          };
          if (newArtists.some((o) => o.id === x.id) !== true) {
            setNewArtists([...newArtists, obj]);
          }
        });
      }).catch((e) => {
        console.log(e);
      });
    }
  }, [newAlbums, accessToken]);

  useEffect(() => {
    setNewAlbums([]);
    setNewArtists([]);
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
            onPress={() => navigation.navigate("Umělec", { id: item.id })}
          >
            {item.name}
          </Text>
        ))}
      </View>
      {/* Uložené */}
      <View>
        <Text>Uložené</Text>
        <View>
          {artists?.map((item, index) => (
            <ArtistCard key={index} item={item} navigation={navigation} />
          ))}
          <ArtistCard key="AddNew" navigation={navigation} />
        </View>
      </View>
      {/* Nové */}
      <View>
        <Text>Nová alba</Text>
        <View>
          {newArtists?.map((item, index) => (
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
