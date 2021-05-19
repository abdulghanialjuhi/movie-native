import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createRef,
} from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  Animated,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import Context from "../context/Context";
import MaterialCommunityIcons from "react-native-vector-icons/Entypo";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Header from "../shared/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { isIphoneX } from "react-native-iphone-x-helper";
import Bottompopup from "./BottomPopup";
import * as Haptics from "expo-haptics";

const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

export default function Home({ navigation, route }) {
  const [movies, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoad, setIsLoad] = useState(false);
  const { darkMode, language } = useContext(Context);
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const APIURL = `https://api.themoviedb.org/3/movie/popular?sort_by=popularity.desc&api_key=c417b9996e32c1b5ea31b6d166a52ff9&page=${page}`;

  useEffect(() => {
    setIsLoad(true);
    let isMounted = true;
    if (isMounted) {
      try {
        fetch(APIURL)
          .then((res) => res.json())
          .then((data) => {
            const movies1 = data.results;
            setMovie(movies.concat(movies1));
            //setMovie(movies1);
            setIsLoad(false);
          });
      } catch {
        alert("Please refresh the page ");
      }
    }
    return () => {
      isMounted = false;
    };
  }, [page]);

  const handleLoading = () => {
    setIsLoad(true);
    setPage(page + 1);
  };

  const footerComponent = () => {
    return isLoad ? (
      <View style={{ padding: 15 }}>
        <ActivityIndicator />
      </View>
    ) : null;
  };

  const ITEM_SIZE = 90 * 3;
  const scaleAnimated = useRef(new Animated.Value(1)).current;
  const [indexNumber, setIndexNumber] = useState();
  const ref = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const onScrollY = new Animated.Value(0);

  useScrollToTop(ref);

  let popupRef = createRef();
  const onClosepopup = () => {
    popupRef.close();
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: darkMode ? "black" : "#fff",
        },
      ]}
    >
      <Header
        name={language ? "Popular" : "افلام رائجة"}
        onScrollY={onScrollY}
        navigation={navigation}
        route={route}
      />

      <Animated.FlatList
        onEndReached={handleLoading}
        ref={ref}
        numColumns={2}
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
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "center" }}
        data={movies}
        keyExtractor={(item) => item.id}
        ListFooterComponent={footerComponent}
        renderItem={({ item, index }) => {
          const inputRange = [-1, 0, 320 * index, 320 * (index + 2)];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const id = item.id;

          const onLongPress = (item) => {
            Haptics.impactAsync();
            popupRef.show(item);
          };

          //  const movie = item;
          const handlepress = () => {
            //  Haptics.selectionAsync();
            navigation.push("Info", { id, item });
          };

          const handlePressIn = (index1) => {
            setIndexNumber(index1);

            Animated.timing(scaleAnimated, {
              toValue: 0.95,
              duration: 150,
              useNativeDriver: true,
            }).start();
          };

          const handlePressOut = () => {
            Animated.timing(scaleAnimated, {
              toValue: 1,
              duration: 150,
              useNativeDriver: true,
            }).start(() => {
              setIndexNumber(null);
            });
          };

          const scaleAnimation = {
            transform: [{ scale: scaleAnimated }],
          };

          return (
            <Animated.View
              style={[
                styles.container1,
                index === indexNumber ? scaleAnimation : null,
                {
                  width: "44%",
                  height: screenHeight / 2.5,
                  shadowColor: darkMode ? "gray" : "black",
                  backgroundColor: darkMode ? "#191919" : "#fff",
                  //   opacity: scale,
                  // transform: [{ scale }],
                },
              ]}
            >
              <Bottompopup
                ref={(target) => (popupRef = target)}
                onTouchOutside={onClosepopup}
                navigation={navigation}
              />
              <View style={styles.shadow}>
                <TouchableWithoutFeedback
                  onLongPress={onLongPress.bind(this, item)}
                  onPressIn={handlePressIn.bind(this, index)}
                  onPressOut={handlePressOut}
                  onPress={handlepress}
                >
                  <Animated.View
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        height: "80%",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        // resizeMode="contain"
                        style={{ width: "100%", height: "100%" }}
                        source={{
                          uri: IMAGE_URL + item.poster_path,
                        }}
                      />
                    </View>

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
                        {item.title}
                      </Text>
                    </View>
                  </Animated.View>
                </TouchableWithoutFeedback>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container1: {
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.0,
  },
  header: {
    borderBottomWidth: 0.3,

    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
  },
  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  shadow: {
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },
  information: {
    fontWeight: "700",
    fontSize: 13,
    marginTop: 5,
  },
});
