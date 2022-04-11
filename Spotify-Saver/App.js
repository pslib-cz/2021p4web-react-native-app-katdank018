import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainPage } from "./components/MainPage";
import { Login } from "./components/Login";
import { ArtistPage } from "./components/ArtistPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Přihlášení"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Spotify Saver" component={MainPage} />
        <Stack.Screen name="Přihlášení" component={Login} />
        <Stack.Screen name="Umělec" component={ArtistPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
