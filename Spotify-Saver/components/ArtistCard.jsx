import { TouchableHighlight, Text, Image, View } from "react-native";
import { styles } from "../styles/Style";

export const ArtistCard = ({ item, navigation }) => {
  if (item !== undefined) {
    return (
      <TouchableHighlight
        onPress={() => navigation.navigate("Umělec", { id: item.id })}
      >
        <View>
          <Image source={{ uri: item.img }} style={{ width: 80, height: 80 }} />
          <Text>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  } else {
    return (
      <TouchableHighlight onPress={() => navigation.navigate("Všichni umělci")}>
        <View>
          <Text>Všechny</Text>
        </View>
      </TouchableHighlight>
    );
  }
};

export default ArtistCard;
