import React, { Component, createRef } from "react";
import firebase from "firebase";
import Context from "../context/Context";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  Alert,
  Animated,
  ActionSheetIOS,
  Platform,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons1 from "react-native-vector-icons/AntDesign";
import Header from "../shared/Header";
import * as Haptics from "expo-haptics";
import Modal from "react-native-modal";
import { Appearance } from "react-native-appearance";
import { Transition, Transitioning } from "react-native-reanimated";
const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

class Watchlist extends Component {
  constructor() {
    super();
    this.state = {
      indexNumber: null,
      watchlistmovie: [],
      isloaded: false,
      method: true,
      loading: true,
      loaded: true,
      fadeOutAni: new Animated.Value(1),
    };

    this.ref = createRef();
  }

  // transition = (
  //   <Transition.Together>
  //     <Transition.In
  //       type="slide-left"
  //       interpolation="linear"
  //       durationMs={2000}
  //     />
  //     {/* <Transition.Change durationMs={2000} /> */}
  //   </Transition.Together>
  // );

  _isMounted = true;
  async componentDidMount() {
    this.setState({ isloaded: true });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  static contextType = Context;

  render() {
    const {
      watchlistmovie,
      isloaded,
      loaded,
      fadeOutAni,
      indexNumber,
    } = this.state;
    const { darkMode, watchlist, actions, language } = this.context;
    const { navigation, route } = this.props;
    const onScrollY = new Animated.Value(0);
    const colorScheme = Appearance.getColorScheme();

    const handleremove = async (item) => {
      if (Platform.OS === "ios") {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            title: item.title,
            options: [
              language ? "Cancel" : "إلغاء",
              language ? "Remove from Watchlist" : "إزاله من قائمة المشاهدة",
            ],
            destructiveButtonIndex: 1,
            cancelButtonIndex: 0,
            // userInterfaceStyle: "dark",
            //   colorScheme === "dark" ? "dark" : "light",
          },
          async (buttonIndex) => {
            if (buttonIndex === 0) {
              this.setState({ indexNumber: null });
              // console.log("2");
            } else if (buttonIndex === 1) {
              Haptics.impactAsync();
              await this.setState({ loaded: false });
              Animated.timing(fadeOutAni, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false,
              }).start(async () => {
                const remove = watchlist.filter((w) => w.id !== item.id);
                await actions({
                  type: "add_watchlist",
                  payload: remove,
                });
                Animated.timing(fadeOutAni, {
                  toValue: 1,
                  duration: 200,
                  useNativeDriver: false,
                }).start(() => {
                  this.setState({ loaded: true });
                  this.setState({ indexNumber: null });
                });
              });
            }
          }
        );
      } else {
        Alert.alert(
          language ? "Are you sure" : "هل انت متأكد",
          language
            ? "you want to remove this movie from your watchlist"
            : "انك تريد ان تزيل هذا الفليم من قائمة المشاهدة",
          [
            {
              text: language ? "Yes" : "نعم",
              onPress: async () => {
                this.setState({ loaded: false });
                const remove = watchlist.filter((w) => w.id !== id);
                await actions({
                  type: "add_watchlist",
                  payload: remove,
                });
                Haptics.impactAsync();
                this.setState({ loaded: true });
              },
              style: "destructive",
            },
            {
              text: language ? "Cancel" : "إلغاء",
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
      }
    };

    if (!isloaded) {
      return (
        <View
          style={{
            backgroundColor: darkMode ? "black" : "#fff",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#e5e5e5" />
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: darkMode ? "black" : "#fff",
            flex: 1,
          }}
        >
          {watchlist ? (
            watchlist.length > 0 ? (
              <View
                style={[
                  styles.container,
                  {
                    backgroundColor: darkMode ? "black" : "#fff",
                  },
                ]}
              >
                <Header
                  name={language ? "Watchlist" : "قائمة المشاهدة"}
                  onScrollY={onScrollY}
                  navigation={navigation}
                  route={route}
                />

                <FlatList
                  numColumns={2}
                  style={{
                    width: "100%",
                    marginTop: 10,
                  }}
                  contentContainerStyle={{
                    alignSelf: "center",
                  }}
                  data={watchlist}
                  keyExtractor={(item) => item.id}
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
                  renderItem={({ item, index }) => {
                    const id = item.id;
                    const handlepress = () => {
                      navigation.push("Info", { id, item });
                    };

                    const handlepressIn = (index1) => {
                      this.setState({ indexNumber: index1 });
                    };

                    if (item.empty) {
                      return (
                        <View
                          style={[
                            styles.container1,
                            { backgroundColor: "transparent" },
                          ]}
                        />
                      );
                    }

                    const opacityAnimated = {
                      opacity: fadeOutAni,
                    };
                    return (
                      <Animated.View
                        ref={this.ref}
                        transition={this.transition}
                        style={[
                          styles.container1,
                          index == indexNumber ? opacityAnimated : null,
                          {
                            shadowColor: darkMode ? "gray" : "black",
                            backgroundColor: darkMode ? "#191919" : "#fff",
                          },
                        ]}
                      >
                        <Modal
                          animationIn="fadeIn"
                          animationOut="fadeOut"
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          isVisible={!loaded}
                          useNativeDriver={false}
                        >
                          <ActivityIndicator />
                        </Modal>
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
                                <Text
                                  style={{
                                    color: darkMode ? "#D8D8D8" : "black",
                                  }}
                                >
                                  <MaterialCommunityIcons
                                    name="star"
                                    color="#ffd700"
                                    size={14}
                                  />{" "}
                                  {item.vote_average}{" "}
                                </Text>
                              </View>
                              <View style={{ height: 20 }}>
                                <Text
                                  style={[
                                    styles.information,
                                    {
                                      color: darkMode ? "#e5e5e5" : "black",
                                    },
                                  ]}
                                >
                                  {item.title}
                                </Text>
                              </View>
                              <TouchableOpacity
                                style={styles.removebuttin}
                                onPressIn={handlepressIn.bind(this, index)}
                                onPress={handleremove.bind(this, item, index)}
                              >
                                <MaterialCommunityIcons1
                                  name="check"
                                  size={17}
                                  color={darkMode ? "#4285F4" : "#4285F4"}
                                />
                                <Text
                                  style={{
                                    color: darkMode ? "#4285F4" : "#4285F4",
                                    marginLeft: 4,
                                  }}
                                >
                                  {language ? "Watchlisted" : "تمت المشاهدة"}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </Animated.View>
                    );
                  }}
                />
              </View>
            ) : (
              <>
                <Header
                  name={language ? "Watchlist" : "قائمة المشاهدة"}
                  onScrollY={onScrollY}
                  navigation={navigation}
                  route={route}
                />
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "gray", fontSize: 20 }}>
                    {" "}
                    {language
                      ? "You dont have movies on your watchlist"
                      : "ليس لديك افلام في قائمة المشاهدة"}{" "}
                  </Text>
                  <Text style={{ color: "gray", fontSize: 20, marginTop: 15 }}>
                    {" "}
                    {language ? "Add some!" : "اضف افلام !"}{" "}
                  </Text>
                </View>
              </>
            )
          ) : (
            <>
              <Header
                name={language ? "Watchlist" : "قائمة المشاهدة"}
                onScrollY={onScrollY}
                navigation={navigation}
                route={route}
              />
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "gray", fontSize: 20 }}>
                  {" "}
                  {language
                    ? "You dont have movies on your watchlist"
                    : "ليس لديك افلام في قائمة المشاهدة"}{" "}
                </Text>
                <Text style={{ color: "gray", fontSize: 20, marginTop: 15 }}>
                  {" "}
                  {language ? "Add some!" : "اضف افلام !"}{" "}
                </Text>
              </View>
            </>
          )}
        </View>
      );
    }
  }
}

export default Watchlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  container1: {
    borderRadius: 5,
    margin: 10,
    width: 160,
    height: 330,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.0,
  },
  shadow: {
    // overflow: "hidden",
  },
  information: {
    color: "#e5e5e5",
    fontWeight: "700",
    fontSize: 13,
    marginTop: 5,
  },
  removebuttin: {
    marginTop: 8,
    flexDirection: "row",
    width: "100%",
    borderColor: "gray",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 3,
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});
