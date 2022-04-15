import { TouchableOpacity, Text, Image, View } from "react-native";
import { styles } from "../styles/Style";
import Svg, { Path } from "react-native-svg";

export const ArtistCard = ({ item, navigation }) => {
  if (item !== undefined) {
    return (
      <TouchableOpacity
        style={styles.artist_card_container}
        onPress={() => navigation.navigate("Detail", { id: item.id })}
      >
        <View>
          <Image source={{ uri: item.img }} style={styles.artist_card_image} />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.artist_card_name}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.artist_card_container}
        onPress={() => navigation.navigate("Uloženo")}
      >
        <View>
          <View style={styles.artist_card_image_container}>
            <Svg width={130} height={130} viewBox="-8 -8 40 40">
              <Path
                d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 12,13.5A1.5,1.5 0 0,1 10.5,12A1.5,1.5 0 0,1 12,10.5M7.5,10.5A1.5,1.5 0 0,1 9,12A1.5,1.5 0 0,1 7.5,13.5A1.5,1.5 0 0,1 6,12A1.5,1.5 0 0,1 7.5,10.5M16.5,10.5A1.5,1.5 0 0,1 18,12A1.5,1.5 0 0,1 16.5,13.5A1.5,1.5 0 0,1 15,12A1.5,1.5 0 0,1 16.5,10.5Z"
                fill="#3A506B"
              />
            </Svg>
          </View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.artist_card_name}
          >
            Zobrazit další...
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
};

export default ArtistCard;
