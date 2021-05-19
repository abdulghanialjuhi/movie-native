import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
  ActionSheetIOS,
  Platform,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import Context from "../context/Context";
import MaterialCommunityIcons from "react-native-vector-icons/AntDesign";
import firebase from "firebase";
import { Appearance } from "react-native-appearance";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

class Bottompopup extends Component {
  state = {
    show: false,
    item: "",
  };

  renderOutsideTouchable = (onTouch) => {
    const view = <View style={{ flex: 1, width: "100%" }} />;
    if (!onTouch) return view;

    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{ flex: 1, width: "100%" }}
      >
        {view}
      </TouchableWithoutFeedback>
    );
  };

  show = (item) => {
    this.setState({ show: true });
    this.setState({ item: item });
    //    console.log(item);
  };
  close = () => {
    this.setState({ show: false });
  };

  static contextType = Context;

  render() {
    const colorScheme = Appearance.getColorScheme();
    const user = firebase.auth().currentUser;
    const { darkMode, watchlist, actions, language } = this.context;
    // const { useColorScheme } = this.useColorScheme;
    let { show, item } = this.state;
    const { onTouchOutside, navigation } = this.props;
    const overview = item.overview;
    const id = item.id;

    let storedMovie = watchlist.find((o) => o.id === item.id);
    const disableMovie = storedMovie ? true : false;

    const handleWatchlist = async () => {
      if (user) {
        if (!disableMovie) {
          try {
            await actions({
              type: "add_watchlist",
              payload: [...watchlist, item],
            });
            setTimeout(() => {
              this.setState({ show: false });
            }, 1000);
          } catch {
            Alert.alert(
              language ? "Alert" : "تنبيه",
              language ? "try again" : "حاول مجدداً",
              [
                {
                  text: language ? "Ok" : "حسناً",
                  onPress: () => {
                    setTimeout(() => {
                      this.setState({ show: false });
                    }, 200);
                  },
                },
              ]
            );
            setTimeout(() => {
              this.setState({ show: false });
            }, 1000);
          }
        } else {
          if (Platform.OS === "ios") {
            ActionSheetIOS.showActionSheetWithOptions(
              {
                title: item.title,
                options: [
                  language ? "Cancel" : "إلغاء",
                  language
                    ? "Remove from Watchlist"
                    : "إزاله من قائمة المشاهدة",
                ],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 0,
                //    userInterfaceStyle: colorScheme === "dark" ? "dark" : "light",
              },
              async (buttonIndex) => {
                if (buttonIndex === 0) {
                  //    console.log("2");
                } else if (buttonIndex === 1) {
                  const remove = watchlist.filter((w) => w.id !== item.id);
                  await actions({
                    type: "add_watchlist",
                    payload: remove,
                  });
                  setTimeout(() => {
                    this.setState({ show: false });
                  }, 200);
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
                    const remove = watchlist.filter((w) => w.id !== item.id);
                    await actions({
                      type: "add_watchlist",
                      payload: remove,
                    });
                    setTimeout(() => {
                      this.setState({ show: false });
                    }, 200);
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
            setIsadded(false);
            const remove = watchlist.filter((w) => w.id !== id);
            await actions({ type: "add_watchlist", payload: remove });
            Haptics.impactAsync();
            setIsadded(true);
          }
          // Alert.alert(
          //   language ? "Are you sure" : "هل انت متأكد",
          //   language
          //     ? "you want to remove this movie from your watchlist"
          //     : "انك تريد ان تزيل هذا الفليم من قائمة المشاهدة",
          //   [
          //     {
          //       text: language ? "Yes" : "نعم",
          //       onPress: async () => {
          //         const remove = watchlist.filter((w) => w.id !== item.id);
          //         await actions({
          //           type: "add_watchlist",
          //           payload: remove,
          //         });
          //         setTimeout(() => {
          //           this.setState({ show: false });
          //         }, 200);
          //       },
          //       style: "destructive",
          //     },
          //     {
          //       text: language ? "Cancel" : "إلغاء",
          //       style: "cancel",
          //     },
          //   ],
          //   { cancelable: false }
          // );
        }
      } else {
        Alert.alert(
          language ? "Alert" : "تنبيه",
          language
            ? "You have to log in to add movies to your watchlist"
            : "يجب عليك تسجيل الدخول لإضافة هذا الفيلم الى قائمة المشاهدة",
          [
            {
              text: language ? "Ok" : "حسناً",
              onPress: () => {
                setTimeout(() => {
                  this.setState({ show: false });
                }, 200);
              },
            },
          ]
        );
      }
    };

    const handleOverview = () => {
      setTimeout(() => {
        navigation.navigate("Info", { id });
      }, 500);
      setTimeout(() => {
        navigation.navigate("Overview", { overview });
      }, 1000);

      this.setState({ show: false });
    };
    return (
      <>
        <Modal
          backdropColor={darkMode ? "#787878" : "black"}
          backdropOpacity={darkMode ? 0.3 : 0.8}
          swipeThreshold={100}
          onSwipeComplete={() => this.setState({ show: false })}
          swipeDirection="down"
          style={{
            padding: 0,
            margin: 0,
            flex: 1,
            width: deviceWidth,
          }}
          //   animationInTiming={660}
          //   animationOutTiming={660}
          onBackdropPress={() => this.setState({ show: false })}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          isVisible={show}
          useNativeDriver={false}
        >
          <View
            style={{
              flex: 1,
              width: deviceWidth,
              //  backgroundColor: "#000000AA",
            }}
          >
            {this.renderOutsideTouchable(onTouchOutside)}
            <View
              style={{
                backgroundColor: darkMode ? "#0a0a0a" : "#FFFFFF",
                width: deviceWidth,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                //    paddingHorizontal: 10,
                maxHeight: deviceHeight * 0.4,
                // justifyContent: "center",
                alignItems: "center",
                height: deviceHeight / 2,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  width: "100%",
                  paddingTop: 7,
                  borderBottomColor: darkMode ? "#2e2e2e" : "#a9a9a9",
                  borderBottomWidth: 0.3,
                }}
              >
                <View
                  style={{
                    width: 35,
                    backgroundColor: darkMode ? "#3d3d3d" : "#c9c9c9",
                    height: 6,
                    borderRadius: "50%",
                  }}
                />
                <Text
                  style={{
                    color: darkMode ? "#e5e5e5" : "#182E44",
                    fontSize: 20,
                    fontWeight: "600",
                    margin: 15,
                  }}
                >
                  {" "}
                  {language ? "Quick options" : "خيارات سريعة"}{" "}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 5,
                  width: "100%",
                  height: "80%",
                  //  backgroundColor: "gray",
                }}
              >
                <View style={{ height: "65%" }}>
                  <TouchableWithoutFeedback
                    onPress={handleWatchlist}
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        // justifyContent: "center",
                        alignItems: "center",
                        height: "40%",
                        borderBottomWidth: 0.3,
                        borderBottomColor: darkMode ? "#2e2e2e" : "#a9a9a9",
                        paddingHorizontal: 20,
                      }}
                    >
                      <View
                        style={{
                          height: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingHorizontal: 15,
                        }}
                      >
                        <MaterialCommunityIcons
                          name={disableMovie ? "checkcircleo" : "pluscircleo"}
                          size={20}
                          color={darkMode ? "#e5e5e5" : "black"}
                        />
                      </View>

                      <Text
                        style={{
                          paddingHorizontal: 5,
                          fontSize: 16,
                          fontWeight: "normal",
                          color: darkMode ? "#e5e5e5" : "#182E44",
                        }}
                      >
                        {disableMovie
                          ? language
                            ? "Remove from Watchlist"
                            : "إزالة من قائمة المشاهدة"
                          : language
                          ? "Add to Watchlist"
                          : "إضافة الى قائمة المشاهدة"}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={handleOverview}
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        // justifyContent: "center",
                        alignItems: "center",
                        height: "40%",
                        // backgroundColor: "gray",
                        // borderBottomWidth: 0.3,
                        // borderBottomColor: darkMode ? "#2e2e2e" : "#a9a9a9",
                        paddingHorizontal: 20,
                      }}
                    >
                      <View
                        style={{
                          height: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingHorizontal: 15,
                        }}
                      >
                        <MaterialCommunityIcons
                          name="arrowright"
                          size={22}
                          color={darkMode ? "#e5e5e5" : "black"}
                        />
                      </View>

                      <Text
                        style={{
                          paddingHorizontal: 5,
                          fontSize: 16,
                          fontWeight: "normal",
                          color: darkMode ? "#e5e5e5" : "#182E44",
                        }}
                      >
                        {language ? "Go to OverView" : "الذهاب الى القصة"}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    // paddingHorizontal: 10,
                    width: "100%",
                    //backgroundColor: "gray",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.setState({ show: false })}
                    style={{
                      backgroundColor: darkMode ? "#3d3d3d" : "#adadad",
                      borderRadius: "50%",
                      width: deviceWidth - 15,
                      height: 42,
                      //   paddingHorizontal: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

export default Bottompopup;
