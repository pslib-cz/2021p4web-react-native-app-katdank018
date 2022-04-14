import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainPage } from "./components/MainPage";
import { Login } from "./components/Login";
import { ArtistPage } from "./components/ArtistPage";
import AllArtists from "./components/AllArtists";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Přihlášení"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Spotify Saver"
          component={MainPage}
          options={{ presentation: "transparentModal" }}
        />
        <Stack.Screen
          name="Přihlášení"
          component={Login}
          options={{ presentation: "transparentModal" }}
        />
        <Stack.Screen
          name="Umělec"
          component={ArtistPage}
          options={{ presentation: "transparentModal" }}
        />
        <Stack.Screen
          name="Všichni umělci"
          component={AllArtists}
          options={{ presentation: "transparentModal" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
