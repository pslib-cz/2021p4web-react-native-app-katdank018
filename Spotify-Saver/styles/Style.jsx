import { StyleSheet, Dimensions } from "react-native";

const Pink = "#e834ec";
const DarkBlue = "#0B132B";
const LighterBlue = "#1C2541";
const LightBlue = "#3A506B";
const Success = "#29AB87";
const Warning = "#FF4F4F";
const White = "#FFFFFF";
const BluedWhite = "#bcd4e6";

const screen = Dimensions.get("screen");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkBlue,
  },
  searchbar: {
    backgroundColor: LightBlue,
    height: 50,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 45,
    borderColor: LighterBlue,
    borderWidth: 2,
    color: White,
    flex: 1,
  },
  sticky_view: {
    backgroundColor: DarkBlue,
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  search: {
    flexDirection: "row",
  },
  search_icon: {
    position: "absolute",
    right: 35,
    top: 34,
    zIndex: 1,
  },
  flatlist: {
    marginBottom: 20,
  },

  //Login
  login_container: {
    flex: 1,
    backgroundColor: DarkBlue,
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
    marginTop: screen.height / 6,
    borderRadius: 25,
  },
  login_btn_txt: {
    color: DarkBlue,
    fontSize: 18,
  },

  //MainPage
  searchbar_open: {
    backgroundColor: LightBlue,
    height: 50,
    marginHorizontal: 20,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 45,
    borderColor: LighterBlue,
    borderWidth: 2,
    color: White,
    borderRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: LightBlue,
    flex: 1,
  },
  search_results: {
    backgroundColor: LightBlue,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: LighterBlue,
    borderWidth: 2,
    borderTopWidth: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  result: {
    color: White,
    paddingVertical: 5,
  },
  main_saved_text: {
    color: White,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    fontSize: 24,
  },
  main_saved_container: {
    display: "flex",
    flexDirection: "row",
  },
  main_saved_new_container: {
    flexDirection: "row",
  },
  main_saved_icon: {
    marginLeft: 10,
    marginTop: 25,
    fontSize: 24,
  },

  //ArtistCard
  artist_card_container: {
    backgroundColor: LighterBlue,
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  artist_card_image: {
    width: 130,
    height: 130,
    borderRadius: 5,
  },
  artist_card_name: {
    color: BluedWhite,
    textAlign: "center",
    width: 130,
    padding: 10,
    paddingBottom: 0,
  },
  artist_card_image_container: {
    justifyContent: "center",
    alignItems: "center",
  },

  //ListObject
  list_card_container: {
    backgroundColor: LighterBlue,
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  list_card_view: {
    flexDirection: "row",
    alignItems: "center",
  },
  list_card_image: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  list_card_name: {
    color: BluedWhite,
    padding: 5,
    paddingLeft: 10,
    fontSize: 18,
    width: screen.width / 1.5,
  },
  list_card_albums: {
    color: BluedWhite,
    padding: 10,
    paddingBottom: 0,
    fontSize: 12,
    fontStyle: "italic",
  },

  //ArtistPage
  artist_image_container: {
    backgroundColor: LighterBlue,
    margin: 30,
    borderRadius: 5,
    width: screen.width - 60,
    justifyContent: "center",
    maxWidth: 350,
    maxHeight: 350,
    alignSelf: "center",
  },
  artist_image: {
    width: screen.width - 60 - 20,
    height: screen.width - 60 - 20,
    alignSelf: "center",
    borderRadius: 5,
    marginVertical: 15,
    padding: 10,
    maxWidth: 320,
    maxHeight: 320,
  },
  artist_name_container: {
    flexDirection: "row",
    width: screen.width - 60 - 20,
  },
  artist_name: {
    color: BluedWhite,
    fontSize: 30,
    textAlign: "center",
    width: screen.width - 100,
    marginHorizontal: 30,
  },
  artist_button_success: {
    backgroundColor: Success,
    padding: 8,
    borderRadius: 50,
    position: "relative",
    left: -20,
    height: 40,
  },
  artist_button_warning: {
    backgroundColor: Warning,
    padding: 8,
    borderRadius: 50,
    position: "relative",
    left: -20,
    height: 40,
  },
  artist_albums_container: {
    marginBottom: 20,
  },

  //AlbumCard
  album_card: {
    backgroundColor: LighterBlue,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  album_card_name: {
    color: BluedWhite,
    padding: 5,
    paddingLeft: 10,
    fontSize: 18,
    width: screen.width / 1.5 - 30,
  },
  album_button_success: {
    backgroundColor: Success,
    padding: 5,
    borderRadius: 50,
    position: "relative",
    left: 5,
  },
  album_button_warning: {
    backgroundColor: Warning,
    padding: 5,
    borderRadius: 50,
    position: "relative",
    left: 5,
  },
});
