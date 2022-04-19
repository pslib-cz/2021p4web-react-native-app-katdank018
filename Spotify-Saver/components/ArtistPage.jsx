import axios from "axios";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, Text, TouchableOpacity, FlatList, View } from "react-native";
import { api } from "../configuration/spotifyConfig";
import AlbumCard from "./AlbumCard";
import { styles } from "../styles/Style";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

export const ArtistPage = ({ route }) => {
  const [accessToken, setAccessToken] = useState();
  const [artist, setArtist] = useState();
  const [albums, setAlbums] = useState([]);
  const [savedCurrent, setSavedCurrent] = useState();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem("access_token").then((res) => {
      setAccessToken(res);
    });

    AsyncStorage.getItem("artists").then((res) => {
      setSavedCurrent(JSON.parse(res).find((x) => x.id === route.params.id));
    });

    if (accessToken) {
      //Artist
      axios({
        method: "get",
        url: api + "artists/" + route.params.id,
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then(function (response) {
          setArtist(response.data);
        })
        .catch((e) => {
          console.log(e);
        });

      function selectData(show) {
        const { id, name, images, release_date } = show;
        return { id, name, images, release_date };
      }

      //Albums
      axios({
        method: "get",
        url:
          api +
          "artists/" +
          route.params.id +
          "/albums?include_groups=album%2Csingle&market=CZ&limit=50&offset=" +
          offset,
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }).then(function (response) {
        const unique = [
          ...new Map(
            response.data.items.map((item) => [item["name"], item])
          ).values(),
        ];
        const res = unique.map(selectData);
        setAlbums(albums.concat(res));

        if (response.data.next != null) {
          setOffset(offset + 50);
        }
      });
    }
  }, [accessToken, offset]);

  useEffect(() => { }, [savedCurrent]);

  const GetSavedCurrent = async () => {
    setSavedCurrent(
      JSON.parse(await AsyncStorage.getItem("artists")).find(
        (x) => x.id === route.params.id
      )
    );
  };

  const SaveArtist = async () => {
    const savingArtist = {
      id: route.params.id,
      name: artist.name,
      img: artist.images[0].url,
      albums: [],
    };

    const data = JSON.parse(await AsyncStorage.getItem("artists"));
    data.push(savingArtist);
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

  const renderHeader = () => (
    <View>
      <View style={styles.artist_image_container}>
        <Image
          source={{ uri: artist.images[0].url }}
          style={styles.artist_image}
        />
      </View>
      <View style={styles.artist_name_container}>
        <Text
          style={styles.artist_name}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {artist.name}
        </Text>
        {savedCurrent ? (
          <TouchableOpacity
            style={styles.artist_button_warning}
            onPress={() => RemoveArtist()}
          >
            <Svg
              style={styles.artist_button_svg}
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <Path
                d="M12 18C12 19 12.25 19.92 12.67 20.74L12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 9.93 21.5 11.26 20.62 12.61C19.83 12.23 18.94 12 18 12C14.69 12 12 14.69 12 18M14 17V19H22V17H14Z"
                fill="#1C2541"
              />
            </Svg>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.artist_button_success}
            onPress={() => SaveArtist()}
          >
            <Svg
              style={styles.artist_button_svg}
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <Path
                d="M12 18C12 19 12.25 19.92 12.67 20.74L12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 9.93 21.5 11.26 20.62 12.61C19.83 12.23 18.94 12 18 12C14.69 12 12 14.69 12 18M19 14H17V17H14V19H17V22H19V19H22V17H19V14Z"
                fill="#1C2541"
              />
            </Svg>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <AlbumCard
      item={item}
      saved={savedCurrent}
      refresh={GetSavedCurrent}
    />
  );

  if (artist) {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList style={styles.artist_albums_container}
          data={albums
            ?.sort((a, b) =>
              a.release_date < b.release_date
                ? 1
                : b.release_date < a.release_date
                  ? -1
                  : 0
            )}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={renderHeader}
        />
      </SafeAreaView >
    );
  } else {
    return <View></View>;
  }
};

export default ArtistPage;
