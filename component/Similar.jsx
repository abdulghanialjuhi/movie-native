import React, { useEffect, useState, useContext, useRef } from "react";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import Context from "../context/Context";
import Movies from "./Movies";

export default function Similar({ id, navigation }) {
  const [similar, setSimilar] = useState([]);
  const { darkMode, language } = useContext(Context);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    try {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=c417b9996e32c1b5ea31b6d166a52ff9`
      )
        .then((res) => res.json())
        .then((data) => {
          if (isMountedRef.current) {
            const data1 = data.results;
            setSimilar(data1);
          }
        });
    } catch {
      alert("Please refresh the page ");
    }

    return () => (isMountedRef.current = false);
  }, []);
  return (
    <View
      style={{
        backgroundColor: darkMode ? "black" : "#fff",
        marginBottom: 10,
        paddingBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          //   backgroundColor: "gray",
          padding: 4,
          marginTop: 10,
          marginBottom: 5,
        }}
      >
        <View
          style={{
            backgroundColor: "#ffd700",
            width: 5,
            height: 27,
            marginLeft: 10,
            borderRadius: 20,
          }}
        ></View>

        <Text
          style={{
            color: darkMode ? "#fff" : "black",

            marginLeft: 4,
            marginTop: 1,
            fontSize: 20,

            fontWeight: "500",
          }}
        >
          {" "}
          {language ? "More like this" : "المزيد من الافلام المشابهة"}{" "}
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        style={{ backgroundColor: darkMode ? "black" : "#fff" }}
      >
        <View style={styles.container}>
          {similar.map((movie) => (
            <Movies
              key={movie.id}
              movie1={movie}
              {...movie}
              navigation={navigation}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
});
