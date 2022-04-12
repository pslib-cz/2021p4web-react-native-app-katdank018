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

  useEffect(() => {
    const GetDataFromStorage = async () => {
      try {
        setAccessToken(await AsyncStorage.getItem("access_token"));
      } catch (e) {
        console.log("Error", e);
      }

      const storage = JSON.parse(await AsyncStorage.getItem("artists"));
      if (storage?.length > 0) {
        setArtists(storage.slice(0, 10));
      } else {
        setArtists(storage);
      }

      storage.forEach((x) => {
        axios({
          method: "get",
          url: api + "artists/" + x.id + "/albums?market=CZ",
          headers: {
            Authorization: "Bearer " + accessToken,
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
          // response.data.items //ids
          //   .map((x) => x.id)
          //   .filter(function (item) {
          //     return !x.albums.includes(item);
          //   })
          // .forEach((y) => {
          // response.data.items
          //   .filter((c) => c.id === y)
          // .forEach((z) => {
          //   if (
          //     newAlbums.findIndex(
          //       (a) => a.name === z.name && a.artist === z.artists[0].name
          //     ) === -1
          //   ) {
          //     setNewAlbums((arr) => [
          //       ...arr,
          //       {
          //         img: z.images[2].url,
          //         name: z.name,
          //         artist: z.artists[0].name,
          //       },
          //     ]);
          //   }
          // });
        });
      });

      axios({
        method: "get",
        url: api + "artists?ids=" + newAlbums.join(),
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then(function (response) {
          response.data.artists.forEach((x) => {
            if (!newArtists.some((o) => o.id === x.id)) {
              setNewArtists([
                ...newArtists,
                {
                  id: x.id,
                  name: x.name,
                  img: x.images[2].url,
                },
              ]);
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    GetDataFromStorage();
  }, [newAlbums, isFocused, accessToken]);

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
      });
    } else {
      setResults([]);
    }
  }, [searchText]);

  useEffect(() => {
  }, [newArtists]);

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
            <ArtistCard key={index} item={item} />
          ))}
        </View>
      </View>
      {/* Nové */}
      <View>
        <Text>Nová alba</Text>
        <View>
          {newArtists?.map((item, index) => (
            <ArtistCard key={index} item={item} />
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
