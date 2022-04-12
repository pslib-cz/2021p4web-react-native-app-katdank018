import { useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { client_id } from "../configuration/spotifyConfig";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export const Login = ({ navigation }) => {
  const artists = [];
  // {
  //   id: null,
  //   albums: [
  //     {
  //       id: null,
  //     },
  //   ],
  // },

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: client_id,
      scopes: ["user-read-email", "playlist-modify-public"],
      usePKCE: false,
      redirectUri: "exp://10.0.0.21:19000/",
    },
    discovery
  );

  const SaveAccessToken = async (token) => {
    try {
      await AsyncStorage.setItem("access_token", token);
      const data = await AsyncStorage.getItem("artists");
      console.log(data);
      if (data === null) {
        console.log("Creating...");
        await AsyncStorage.setItem("artists", JSON.stringify(artists));
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      SaveAccessToken(response.params.access_token);
      navigation.navigate("Spotify Saver");
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button onPress={() => promptAsync()} title="Přihlásit se" />
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

export default Login;
