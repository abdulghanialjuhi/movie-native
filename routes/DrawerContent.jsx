import React, { useContext, useEffect, createRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  Switch,
  AsyncStorage,
  Dimensions,
  Animated,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons1 from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons2 from "react-native-vector-icons/AntDesign";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import firebase from "firebase";
import Context from "../context/Context";
import { useAuth } from "../context/AuthContext";
import { isIphoneX } from "react-native-iphone-x-helper";
import Popup from "./Popup";
import * as Haptics from "expo-haptics";
import { Appearance } from "react-native-appearance";
export function CustomDrawer(props) {
  const { actions, darkMode, language } = useContext(Context);
  const colorScheme = Appearance.getColorScheme();

  const { currentUser } = useAuth();
  const windowHeight = Dimensions.get("window").height;

  const onScrollY = new Animated.Value(0);

  const borderOpacity = onScrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  let popupRef = createRef();
  const onClosepopup = () => {
    popupRef.close();
  };

  const handleSetting = (item) => {
    popupRef.show(item);
    Haptics.impactAsync();
    //     setItem(item);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkMode ? "#0c0c0c" : "#fff",
        paddingTop: 30,
      }}
    >
      <View
        style={{
          alignItems: "center",
          marginBottom: 25,
        }}
      >
        <Text
          style={[
            styles.Movie,
            {
              color: darkMode ? "#d9d9d9" : "black",
              marginTop: isIphoneX() ? 40 : 10,
              marginBottom: isIphoneX() ? 40 : 10,
            },
          ]}
        >
          {language ? "Movie App" : "تطبيق افلام"}
        </Text>
      </View>
      <Animated.View
        style={{
          borderColor: darkMode ? "#2e2e2e" : "#c9c9c9",
          borderBottomWidth: 0.3,
          opacity: borderOpacity,
        }}
      />
      {/* <DrawerContentScrollView
        style={{
          backgroundColor: darkMode ? "#0c0c0c" : "white",
        }}
      > */}
      <ScrollView
        scrollEventThrorrle={16}
        style={{
          backgroundColor: darkMode ? "#0c0c0c" : "white",
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: onScrollY } },
            },
          ],
          { useNativeDriver: false }
        )}
      >
        <View
          style={{
            justifyContent: "space-between",
            //  backgroundColor: "gray",
            flex: 1,
            height: isIphoneX() ? windowHeight - 350 : windowHeight - 280,
          }}
        >
          <View>
            <View
              style={{
                borderColor: darkMode ? "#2e2e2e" : "#c9c9c9",
                borderBottomWidth: 0.3,
              }}
            >
              <DrawerItem
                icon={() => (
                  <MaterialCommunityIcons color="gray" name="home" size={24} />
                )}
                label={language ? "Home" : "الصفحة الرئيسة"}
                labelStyle={{
                  color: darkMode ? "#d9d9d9" : "black",
                  fontSize: 14,
                  fontWeight: "600",
                }}
                onPress={() => {
                  props.navigation.navigate("Home");
                }}
              />
            </View>
            <View
              style={{
                borderColor: darkMode ? "#2e2e2e" : "#c9c9c9",
                borderBottomWidth: 0.3,
              }}
            >
              <DrawerItem
                icon={() => (
                  <MaterialCommunityIcons1
                    color="gray"
                    name="stacked-line-chart"
                    size={24}
                  />
                )}
                label={language ? "Top Rated Movies" : "الأفلام الأعلى تقييماً"}
                labelStyle={{
                  color: darkMode ? "#d9d9d9" : "black",
                  fontSize: 14,
                  fontWeight: "600",
                }}
                onPress={() => {
                  props.navigation.navigate("Top");
                }}
              />
            </View>
            <View
              style={{
                borderColor: darkMode ? "#2e2e2e" : "#c9c9c9",
                borderBottomWidth: 0.3,
              }}
            >
              <DrawerItem
                icon={() => (
                  <MaterialCommunityIcons1
                    color="gray"
                    name="movie"
                    size={24}
                  />
                )}
                label={language ? "Up coming movies" : "افلام قادمة قريياً"}
                labelStyle={{
                  color: darkMode ? "#d9d9d9" : "black",
                  fontSize: 14,
                  fontWeight: "600",
                }}
                onPress={() => {
                  props.navigation.navigate("Coming");
                }}
              />
            </View>
            {currentUser ? (
              <DrawerItem
                icon={() => (
                  <MaterialCommunityIcons1 color="gray" name="list" size={24} />
                )}
                label={language ? "Watchlist movies" : "قائمة المشاهدة"}
                labelStyle={{
                  color: darkMode ? "#d9d9d9" : "black",
                  fontSize: 14,
                  fontWeight: "600",
                }}
                onPress={() => {
                  props.navigation.navigate("Watchlist");
                }}
              />
            ) : null}
          </View>
          <View>
            <View
              style={{
                borderColor: darkMode ? "#2e2e2e" : "#c9c9c9",
                borderBottomWidth: 0.3,
              }}
            />
            <DrawerItem
              icon={() => (
                <MaterialCommunityIcons color="gray" name="info" size={24} />
              )}
              label={language ? "About" : "عن التطبيق"}
              labelStyle={{
                color: darkMode ? "#d9d9d9" : "black",
                fontSize: 14,
                fontWeight: "600",
              }}
              onPress={() => {
                props.navigation.navigate("About");
              }}
            />
          </View>
        </View>
      </ScrollView>
      {/* </DrawerContentScrollView> */}
      <View
        style={{ margin: 10, padding: 10, marginBottom: isIphoneX() ? 20 : 5 }}
      >
        <MaterialCommunityIcons2
          onPress={handleSetting}
          name="setting"
          color="gray"
          size={28}
        />
      </View>

      <Popup
        ref={(target) => (popupRef = target)}
        onTouchOutside={onClosepopup}
      />

      {/* <View
        style={{
          flexDirection: "row",
          marginBottom: isIphoneX() ? 25 : 10,
          alignContent: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            padding: 1,
          }}
        >
          <MaterialCommunityIcons1
            color="gray"
            name={darkMode ? "lightbulb" : "lightbulb-outline"}
            size={24}
            style={{ marginLeft: 8, marginTop: 2 }}
          />
          <Text
            style={{
              color: darkMode ? "#d9d9d9" : "black",
              fontSize: 15,
              marginTop: 5,
              marginLeft: 15,
              fontWeight: "600",
            }}
          >
            {language ? "Dark mode" : "الوضع الليلي"}
          </Text>
        </View>

        <Switch
          thumbColor={darkMode ? "#e5e5e5" : "#f4f3f4"}
          onValueChange={setmode}
          ios_backgroundColor={darkMode ? "#e5e5e5" : "#2E2E2E"}
          value={darkMode}
        />
      </View> */}
    </View>
  );
}

// export function SearchCustomDrawer(props) {
//   const { actions, darkMode } = useContext(Context);
//   const user = firebase.auth().currentUser;

//   const setmode = async () => {
//     actions({ type: "set_dark", payload: !darkMode });
//     try {
//       await AsyncStorage.setItem("Mode", JSON.stringify(!darkMode));
//     } catch (err) {
//       alert(err);
//     }
//   };

//   const getitem = async () => {
//     try {
//       const value = JSON.parse(await AsyncStorage.getItem("Mode"));

//       if (value !== null) {
//         actions({ type: "set_dark", payload: value });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     getitem();
//   }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: darkMode ? "#0c0c0c" : "#fff",
//         paddingTop: 30,
//       }}
//     >
//       <View
//         style={{
//           alignItems: "center",
//           marginBottom: 25,
//         }}
//       >
//         <Text style={[styles.Movie, { color: darkMode ? "#d9d9d9" : "black" }]}>
//           {" "}
//           Movie App{" "}
//         </Text>
//       </View>
//       <DrawerContentScrollView
//         style={{
//           marginTop: 0,
//           backgroundColor: darkMode ? "#0c0c0c" : "white",
//         }}
//       >
//         <View>
//           <DrawerItem
//             icon={() => (
//               <MaterialCommunityIcons color="gray" name="home" size={24} />
//             )}
//             label="Home"
//             labelStyle={{
//               color: darkMode ? "#d9d9d9" : "black",
//               fontSize: 14,
//               fontWeight: "600",
//             }}
//             onPress={() => {
//               props.navigation.navigate("Home");
//             }}
//           />
//           <DrawerItem
//             icon={() => (
//               <MaterialCommunityIcons1
//                 color="gray"
//                 name="stacked-line-chart"
//                 size={24}
//               />
//             )}
//             label="Top Rated Movies"
//             labelStyle={{
//               color: darkMode ? "#d9d9d9" : "black",
//               fontSize: 14,
//               fontWeight: "600",
//             }}
//             onPress={() => {
//               props.navigation.navigate("Top1");
//             }}
//           />
//           <DrawerItem
//             icon={() => (
//               <MaterialCommunityIcons1 color="gray" name="movie" size={24} />
//             )}
//             label="Up Coming Movies"
//             labelStyle={{
//               color: darkMode ? "#d9d9d9" : "black",
//               fontSize: 14,
//               fontWeight: "600",
//             }}
//             onPress={() => {
//               props.navigation.navigate("Coming1");
//             }}
//           />
//           {user ? (
//             <DrawerItem
//               icon={() => (
//                 <MaterialCommunityIcons1 color="gray" name="list" size={24} />
//               )}
//               label="Watchlist Movies"
//               labelStyle={{
//                 color: darkMode ? "#d9d9d9" : "black",
//                 fontSize: 14,
//                 fontWeight: "600",
//               }}
//               onPress={() => {
//                 props.navigation.navigate("Watchlist1");
//               }}
//             />
//           ) : null}
//         </View>
//       </DrawerContentScrollView>
//       <View
//         style={{
//           borderBottomColor: "gray",
//           borderBottomWidth: 1,
//         }}
//       />
//       <DrawerItem
//         icon={() => (
//           <MaterialCommunityIcons color="gray" name="info" size={24} />
//         )}
//         label="About"
//         labelStyle={{
//           color: darkMode ? "#d9d9d9" : "black",
//           fontSize: 14,
//           fontWeight: "600",
//         }}
//         onPress={() => {
//           props.navigation.navigate("About1");
//         }}
//       />
//       <View
//         style={{
//           marginTop: 100,
//           flexDirection: "row",
//           marginBottom: 35,
//           justifyContent: "space-between",
//           padding: 10,
//         }}
//       >
//         <View style={{ justifyContent: "center", flexDirection: "row" }}>
//           <MaterialCommunityIcons2
//             color="gray"
//             name="theme-light-dark"
//             size={24}
//             style={{ marginLeft: 8 }}
//           />
//           <Text
//             style={{
//               color: darkMode ? "#d9d9d9" : "black",
//               fontSize: 14,
//               marginTop: 5,
//               marginLeft: 15,
//               fontWeight: "600",
//             }}
//           >
//             {" "}
//             Dark mode{" "}
//           </Text>
//         </View>

//         <Switch
//           thumbColor={darkMode ? "#e5e5e5" : "#f4f3f4"}
//           onValueChange={setmode}
//           ios_backgroundColor={darkMode ? "#e5e5e5" : "#2E2E2E"}
//           value={darkMode}
//         />
//       </View>
//     </View>
//   );
// }

// export function LogCustomDrawer(props) {
//   const { actions, darkMode } = useContext(Context);
//   const user = firebase.auth().currentUser;

//   const setmode = async () => {
//     actions({ type: "set_dark", payload: !darkMode });
//     try {
//       await AsyncStorage.setItem("Mode", JSON.stringify(!darkMode));
//     } catch (err) {
//       alert(err);
//     }
//   };

//   const getitem = async () => {
//     try {
//       const value = JSON.parse(await AsyncStorage.getItem("Mode"));

//       if (value !== null) {
//         actions({ type: "set_dark", payload: value });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     getitem();
//   }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: darkMode ? "#0c0c0c" : "#fff",
//         paddingTop: 30,
//       }}
//     >
//       <View
//         style={{
//           alignItems: "center",
//           marginBottom: 25,
//         }}
//       >
//         <Text style={[styles.Movie, { color: darkMode ? "#d9d9d9" : "black" }]}>
//           {" "}
//           Movie App{" "}
//         </Text>
//       </View>
//       <DrawerContentScrollView
//         style={{
//           marginTop: 0,
//           backgroundColor: darkMode ? "#0c0c0c" : "white",
//         }}
//       >
//         <View>
//           <DrawerItem
//             icon={() => (
//               <MaterialCommunityIcons color="gray" name="home" size={24} />
//             )}
//             label="Home"
//             labelStyle={{
//               color: darkMode ? "#d9d9d9" : "black",
//               fontSize: 14,
//               fontWeight: "600",
//             }}
//             onPress={() => {
//               props.navigation.navigate("Home");
//             }}
//           />
//           <DrawerItem
//             icon={() => (
//               <MaterialCommunityIcons1
//                 color="gray"
//                 name="stacked-line-chart"
//                 size={24}
//               />
//             )}
//             label="Top Rated Movies"
//             labelStyle={{
//               color: darkMode ? "#d9d9d9" : "black",
//               fontSize: 14,
//               fontWeight: "600",
//             }}
//             onPress={() => {
//               props.navigation.navigate("Top2");
//             }}
//           />
//           <DrawerItem
//             icon={() => (
//               <MaterialCommunityIcons1 color="gray" name="movie" size={24} />
//             )}
//             label="Up Coming Movies"
//             labelStyle={{
//               color: darkMode ? "#d9d9d9" : "black",
//               fontSize: 14,
//               fontWeight: "600",
//             }}
//             onPress={() => {
//               props.navigation.navigate("Coming2");
//             }}
//           />
//           {user ? (
//             <DrawerItem
//               icon={() => (
//                 <MaterialCommunityIcons1 color="gray" name="list" size={24} />
//               )}
//               label="Watchlist Movies"
//               labelStyle={{
//                 color: darkMode ? "#d9d9d9" : "black",
//                 fontSize: 14,
//                 fontWeight: "600",
//               }}
//               onPress={() => {
//                 props.navigation.navigate("Watchlist2");
//               }}
//             />
//           ) : null}
//         </View>
//       </DrawerContentScrollView>
//       <View
//         style={{
//           borderBottomColor: "gray",
//           borderBottomWidth: 1,
//         }}
//       />
//       <DrawerItem
//         icon={() => (
//           <MaterialCommunityIcons color="gray" name="info" size={24} />
//         )}
//         label="About"
//         labelStyle={{
//           color: darkMode ? "#d9d9d9" : "black",
//           fontSize: 14,
//           fontWeight: "600",
//         }}
//         onPress={() => {
//           props.navigation.navigate("About1");
//         }}
//       />
//       <View
//         style={{
//           marginTop: 100,
//           flexDirection: "row",
//           marginBottom: 35,
//           justifyContent: "space-between",
//           padding: 10,
//         }}
//       >
//         <View style={{ justifyContent: "center", flexDirection: "row" }}>
//           <MaterialCommunityIcons2
//             color="gray"
//             name="theme-light-dark"
//             size={24}
//             style={{ marginLeft: 8 }}
//           />
//           <Text
//             style={{
//               color: darkMode ? "#d9d9d9" : "black",
//               fontSize: 14,
//               marginTop: 5,
//               marginLeft: 15,
//               fontWeight: "600",
//             }}
//           >
//             {" "}
//             Dark mode{" "}
//           </Text>
//         </View>

//         <Switch
//           thumbColor={darkMode ? "#e5e5e5" : "#f4f3f4"}
//           onValueChange={setmode}
//           ios_backgroundColor={darkMode ? "#e5e5e5" : "#2E2E2E"}
//           value={darkMode}
//         />
//       </View>
//     </View>
//   );
// }
const styles = StyleSheet.create({
  Movie: {
    color: "#e5e5e5",
    fontSize: 20,
    // marginTop: 50,
    fontWeight: "bold",
  },
});
