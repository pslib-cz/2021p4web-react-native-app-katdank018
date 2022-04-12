import { TouchableHighlight, Text, Image, View } from "react-native";

export const ArtistCard = ({ item, navigation }) => {
  const Redirect = () => {
    console.log(item.name);
  };
  return (
    <TouchableHighlight
      testID={item.id}
      onPress={() => navigation.navigate("Umělec", { id: item.id })}
    >
      <View>
        <Image source={{ uri: item.img }} style={{ width: 80, height: 80 }} />
        <Text>{item.name}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default ArtistCard;
