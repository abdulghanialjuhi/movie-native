import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Context from "../context/Context";
import Search from "../shared/SearchHeader";

const search_api =
  "https://api.themoviedb.org/3/search/movie?api_key=c417b9996e32c1b5ea31b6d166a52ff9&query=";

const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

export default function Onchange({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [isload, setIsload] = useState(false);
  const [isMovies, setIsMovies] = useState(true);
  const windowWidth = Dimensions.get("window").width;

  const { darkMode, search, actions } = useContext(Context);

  useEffect(() => {
    setTimeout(() => {
      //setIsload(false);
      let isMounted = true;
      if (isMounted) {
        try {
          fetch(search_api + search)
            .then((res) => res.json())
            .then((data) => {
              if (data.total_pages > 0) {
                setMovies(data.results);
                setIsMovies(true);
              } else {
                setIsMovies(false);
              }
              setIsload(true);
            });
        } catch {
          alert("Please refresh the page ");
        }
      }
      return () => {
        isMounted = false;
      };
    }, 200);
  }, [search]);

  if (isload) {
    if (isMovies) {
      return (
        <View style={styles.container}>
          <FlatList
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag"
            style={{ width: "100%" }}
            contentContainerStyle={{
              //  marginTop: 20,
              justifyContent: "center",
              width: "100%",
              backgroundColor: darkMode ? "#080808" : "#f7f7f7",
              //  padding: 10,
            }}
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const id = item.id;
              const handlepress = () => {
                navigation.push("Info", { id, item });
              };
              return (
                <View
                  style={[
                    styles.movieContainer,
                    {
                      //  marginBottom: 10,
                      borderWidth: 0.3,
                      borderRightColor: "transparent",
                      borderLeftColor: "transparent",
                      borderTopColor: "transparent",
                      borderBottomColor: darkMode ? "#2e2e2e" : "#c9c9c9",
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={handlepress}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",

                      width: "100%",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ width: 53, height: 73 }}
                      source={{
                        uri: IMAGE_URL + item.poster_path,
                      }}
                    />
                    <View style={styles.textcontainer}>
                      <View
                        style={{
                          height: "75%",
                          paddingTop: 10,
                          justifyContent: "center",
                          //   backgroundColor: "#e5e5e5",
                        }}
                      >
                        <Text
                          style={{
                            color: darkMode ? "#fff" : "black",
                            paddingHorizontal: 15,
                          }}
                        >
                          {item.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          height: "25%",
                          justifyContent: "flex-end",
                          //  backgroundColor: "#e5e5e5",
                        }}
                      >
                        <Text
                          style={{
                            color: darkMode ? "gray" : "#4a4a4a",
                            paddingHorizontal: 15,
                            fontSize: 12,
                          }}
                        >
                          {item.release_date}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      );
    } else {
      return null;
    }
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={{ marginTop: 20 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  movieContainer: {
    height: 85,
    flexDirection: "row",
    padding: 10,
    //   alignItems: "center",
  },
  textcontainer: {
    //justifyContent: "flex-end",
    // backgroundColor: "#e5e5e5",
    height: "100%",
  },
});
