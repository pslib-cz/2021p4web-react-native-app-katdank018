import axios from "axios";
import { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { api } from "../configuration/spotifyConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MainPage = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const GetAccessToken = async () => {
      try {
        setAccessToken(await AsyncStorage.getItem("access_token"));
      } catch (e) {
        console.log("Error", e);
      }
    };

    GetAccessToken();
  }, [accessToken]);

  useEffect(() => {
    if (searchText !== "") {
      axios({
        method: "get",
        url: api + "search?q=" + searchText + "&type=artist&limit=3",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }).then(function (response) {
        setResults(response.data.artists.items);
      });
    } else {
      setResults([]);
    }
  }, [searchText]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Hledat umělce..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      ></TextInput>
      {results.map((item, index) => (
        <Text
          id={item.id}
          key={index}
          onPress={() => navigation.navigate("Umělec", { id: item.id })}
        >
          {item.name}
        </Text>
      ))}
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

export default MainPage;
