import { View, Text, TextInput, FlatList } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListObject from "./ListObject";
import { useIsFocused } from "@react-navigation/native";
import { styles } from "../styles/Style";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

export const AllArtists = ({ navigation }) => {
  const [artists, setArtists] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    setResults(
      artists.filter((x) => {
        return x.name.toLowerCase().includes(searchText.toLowerCase());
      })
    );
  }, [searchText, artists]);

  useEffect(() => {
    const GetArtists = async () => {
      setArtists(JSON.parse(await AsyncStorage.getItem("artists")));
    };
    GetArtists();
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <ListObject item={item} navigation={navigation} />
  );

  const renderHeader = () => (
    <View style={styles.main_saved_new_container}>
      <Text style={styles.main_saved_text}>Všichni uložení</Text>
      <Svg
        style={styles.main_saved_icon}
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <Path
          d="M15,6H3V8H15V6M15,10H3V12H15V10M3,16H11V14H3V16M17,6V14.18C16.69,14.07 16.35,14 16,14A3,3 0 0,0 13,17A3,3 0 0,0 16,20A3,3 0 0,0 19,17V8H22V6H17Z"
          fill="#3A506B"
        />
      </Svg>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sticky_view}>
        <View style={styles.search}>
          <TextInput
            style={styles.searchbar}
            placeholder="Hledat umělce..."
            placeholderTextColor="#bcd4e6"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <Svg
            style={styles.search_icon}
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <Path
              d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
              fill="#0B132B"
            />
          </Svg>
        </View>
      </View>
      <FlatList
        style={styles.flatlist}
        data={results?.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        )}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
};

export default AllArtists;
