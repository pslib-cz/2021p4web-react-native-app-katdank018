import { View, Text, Image, Button } from "react-native";

export const AlbumCard = ({ item }) => {
  return (
    <View>
      <Image
        source={{ uri: item.images[2].url }}
        style={{ width: 80, height: 80 }}
      />
      <Text>{item.name}</Text>
      <Text>{item.release_date}</Text>
      <Button title="Přestat sledovat" />
    </View>
  );
};

export default AlbumCard;
