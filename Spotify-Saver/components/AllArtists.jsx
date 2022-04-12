import { View, Text, StyleSheet, TextInput } from "react-native";
export const AllArtists = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Hledat umělce..."
        // value={searchText}
        // onChangeText={(text) => setSearchText(text)}
      ></TextInput>
      <Text>Hej</Text>
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
