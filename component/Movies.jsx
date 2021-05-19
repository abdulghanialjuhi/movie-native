import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/Entypo";
import Context from "../context/Context";

const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";
const Movies = ({
  navigation,
  poster_path,
  title,
  vote_average,
  id,
  movie1,
}) => {
  const handlepress = () => {
    navigation.push("Info", { id, movie1 });
  };
  const { darkMode } = useContext(Context);

  return (
    <View
      style={[
        styles.container,
        {
          shadowColor: darkMode ? "gray" : "black",
          backgroundColor: darkMode ? "#191919" : "#fff",
        },
      ]}
    >
      <View style={styles.shadow}>
        <TouchableOpacity onPress={handlepress}>
          <Image
            resizeMode="contain"
            style={{ width: 160, height: 239 }}
            source={{
              uri: IMAGE_URL + poster_path,
            }}
          />
          <View
            style={{
              padding: 9,
              height: "23%",
            }}
          >
            <View>
              <Text style={{ color: darkMode ? "#D8D8D8" : "black" }}>
                <MaterialCommunityIcons name="star" color="#ffd700" size={14} />{" "}
                {vote_average}{" "}
              </Text>
            </View>

            <Text
              style={[
                styles.information,
                { color: darkMode ? "#e5e5e5" : "black" },
              ]}
            >
              {" "}
              {title}{" "}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    margin: 10,
    width: 160,
    height: 310,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.0,
  },
  shadow: {
    overflow: "hidden",
  },
  information: {
    fontWeight: "700",
    fontSize: 13,
    marginTop: 5,
  },
});

export default Movies;
