import { useEffect, useState } from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import {
  client_id,
  redirect_uri_mobile,
  redirect_uri_web,
} from "../configuration/spotifyConfig";
import * as Device from "expo-device";
import * as WebBrowser from "expo-web-browser";
import { styles } from "../styles/Style";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={styles.login_container}>
      <Image
        style={styles.login_animation}
        source={require("../assets/log_anim_640.gif")}
      />
      <TouchableOpacity
        style={styles.login_button}
        onPress={() => promptAsync()}
      >
        <Text style={styles.login_btn_txt}>Přihlásit se</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
