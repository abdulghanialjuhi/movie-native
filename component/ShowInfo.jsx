import React, { useContext, useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ImageBackground,
  Animated,
  ScrollView,
  TouchableOpacity,
  ActionSheetIOS,
  Platform,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons1 from "react-native-vector-icons/MaterialIcons";
import firebase from "firebase";
import Context from "../context/Context";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import { isIphoneX } from "react-native-iphone-x-helper";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Appearance } from "react-native-appearance";

const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

export default function ShowInfo({
  title,
  id,
  backdrop_path,
  poster_path,
  overview,
  vote_average,
  genres,
  release_date,
  navigation,
  movie,
}) {
  const colorScheme = Appearance.getColorScheme();
  const [user, setUser] = useState(false);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) return setUser(true);
    else return setUser(false);
  });
  const { actions, watchlist, darkMode, language } = useContext(Context);
  const [modal, setModal] = useState(false);
  const [isAdded, setIsadded] = useState(true);
  // const scrollY = useRef(new Animated.Value(0)).current;

  let storedMovie = watchlist ? watchlist.find((o) => o.id === id) : null;
  const disableMovie = storedMovie ? true : false;

  const handleWatchlist = async () => {
    if (user) {
      if (!disableMovie) {
        try {
          setIsadded(false);
          await actions({
            type: "add_watchlist",
            payload: [...watchlist, movie],
          });
          Haptics.notificationAsync();
          setIsadded(true);
        } catch {
          alert(language ? "Try again" : "حاول مجدداً");
        }
      } else {
        if (Platform.OS === "ios") {
          ActionSheetIOS.showActionSheetWithOptions(
            {
              title: movie.title,
              options: [
                language ? "Cancel" : "إلغاء",
                language ? "Remove from Watchlist" : "إزاله من قائمة المشاهدة",
              ],
              destructiveButtonIndex: 1,
              cancelButtonIndex: 0,
              //    userInterfaceStyle: colorScheme ? "dark" : "light",
            },
            async (buttonIndex) => {
              if (buttonIndex === 0) {
                //    console.log("2");
              } else if (buttonIndex === 1) {
                setIsadded(false);
                const remove = watchlist.filter((w) => w.id !== id);
                await actions({
                  type: "add_watchlist",
                  payload: remove,
                });
                Haptics.impactAsync();
                setIsadded(true);
              }
            }
          );
        } else {
          Alert.alert(
            language ? "Are you sure" : "هل انت متأكد",
            language
              ? "you want to remove this movie from your watchlist"
              : "انك تريد ان تزيل هذا الفليم من قائمة المشاهدة",
            [
              {
                text: language ? "Yes" : "نعم",
                onPress: async () => {
                  setIsadded(false);
                  const remove = watchlist.filter((w) => w.id !== id);
                  await actions({
                    type: "add_watchlist",
                    payload: remove,
                  });
                  Haptics.impactAsync();
                  setIsadded(true);
                },
                style: "destructive",
              },
              {
                text: language ? "Cancel" : "إلغاء",
                style: "cancel",
              },
            ],
            { cancelable: false }
          );
        }
      }
    } else {
      Alert.alert(
        language ? "Alert" : "تنبيه",
        language
          ? "You have to log in to add movies to your watchlist"
          : "يجب عليك تسجيل الدخول لإضافة الفيلم هذا الى قائمة المشاهدة",
        [{ text: language ? "Ok" : "حسناً" }]
      );
    }
  };

  const names = [];
  const length = genres ? (genres.length > 4 ? 4 : genres.length) : [];
  for (let i = 0; i < length; i++) {
    const gener = genres[i];
    const name = gener.name;
    names.push(
      <View key={name}>
        <Text
          style={{
            borderWidth: 0.9,
            borderColor: darkMode ? "gray" : "#c9c9c9",
            color: darkMode ? "#fff" : "black",
            marginLeft: 9,
            padding: 4,
            borderRadius: 4,
            textAlign: "center",
            marginBottom: 4,
          }}
        >
          {name}
        </Text>
      </View>
    );
  }

  useEffect(() => {
    if (disableMovie) {
      setTimeout(() => {
        setIsadded(true);
      }, 900);
    }
  }, [watchlist]);
  if (backdrop_path) {
    return (
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: darkMode ? "black" : "#fff" },
        ]}
      >
        <Modal
          animationIn="fadeIn"
          animationOut="fadeOut"
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          isVisible={!isAdded}
          useNativeDriver={false}
        >
          <ActivityIndicator />
        </Modal>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.titleContainer}>
            <Text
              style={[styles.title, { color: darkMode ? "#e5e5e5" : "black" }]}
            >
              {" "}
              {title}{" "}
            </Text>

            <Text style={{ color: "gray", marginLeft: 7 }}>{release_date}</Text>
          </View>

          <View style={{ justifyContent: "center", marginRight: 20 }}>
            <Text
              style={{
                color: darkMode ? "#e5e5e5" : "black",
                fontWeight: "700",
                fontSize: 16,
              }}
            >
              {vote_average}
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: darkMode ? "#0c0c0c" : "#fff" }}>
          <View
            style={{
              backgroundColor: darkMode ? "black" : "#fff",
            }}
          >
            <Image
              resizeMode="contain"
              style={{ width: "100%", height: 241 }}
              source={{ uri: IMAGE_URL + backdrop_path }}
            />

            <LinearGradient
              colors={
                darkMode
                  ? ["transparent", "rgba(0,0,0,1)"]
                  : ["transparent", "rgba(192,192,192, 0.5)"]
              }
              style={styles.background}
            />
          </View>

          <View style={styles.posterContainer}>
            {darkMode ? (
              <LinearGradient
                colors={["rgba(0,0,0,1)", "transparent"]}
                style={styles.background1}
              />
            ) : null}
            <TouchableOpacity onPress={() => setModal(true)}>
              <Image
                resizeMode="contain"
                style={{ width: 117, height: 175, margin: 10 }}
                source={{ uri: IMAGE_URL + poster_path }}
              />
            </TouchableOpacity>
            <Modal
              swipeThreshold={100}
              onSwipeComplete={() => setModal(false)}
              swipeDirection="down"
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
              }}
              animationInTiming={660}
              animationOutTiming={660}
              onBackdropPress={() => setModal(false)}
              animationIn="slideInUp"
              animationOut="slideOutDown"
              isVisible={modal}
              useNativeDriver={false}
            >
              <View
                style={{
                  padding: 2,
                  borderRadius: 5,
                  backgroundColor: "#fff",
                  width: "100%",
                  height: isIphoneX() ? "65%" : "85%",
                  padding: 4,
                  justifyContent: "flex-start",
                }}
              >
                <TouchableOpacity onPress={() => setModal(false)}>
                  <Text
                    style={{ fontSize: 17, color: "#4285F4", marginBottom: 3 }}
                  >
                    {" "}
                    Done{" "}
                  </Text>
                </TouchableOpacity>

                <Image
                  // resizeMode="contain"
                  style={{ width: "100%", height: "96%" }}
                  source={{ uri: IMAGE_URL + poster_path }}
                />
              </View>
            </Modal>

            <View style={{ width: "60%" }}>
              <ScrollView horizontal={true}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      marginTop: 15,
                      marginBottom: 15,
                    }}
                  >
                    {names}
                  </Text>
                </View>
              </ScrollView>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Overview", { overview });
                }}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: "92%",
                    overflow: "hidden",
                    paddingLeft: 8,
                    paddingRight: 8,
                  }}
                >
                  <Text
                    numberOfLines={7}
                    style={[
                      styles.overview,
                      { color: darkMode ? "gray" : "black" },
                    ]}
                  >
                    {" "}
                    {overview}{" "}
                  </Text>
                </View>

                <MaterialCommunityIcons1
                  name="keyboard-arrow-right"
                  size={25}
                  style={{
                    color: "gray",
                    marginTop: 30,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={handleWatchlist}
            style={[
              styles.addtowatch,
              {
                backgroundColor: user
                  ? disableMovie
                    ? darkMode
                      ? "#404040"
                      : "#fff"
                    : "#ffd700"
                  : "#404040",
                borderWidth: darkMode ? null : 0.9,
                borderColor: user
                  ? disableMovie
                    ? darkMode
                      ? "#404040"
                      : "#c9c9c9"
                    : "#ffd700"
                  : "#404040",
              },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name={disableMovie ? "check" : "plus"}
                size={25}
                style={{
                  color: user
                    ? darkMode
                      ? disableMovie
                        ? "#e5e5e5"
                        : "black"
                      : "black"
                    : "#e5e5e5",
                  marginTop: 1,
                  marginLeft: 18,
                  marginRight: 18,
                }}
              />
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 15,
                  marginTop: 4,
                  color: user
                    ? darkMode
                      ? disableMovie
                        ? "#e5e5e5"
                        : "black"
                      : "black"
                    : "#e5e5e5",
                }}
              >
                {disableMovie
                  ? language
                    ? "Added to your watchlist"
                    : "تمت الإضافة الى قائمة المشاهدة"
                  : language
                  ? "Add to Watchlist"
                  : "إضافة الى قائمة المشاهدة"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          height: 500,
          backgroundColor: darkMode ? "black" : "#fff",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={darkMode ? "#e5e5e5" : "gray"} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 0.3,

    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
  },
  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },

  titleContainer: {
    width: "85%",
    textAlign: "left",
    justifyContent: "space-between",
    height: 80,
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
  },
  title: {
    marginBottom: 0,
    fontSize: 25,
    fontWeight: "600",
  },
  posterContainer: {
    flexDirection: "row",
  },
  overview: {
    height: 133,
  },
  addtowatch: {
    marginVertical: 15,
    borderWidth: 0.1,
    width: "94%",
    height: 48,
    alignSelf: "center",
    borderRadius: 5,
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 250,
  },
  background1: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 100,
  },
});
