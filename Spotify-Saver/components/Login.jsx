import { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import {
  client_id,
  redirect_uri_mobile,
  redirect_uri_web,
} from "../configuration/spotifyConfig";
import * as Device from "expo-device";
import * as WebBrowser from "expo-web-browser";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export const Login = ({ navigation }) => {
  const [deviceEnum, setDeviceEnum] = useState(null);
  const artists = [];

  const DeviceDetection = async () => {
    return await Device.getDeviceTypeAsync();
  };

  useEffect(() => {
    DeviceDetection().then((res) => {
      setDeviceEnum(res);
    });
  }, []);

  if (deviceEnum === 3) {
    WebBrowser.maybeCompleteAuthSession();
  }

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: client_id,
      scopes: ["user-read-email", "playlist-modify-public"],
      usePKCE: false,
      redirectUri: deviceEnum === 3 ? redirect_uri_web : redirect_uri_mobile,
    },
    discovery
  );

  const SaveAccessToken = async (token) => {
    try {
      await AsyncStorage.setItem("access_token", token);
      const data = await AsyncStorage.getItem("artists");
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
