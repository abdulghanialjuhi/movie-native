import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
} from "react-native";
import Context from "../context/Context";
import MaterialCommunityIcons from "react-native-vector-icons/Entypo";
import Search from "../shared/SearchHeader";

const search_api =
  "https://api.themoviedb.org/3/search/movie?api_key=c417b9996e32c1b5ea31b6d166a52ff9&query=";

const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

export default function Searched({ route, navigation }) {
  const [movies, setMovies] = useState([]);
  const [isload, setIsload] = useState(true);
  const { search } = route.params;
  const { darkMode, actions, searchHistory, language } = useContext(Context);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      try {
        fetch(search_api + search)
          .then((res) => res.json())
          .then((data) => {
            if (data.total_pages > 0) {
              setMovies(data.results);
              setIsload(true);
            } else {
              setIsload(false);
            }
          });
      } catch {
        alert("Please refresh the page ");
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = () => {
    if (search.length > 0) {
      const newSearch = {
        id: Math.random(),
        search,
      };
      actions({ type: "set_show", payload: false });
      actions({
        type: "add_search",
        payload: [...searchHistory, newSearch],
      });
    }
  };

  if (isload) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: darkMode ? "black" : "#fff",
          },
        ]}
      >
        <Search
          Search={"Search"}
          navigation={navigation}
          handleSubmit={handleSubmit}
        />
        <FlatList
          ListHeaderComponentStyle={{ flex: 1 }}
          numColumns={2}
          style={{ width: "100%" }}
          contentContainerStyle={{ alignItems: "center" }}
          data={movies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const id = item.id;
            const handlepress = () => {
              navigation.push("Info", { id, item });
            };

            return (
              <View
                style={[
                  styles.container1,
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
                      style={{ width: 170, height: 239 }}
                      source={{
                        uri: IMAGE_URL + item.poster_path,
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
                          <MaterialCommunityIcons
                            name="star"
                            color="#ffd700"
                            size={14}
                          />{" "}
                          {item.vote_average}{" "}
                        </Text>
                      </View>

                      <Text
                        style={[
                          styles.information,
                          { color: darkMode ? "#e5e5e5" : "black" },
                        ]}
                      >
                        {" "}
                        {item.title}{" "}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  } else {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: darkMode ? "black" : "#fff",
          },
        ]}
      >
        <Search
          Search={"Search"}
          navigation={navigation}
          handleSubmit={handleSubmit}
        />
        <ScrollView style={{ backgroundColor: darkMode ? "black" : "#fff" }}>
          <Text
            style={[styles.notFound, { color: darkMode ? "#e5e5e5" : "black" }]}
          >
            {" "}
            {language ? "Movie not found" : "لم يتم العثور على الفيلم"}{" "}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container1: {
    marginTop: 25,
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
  notFound: {
    textAlign: "center",
    marginTop: 100,
    opacity: 0.5,
    fontSize: 23,
  },
});
