import { useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export const MainPage = () => {
    const searchText = useRef();

  return (
    <View style={styles.container}>
      <TextInput style={styles.search} placeholder="Hledat..." ref={searchText}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 50
    },
    search: {
        borderWidth: 1,
        margin: 20,
        height: 50,
        padding: 10
    }
});

export default MainPage;