import { StyleSheet, Text, Image, View } from "react-native";

export const ArtistCard = ({ item }) => {
  return (
    <View>
      <Image
        source={{ uri: item.img }}
        style={{ width: 80, height: 80 }}
      />
      <Text>{item.name}</Text>
    </View>
  );
};

export default ArtistCard;
