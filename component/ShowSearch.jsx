import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/Entypo";

const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";
export default function ShowSearch({
  navigation,
  title,
  poster_path,
  id,
  vote_average,
}) {
  const handlepress = () => {
    navigation.navigate("Info", { id });
  };

  return (
    <View style={styles.container}>
      <View>
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
              <Text style={{ color: "#D8D8D8" }}>
                <MaterialCommunityIcons name="star" color="#ffd700" size={14} />{" "}
                {vote_average}{" "}
              </Text>
            </View>

            <Text style={styles.information}> {title} </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    backgroundColor: "#191919",
    margin: 10,
    width: 160,
    height: 310,
    alignItems: "center",
    overflow: "hidden",
  },
  information: {
    color: "#e5e5e5",
    fontWeight: "700",
    fontSize: 13,
    marginTop: 5,
  },
});
