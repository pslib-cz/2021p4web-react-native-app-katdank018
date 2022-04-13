import { View, Text, Image, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/Style";

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

  return (
    <View>
      <Image
        source={{ uri: item.images[2].url }}
        style={{ width: 80, height: 80 }}
      />
      <Text>{item.name}</Text>
      <Text>{item.release_date}</Text>
      {saved ? (
        saved.albums.some((x) => x === item.id) ? (
          <Button onPress={() => RemoveAlbum()} title="Odebrat" />
        ) : (
          <Button onPress={() => SaveAlbum()} title="Uložit" />
        )
      ) : (
        <></>
      )}
    </View>
  );
};

export default AlbumCard;
