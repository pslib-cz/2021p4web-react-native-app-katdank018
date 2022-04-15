import { TouchableOpacity, Text, Image, View } from "react-native";
import { styles } from "../styles/Style";

export const ListObject = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.list_card_container}
      onPress={() => navigation.navigate("Detail", { id: item.id })}
    >
      <View style={styles.list_card_view}>
        <Image source={{ uri: item.img }} style={styles.list_card_image} />
        <View>
          <Text
            style={styles.list_card_name}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
          {item.count ? (
            <Text style={styles.list_card_albums}>
              Počet neuložených alb: {item.count}
            </Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListObject;
