import React, {
  useContext,
  useEffect,
  useState,
  createRef,
  useRef,
} from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import firebase from "firebase";
import Context from "../context/Context";
import { isIphoneX } from "react-native-iphone-x-helper";
import MaterialCommunityIcons2 from "react-native-vector-icons/AntDesign";
import Popup from "../routes/Popup";
import UserPermition from "../utilities/UserPermition";
import * as ImagePicker from "expo-image-picker";
import Imagepopup from "../component/Imagepopup";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialIcons";
import * as Haptics from "expo-haptics";

export default function Main({ navigation, route }) {
  const user = firebase.auth().currentUser;
  const scroolA = useRef(new Animated.Value(0)).current;
  const { darkMode, language, watchlist, profileImage, actions } = useContext(
    Context
  );

  const HEIGHT = Dimensions.get("window").height;

  let popupRef = createRef();
  let popupRef1 = createRef();

  const handleImagesPicker = () => {
    popupRef1.show1();
  };

  const onClosepopup1 = () => {
    popupRef1.close1();
  };

  const handleSetting = (item) => {
    Haptics.impactAsync();
    popupRef.show(item);
    //     setItem(item);
  };

  const onClosepopup = () => {
    popupRef.close();
  };

  const handlechange = async () => {
    UserPermition.getCameraPermissions();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      await actions({ type: "set_image", payload: result.uri });
      const image = result.uri;
      firebase.database().ref(user.uid).set({
        image,
        watchlist,
      });
    }
  };

  const handleImages = (item) => {
    popupRef.show(item);
    //     setItem(item);
  };

  return (
    <View style={{ flex: 1, backgroundColor: darkMode ? "#0f0f0f" : "#fff" }}>
      <Animated.ScrollView
        //  onScroll={(e) => console.log(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroolA } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={[
          styles.body,
          { backgroundColor: darkMode ? "black" : "#fff" },
        ]}
      >
        <View
          style={[
            styles.container,
            { backgroundColor: darkMode ? "#0f0f0f" : "#fff" },
          ]}
        >
          <Animated.View
            style={{
              transform: [
                { translateY: scroolA },
                {
                  scale: scroolA.interpolate({
                    inputRange: [-200, 0, 200],
                    outputRange: [1.5, 1, 1],
                  }),
                },
              ],
              backgroundColor: darkMode ? "#1e90ff" : "#1e90ff",
              // flexDirection: "row",
              width: "100%",
              height: isIphoneX() ? HEIGHT / 3.2 : HEIGHT / 3.5,
              justifyContent: "center",
              //backgroundColor: "gray",
              // height: 90,
              //  alignItems: "center",
              paddingTop: 9,
              paddingBottom: 10,
              //   borderBottomRightRadius: 25,
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                height: "50%",
                justifyContent: "center",
                paddingBottom: 30,
              }}
            >
              <Animated.Text
                style={{
                  transform: [
                    {
                      scale: scroolA.interpolate({
                        inputRange: [-400, 0, 200],
                        outputRange: [0.5, 1, 1],
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                  fontFamily: "Gill Sans",
                  fontSize: 30,
                  fontWeight: "500",
                  color: darkMode ? "#fff" : "#fff",
                  // letterSpacing: 1,
                }}
              >
                {language ? "Profile" : "الملف الشخصي"}
              </Animated.Text>
            </View>
            {/* <View style={{ width: "10%" }}>
            <MaterialIcons
              name="menu"
              size={28}
              style={[
                styles.leftButton,
                { color: darkMode ? "#fff" : "black" },
              ]}
              onPress={() => navigation.toggleDrawer()}
            />
          </View>
          <View style={{ width: "80%" }}>
            <Text
              style={[
                styles.headerText,
                { color: darkMode ? "#fff" : "black" },
              ]}
            >
              {" "}
              {language ? "Main" : "الملف الشخصي"}{" "}
            </Text>
          </View> */}
            {/* <View style={{ width: "10%" }} /> */}
            {/* <View
            style={{
              width: "100%",
              height: "50%",
              //  backgroundColor: "black",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></View> */}
          </Animated.View>
          <Imagepopup
            ref={(target) => (popupRef1 = target)}
            onTouchOutside={onClosepopup1}
            handlechange={handlechange}
          />
          <Popup
            ref={(target) => (popupRef = target)}
            onTouchOutside={onClosepopup}
          />

          <View
            style={{
              width: "100%",
              alignItems: "center",
              height: isIphoneX() ? HEIGHT / 2.1 : HEIGHT / 1.9,
              //  backgroundColor: "black",
            }}
          >
            <View
              style={[
                styles.container1,
                {
                  height: isIphoneX() ? HEIGHT / 2 : HEIGHT / 1.8,
                  shadowColor: darkMode ? null : "black",
                  backgroundColor: darkMode ? "#171717" : "#fff",
                  borderColor: darkMode ? "#3d3d3d" : "#bdbdbd",
                  // maxHeight: HEIGHT,
                },
              ]}
            >
              <View
                style={{
                  height: isIphoneX() ? HEIGHT / 6 : HEIGHT / 5,
                  //backgroundColor: "black",
                  width: "100%",
                  // paddingBottom: 10,
                  borderBottomWidth: 0.3,
                  borderBottomColor: darkMode ? "#292929" : "#bdbdbd",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "50%",
                    //backgroundColor: "black",
                    alignItems: "flex-end",
                    paddingHorizontal: 15,
                  }}
                >
                  <TouchableOpacity
                    onPress={handleImagesPicker}
                    style={{
                      //  width: "100%",
                      height: 60,
                      backgroundColor: darkMode ? "#0f0f0f" : "#fff",
                      //   padding: 2,
                      position: "absolute",
                      width: 120,
                      height: 120,
                      borderRadius: 60,
                      top: -60,
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      resizeMode="stretch"
                      style={{
                        borderRadius: 60,
                        // left: 20,
                        width: 115,
                        height: 115,
                        borderWidth: 0.3,
                        borderColor: darkMode ? "#fff" : "black",
                        // top: 10,
                        // right: "35%",
                      }}
                      source={
                        profileImage === null
                          ? darkMode
                            ? require("../assets/profile-dark.png")
                            : require("../assets/profile.png")
                          : { uri: profileImage }
                      }
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      marginTop: 20,
                      // paddingTop: 10,
                      marginBottom: isIphoneX() ? 20 : 5,
                    }}
                  >
                    <MaterialCommunityIcons2
                      onPress={handleSetting}
                      name="setting"
                      color={darkMode ? "#fff" : "black"}
                      size={23}
                    />
                  </View>
                </View>
                <View
                  style={{
                    //marginTop: 60,
                    //   position: "absolute",
                    //   borderColor: darkMode ? "#212121" : "#bdbdbd",
                    //  borderWidth: 0.5,
                    alignSelf: "center",
                    // bottom: -90,
                    //backgroundColor: darkMode ? "black" : "#f7f7f7",
                    //    width: "50%",
                    borderRadius: 5,
                    padding: 4,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Gill Sans",
                      color: darkMode ? "#e5e5e5" : "black",
                      fontSize: 20,
                    }}
                  >
                    {user
                      ? user.displayName
                        ? user.displayName
                        : user.email
                      : null}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 15,
                    //  marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      marginRight: 3,
                      color: "gray",
                      marginTop: 5,
                      fontSize: 14,
                      //  fontWeight: "200",
                    }}
                  >
                    {user ? user.email : null}
                  </Text>
                  {/* <Text
                    style={{
                      color: "gray",
                      fontSize: 14,
                      marginTop: 5,
                    }}
                  >
                    {language ? "Watchlist movies" : "افلام في قائمة المشاهدة"}
                  </Text> */}
                </View>
              </View>
              <View
                style={{
                  height: isIphoneX() ? "65%" : "60%",
                  //   backgroundColor: "black",
                  width: "100%",
                  paddingBottom: 5,
                  paddingTop: 5,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  containerStyle={{}}
                  onPress={() => navigation.navigate("Watchlist2")}
                  style={{
                    height: "33%",
                    flexDirection: "row",
                    width: "100%",
                    //backgroundColor: "black",
                    // height: "33%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Gill Sans",
                      fontSize: 20,
                      color: darkMode ? "#fff" : "#182E44",
                    }}
                  >
                    {" "}
                    {language ? "Watchlist movies" : "قائمة المشاهدة"}
                  </Text>
                  <MaterialCommunityIcons
                    name="keyboard-arrow-right"
                    size={30}
                    color={darkMode ? "#e5e5e5" : "#182E44"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  containerStyle={{}}
                  onPress={() => navigation.navigate("UpdateProfile")}
                  style={{
                    height: "33%",
                    flexDirection: "row",
                    width: "100%",
                    //backgroundColor: "black",
                    // height: "33%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Gill Sans",
                      fontSize: 20,
                      color: darkMode ? "#fff" : "#182E44",
                    }}
                  >
                    {" "}
                    {language ? "Update profile" : "تحديث الملف الشخصي"}
                  </Text>
                  <MaterialCommunityIcons
                    name="keyboard-arrow-right"
                    size={30}
                    color={darkMode ? "#e5e5e5" : "#182E44"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  containerStyle={{}}
                  onPress={() => navigation.navigate("UpdateProfile")}
                  style={{
                    height: "33%",
                    flexDirection: "row",
                    width: "100%",
                    //backgroundColor: "black",
                    // height: "33%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Gill Sans",
                      fontSize: 20,
                      color: darkMode ? "#fff" : "#182E44",
                    }}
                  >
                    {" "}
                    {language ? "Update profile" : "تحديث الملف الشخصي"}
                  </Text>
                  <MaterialCommunityIcons
                    name="keyboard-arrow-right"
                    size={30}
                    color={darkMode ? "#e5e5e5" : "#182E44"}
                  />
                </TouchableOpacity>
              </View>
              {/* <View
              style={{
                justifyContent: "space-between",
                height: "50%",
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
                alignItems: "flex-end",
                paddingBottom: 5,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.update,
                  {
                    backgroundColor: darkMode ? "black" : "#4285F4",
                    borderColor: darkMode ? "#292929" : "#4285F4",
                  },
                ]}
                onPress={() => navigation.navigate("UpdateProfile")}
              >
                <Button
                  onPress={() => navigation.navigate("UpdateProfile")}
                  color={darkMode ? "" : "#fff"}
                  title={language ? "Update profile" : "تحديث الملف الشخصي"}
                />
              </TouchableOpacity>
              
            </View> */}
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: darkMode ? "#202020" : "#fff",
                //  borderColor: darkMode ? null : "#c9c9c9",
                //   borderWidth: 1,
              },
            ]}
            onPress={() => firebase.auth().signOut()}
          >
            <Button
              onPress={() => firebase.auth().signOut()}
              color="red"
              title={language ? "Sign out" : "تسجيل الخروج"}
            />
          </TouchableOpacity>
          {/* </View> */}
          {/* </SafeAreaView> */}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    //  backgroundColor: "gray",
    flex: 1,
    alignItems: "center",
    //   justifyContent: "center",
    width: "100%",
  },
  container1: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    position: "absolute",
    top: -50,
    width: "93%",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 0.3,
  },
  update: {
    borderRadius: 4,
    borderWidth: 1,
    width: "60%",
    height: 43,
    alignItems: "center",
  },
  button: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 5,
    //marginTop: 20,
    width: "39%",
    height: 43,
    //  width: 220,
  },
  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
});
