import { View, StyleSheet, TextInput, Button } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArtistCard from "./ArtistCard";
import { useIsFocused } from "@react-navigation/native";

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

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.goBack()} title="Back" />
      <TextInput
        style={styles.search}
        placeholder="Hledat umělce..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      ></TextInput>
      <View>
        {results?.map((item, index) => {
          return <ArtistCard key={index} item={item} navigation={navigation} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  search: {
    borderWidth: 1,
    margin: 20,
    height: 50,
    padding: 10,
  },
});

export default AllArtists;
