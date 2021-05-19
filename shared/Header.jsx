import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  Dimensions,
} from "react-native";
import Context from "../context/Context";
import Search from "../component/Search";
import { isIphoneX } from "react-native-iphone-x-helper";
import { MaterialIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialIcons";

export default function Header({ name, route, onScrollY, navigation }) {
  const { darkMode, search, actions } = useContext(Context);
  const windowHeight = Dimensions.get("window").height;

  //const onScrollY = new Animated.Value(0);
  const HEIGHT = isIphoneX() ? 90 : windowHeight / 11;
  const diffclamp = Animated.diffClamp(onScrollY, 0, HEIGHT);

  const isIphone = isIphoneX() ? 15 : 25;
  // console.log(ifIphoneX);
  const diffClampHeight = diffclamp.interpolate({
    inputRange: [0, HEIGHT],
    outputRange: [HEIGHT, isIphone],
    extrapolate: "clamp",
  });
  const translateY = diffclamp.interpolate({
    inputRange: [0, HEIGHT],
    outputRange: [0, -HEIGHT],
    extrapolate: "clamp",
  });

  const diffClampOpacity = diffclamp.interpolate({
    inputRange: [0, 20],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          borderColor: darkMode ? "#2e2e2e" : "#c9c9c9",
          paddingTop: isIphoneX() ? 40 : 20,
          backgroundColor: darkMode ? "#080808" : "#f7f7f7",
          height: diffClampHeight,
          //opacity: diffClampOpacity,
        },
      ]}
    >
      <Animated.View
        style={{
          // backgroundColor: "#fff",
          width: "100%",
          height: "100%",
          alignItems: "center",
          flexDirection: "row",
          opacity: diffClampOpacity,
          transform: [{ translateY: translateY }],
        }}
      >
        {route.name === "Home" ||
        route.name === "Log In" ||
        route.name === "Main" ? (
          <>
            <View style={{ width: "10%" }}>
              <MaterialIcons
                name="menu"
                size={28}
                style={{ color: darkMode ? "#fff" : "black" }}
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
                {name}{" "}
              </Text>
            </View>
            <View style={{ width: "10%" }} />
          </>
        ) : (
          <>
            <View style={{ width: "10%" }}>
              <MaterialCommunityIcons
                name="arrow-back-ios"
                size={23}
                style={[
                  {
                    color: darkMode ? "#1e90ff" : "black",
                    width: 30,
                  },
                ]}
                onPress={() => navigation.goBack()}
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
                {name}{" "}
              </Text>
            </View>
            <View style={{ width: "10%" }} />
          </>
        )}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 0.3,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    width: "100%",
  },
  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
});
