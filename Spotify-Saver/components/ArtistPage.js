import axios from "axios";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Image, Text, Button, View } from "react-native";
import { api } from "../configuration/spotifyConfig";
import AlbumCard from "./AlbumCard";

export const ArtistPage = ({ route, navigation }) => {
  console.log(route.params.id);
  const [accessToken, setAccessToken] = useState();
  const [storageData, setStorageData] = useState();
  const [artist, setArtist] = useState();
  const [albums, setAlbums] = useState([]);
  const [savedCurrent, setSavedCurrent] = useState();

  useEffect(() => {
    try {
      AsyncStorage.getItem("access_token").then((value) =>
        setAccessToken(value)
      );
      AsyncStorage.getItem("artists").then((value) =>
        setStorageData(JSON.parse(value))
      );
      setSavedCurrent(storageData.find((x) => x.id === route.params.id));
    } catch (e) {
      console.log("Error", e);
    }

    //Artist
    axios({
      method: "get",
      url: api + "artists/" + route.params.id,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }).then(function (response) {
      setArtist(response.data);
    });

    //Albums
    axios({
      method: "get",
      url: api + "artists/" + route.params.id + "/albums?market=CZ",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }).then(function (response) {
      setAlbums(response.data.items);
    });

  }, [savedCurrent,accessToken, setArtist]);

  const SaveArtist = () => {
    const artist = {
      id: route.params.id,
      albums: [],
    };
    setStorageData(storageData.push(artist));
    try {
      AsyncStorage.setItem("artists", JSON.stringify(storageData));
    } catch (e) {
      console.log("Error", e);
    }
  };

  const RemoveArtist = () => {
    setStorageData(storageData.filter((x) => x.id !== route.params.id));
    try {
      AsyncStorage.setItem(
        "artists",
        JSON.stringify(storageData.filter((x) => x.id !== route.params.id))
      );
    } catch (e) {
      console.log("Error", e);
    }
  };

  if (artist && storageData) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: artist.images[1].url }}
          style={{ width: 320, height: 320 }}
        />
        <Text>{artist.name}</Text>
        {savedCurrent !== undefined ? (
          <Button onPress={() => RemoveArtist()} title="Přestat sledovat" />
        ) : (
          <Button onPress={() => SaveArtist()} title="Sledovat" />
        )}

        <View>
          {albums.map((item, index) => (
            <AlbumCard key={index} item={item}></AlbumCard>
          ))}
        </View>
      </View>
    );
  } else {
    return <View></View>;
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
});

export default ArtistPage;
