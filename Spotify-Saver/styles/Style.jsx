import { StyleSheet } from "react-native";

const Blue = "#090446";
const DarkYellow = "#786F52";
const Yellow = "#FEB95F";
const Red = "#F71735";
const Pink = "#C2095A";

export const styles = StyleSheet.create({
  //Login
  container: {
    flex: 1,
    backgroundColor: Blue,
  },
  login_animation: {
    marginTop: 100,
    width: 300,
    height: 300,
    alignSelf: "center",
  },
  login_button: {
    backgroundColor: Pink,
    height: 50,
    width: 200,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150,
    borderRadius: 25,
  },
  login_btn_txt: {
    color: "white",
    fontSize: 18,
  },

  //MainPage
  searchbar: {
    backgroundColor: Yellow,
    height: 50,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 25,
    paddingHorizontal: 20,
    borderColor: Red,
    borderWidth: 2,
    color: DarkYellow,
  },
  searchbar_open: {
    backgroundColor: Yellow,
    height: 50,
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 20,
    borderColor: Red,
    borderWidth: 2,
    color: DarkYellow,
    borderRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: Yellow, 
  },
  search_results: {
    backgroundColor: Yellow,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: Red,
    borderWidth: 2,
    borderTopWidth: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  result: {
    color: DarkYellow,
    paddingVertical: 5
  }
});
