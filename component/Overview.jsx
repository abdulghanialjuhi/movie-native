import React, { useContext } from "react";
import { View, Text, Animated, ScrollView } from "react-native";
import Context from "../context/Context";
import Header from "../shared/Header";

export default function Overview({ route, navigation }) {
  const { overview } = route.params;
  const { darkMode, language } = useContext(Context);
  const onScrollY = new Animated.Value(0);

  return (
    <>
      <Header
        name={language ? "OverView" : "القصة"}
        onScrollY={onScrollY}
        navigation={navigation}
        route={route}
      />
      <ScrollView
        style={{
          backgroundColor: darkMode ? "black" : "#fff",
          flex: 1,
          paddingTop: 30,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Text
          style={{
            color: darkMode ? "#e5e5e5" : "black",
            fontSize: 15,
            fontWeight: "400",
          }}
        >
          {overview}
        </Text>
      </ScrollView>
    </>
  );
}
