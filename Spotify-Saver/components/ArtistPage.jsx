import axios from "axios";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Image, Text, Button, View } from "react-native";
import { api } from "../configuration/spotifyConfig";
import AlbumCard from "./AlbumCard";

export const ArtistPage = ({ route, navigation }) => {
  console.log(route.params.id);
  const [accessToken, setAccessToken] = useState();
  const [artist, setArtist] = useState();
  const [albums, setAlbums] = useState([]);
  const [savedCurrent, setSavedCurrent] = useState();

  useEffect(() => {
    const GetStorageData = async () => {
      setAccessToken(await AsyncStorage.getItem("access_token"));
      setSavedCurrent(
        JSON.parse(await AsyncStorage.getItem("artists")).find(
          (x) => x.id === route.params.id
        )
      );
    };
    GetStorageData();

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
  }, [accessToken, setArtist]);

  useEffect(() => {
  }, [savedCurrent]);

  const GetSavedCurrent = async () => {
    setSavedCurrent(
      JSON.parse(await AsyncStorage.getItem("artists")).find(
        (x) => x.id === route.params.id
      )
    );
    console.log("nová data");
  };

  const SaveArtist = async () => {
    const artist = {
      id: route.params.id,
      albums: [],
    };
    const data = JSON.parse(await AsyncStorage.getItem("artists"));
    data.push(artist);
    await AsyncStorage.setItem("artists", JSON.stringify(data));
    GetSavedCurrent();
  };

  const RemoveArtist = async () => {
    await AsyncStorage.setItem(
      "artists",
      JSON.stringify(
        JSON.parse(await AsyncStorage.getItem("artists")).filter(
          (x) => x.id !== route.params.id
        )
      )
    );
    GetSavedCurrent();
  };

  AsyncStorage.getItem("artists").then((v) => {
    console.log(JSON.parse(v));
  });

  if (artist) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: artist.images[1].url }}
          style={{ width: 320, height: 320 }}
        />
        <Text>{artist.name}</Text>
        {savedCurrent ? (
          <Button onPress={() => RemoveArtist()} title="Přestat sledovat" />
        ) : (
          <Button onPress={() => SaveArtist()} title="Sledovat" />
        )}

        <View>
          {albums.map((item, index) => (
            <AlbumCard key={index} item={item} saved={savedCurrent} refresh={GetSavedCurrent}></AlbumCard>
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
