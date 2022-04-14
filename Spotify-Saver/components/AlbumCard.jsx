import { View, Text, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/Style";
import Svg, { Path } from "react-native-svg";

export const AlbumCard = ({ item, saved, refresh }) => {
  const SaveAlbum = async () => {
    const storage = JSON.parse(await AsyncStorage.getItem("artists"));
    storage.find((x) => x.id == saved.id).albums.push(item.id);
    await AsyncStorage.setItem("artists", JSON.stringify(storage));
    refresh();
  };

  const RemoveAlbum = async () => {
    const storage = JSON.parse(await AsyncStorage.getItem("artists"));
    const index = storage.find((x) => x.id == saved.id).albums.indexOf(item.id);
    storage.find((x) => x.id === saved.id).albums.splice(index, 1);
    await AsyncStorage.setItem("artists", JSON.stringify(storage));
    refresh();
  };

  var release = item.release_date.split("-");
  const date =
    parseInt(release[2], 10) +
    ". " +
    parseInt(release[1], 10) +
    ". " +
    release[0];

  return (
    <View style={styles.album_card}>
      <Image
        source={{ uri: item.images[0].url }}
        style={styles.list_card_image}
      />
      <View>
        <Text
          style={styles.album_card_name}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
        <Text style={styles.list_card_albums}>{date}</Text>
      </View>
      {saved ? (
        saved.albums.some((x) => x === item.id) ? (
          <TouchableOpacity
            style={styles.album_button_warning}
            onPress={() => RemoveAlbum()}
          >
            <Svg
              style={styles.artist_button_svg}
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <Path
                d="M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5A2,2 0 0,0 17,3M15,11H9V9H15V11Z"
                fill="#1C2541"
              />
            </Svg>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.album_button_success}
            onPress={() => SaveAlbum()}
          >
            <Svg
              style={styles.artist_button_svg}
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <Path
                d="M17,3A2,2 0 0,1 19,5V21L12,18L5,21V5C5,3.89 5.9,3 7,3H17M11,7V9H9V11H11V13H13V11H15V9H13V7H11Z"
                fill="#1C2541"
              />
            </Svg>
          </TouchableOpacity>
        )
      ) : (
        <></>
      )}
    </View>
  );
};

export default AlbumCard;
