import React, { useEffect, useState, useContext, useRef } from "react";
import ShowInfo from "./ShowInfo";
import Video from "./Video";
import Context from "../context/Context";
import Similar from "./Similar";
import {
  View,
  ScrollView,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialIcons";

import Header from "../shared/Header";
export default function Info({ route, navigation }) {
  const { id, item } = route.params;
  const [movie, setMovie] = useState("");
  const [isloaded, setIsloaded] = useState(true);

  const { actions, darkMode } = useContext(Context);
  const isMountedRef = useRef(false);

  const onScrollY = new Animated.Value(0);
  const HEIGHT = isIphoneX() ? 90 : 60;
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

  useEffect(() => {
    isMountedRef.current = true;

    try {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=c417b9996e32c1b5ea31b6d166a52ff9`
      )
        .then((res) => res.json())
        .then((data) => {
          if (isMountedRef.current) {
            setMovie(data);
            actions({ type: "setState", payload: data });
            setIsloaded(true);
          }
        });
    } catch {
      alert("Please refresh the page ");
    }

    return () => (isMountedRef.current = false);
  }, []);

  return (
    <>
      <Header
        name={movie.title}
        onScrollY={onScrollY}
        navigation={navigation}
        route={route}
      />
      {/* <Animated.View
        style={[
          styles.header,
          {
            borderColor: darkMode ? "#2e2e2e" : "#c9c9c9",
            paddingTop: isIphoneX() ? 40 : 10,
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
              {movie.title}{" "}
            </Text>
          </View>
          <View style={{ width: "10%" }} />
        </Animated.View>
      </Animated.View> */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={5}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: onScrollY } },
            },
          ],
          { useNativeDriver: false }
        )}
        style={{ flex: 1, backgroundColor: darkMode ? "black" : "#e5e5e5" }}
      >
        <ShowInfo {...movie} navigation={navigation} movie={movie} />
        <View style={{ height: 15 }} />

        <Video isLoaded={isloaded} id={id} navigation={navigation} />
        <View style={{ height: 15 }} />
        <Similar id={id} navigation={navigation} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 0.3,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    width: "100%",
  },
  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
});
