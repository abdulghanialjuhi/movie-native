import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
  Switch,
  AsyncStorage,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import Modal from "react-native-modal";
import Context from "../context/Context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialIcons";
import firebase from "firebase";
import MaterialCommunityIcons1 from "react-native-vector-icons/MaterialIcons";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import { isIphoneX } from "react-native-iphone-x-helper";
import { Appearance } from "react-native-appearance";

const colorScheme = Appearance.getColorScheme();

class Bottompopup extends Component {
  state = {
    show: false,
    item: "",
    translateAnim: new Animated.Value(0),
    isDown: true,
    //  deviceMode: false,
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
    this.setState({ isDown: false });
    Animated.timing(this.state.translateAnim, {
      toValue: -90,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  static contextType = Context;

  componentDidMount() {
    const { darkMode, actions, deviceMode } = this.context;
    this.setState({ isDown: false });
    Animated.timing(this.state.translateAnim, {
      toValue: -90,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }

  render() {
    const user = firebase.auth().currentUser;
    const { darkMode, watchlist, actions, language, deviceMode } = this.context;
    const { show, item, isDown, translateAnim } = this.state;
    const { onTouchOutside } = this.props;

    let storedMovie = watchlist.find((o) => o.id === item.id);
    const disableMovie = storedMovie ? true : false;

    const setmode = async () => {
      await actions({ type: "set_dark", payload: !darkMode });

      if (darkMode === true) {
        console.log("true");
        if (deviceMode) {
          if (colorScheme === "dark") {
            actions({ type: "set_deviceMode", payload: false });
            try {
              await AsyncStorage.setItem(
                "DeviceMode",
                JSON.stringify(!deviceMode)
              );
              await AsyncStorage.setItem("Mode", JSON.stringify(!darkMode));
            } catch (err) {
              alert(err);
            }
          } else if (colorScheme === "light") {
            console.log("is ligh");
            try {
              await AsyncStorage.setItem("Mode", JSON.stringify(!darkMode));
              await AsyncStorage.setItem(
                "DeviceMode",
                JSON.stringify(deviceMode)
              );
            } catch (err) {
              alert(err);
            }
          }
        } else {
          try {
            await AsyncStorage.setItem("Mode", JSON.stringify(!darkMode));
          } catch (err) {
            alert(err);
          }
        }
      } else if (darkMode === false) {
        if (deviceMode) {
          if (colorScheme === "dark") {
            try {
              await AsyncStorage.setItem("Mode", JSON.stringify(!darkMode));
              await AsyncStorage.setItem(
                "DeviceMode",
                JSON.stringify(deviceMode)
              );
            } catch (err) {
              alert(err);
            }
          } else if (colorScheme === "light") {
            actions({ type: "set_deviceMode", payload: false });
            try {
              await AsyncStorage.setItem(
                "DeviceMode",
                JSON.stringify(!deviceMode)
              );
              await AsyncStorage.setItem("Mode", JSON.stringify(!darkMode));
            } catch (err) {
              alert(err);
            }
          }
        } else {
          try {
            await AsyncStorage.setItem("Mode", JSON.stringify(!darkMode));
          } catch (err) {
            alert(err);
          }
        }
        console.log("false");
      }
    };

    const setDeviceMode = async () => {
      //     actions({ type: "set_deviceMode", payload: !deviceMode });

      if (deviceMode === true) {
        actions({ type: "set_deviceMode", payload: false });
        // console.log("1", deviceMode);
        try {
          await AsyncStorage.setItem("DeviceMode", JSON.stringify(!deviceMode));
          await AsyncStorage.setItem("Mode", JSON.stringify(darkMode));
        } catch (err) {
          alert(err);
        }
      } else if (deviceMode === false) {
        actions({ type: "set_deviceMode", payload: true });
        // console.log("2", deviceMode);
        if (colorScheme === "dark") {
          // console.log("dark");
          actions({ type: "set_dark", payload: true });
          try {
            await AsyncStorage.setItem(
              "DeviceMode",
              JSON.stringify(!deviceMode)
            );
            if (darkMode === false) {
              await AsyncStorage.setItem("Mode", JSON.stringify(!darkMode));
            }
          } catch (err) {
            alert(err);
          }
        } else if (colorScheme === "light") {
          // console.log("light");
          actions({ type: "set_dark", payload: false });
          try {
            await AsyncStorage.setItem(
              "DeviceMode",
              JSON.stringify(!deviceMode)
            );
            if (darkMode === true) {
              await AsyncStorage.setItem("Mode", JSON.stringify(!darkMode));
            }
          } catch (err) {
            alert(err);
          }
        }
      }
    };

    const onSwipeComplete = () => {
      this.setState({ show: false });
      this.setState({ isDown: false });
      Animated.timing(this.state.translateAnim, {
        toValue: -90,
        duration: 300,
        useNativeDriver: false,
      }).start();
    };

    const setEnglish = async () => {
      actions({ type: "set_language", payload: true });
      try {
        await AsyncStorage.setItem("Language", JSON.stringify(!language));
      } catch (err) {
        alert(err);
      }
    };

    const setArabic = async () => {
      actions({ type: "set_language", payload: false });
      try {
        await AsyncStorage.setItem("Language", JSON.stringify(!language));
      } catch (err) {
        alert(err);
      }
    };

    const handleTranslate = () => {
      if (isDown) {
        Animated.timing(translateAnim, {
          toValue: -90,
          duration: 300,
          useNativeDriver: false,
        }).start(() => {
          this.setState({ isDown: false });
        });
      } else {
        this.setState({ isDown: true });
        Animated.timing(translateAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    };

    const downOpacity = translateAnim.interpolate({
      inputRange: [-90, -45, 0],
      outputRange: [0, 0, 1],
      //   extrapolate: "clamp",
    });

    const rotateAnim = translateAnim.interpolate({
      inputRange: [-90, 0],
      outputRange: ["0deg", "180deg"],
      //   extrapolate: "clamp",
    });

    return (
      <>
        <Modal
          backdropColor={darkMode ? "#787878" : "black"}
          backdropOpacity={darkMode ? 0.3 : 0.8}
          swipeThreshold={100}
          onSwipeComplete={onSwipeComplete}
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
                maxHeight: isIphoneX()
                  ? deviceHeight * 0.5
                  : deviceHeight * 0.6,
                // justifyContent: "center",
                alignItems: "center",
                //  height: deviceHeight / 1,
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
                  {language ? "Setting" : "الأعدادات"}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 5,
                  width: "100%",
                  height: "95%",
                  //  backgroundColor: "gray",
                }}
              >
                <View style={{ height: "65%", width: "100%" }}>
                  <View
                    style={{
                      height: "50%",
                      //  backgroundColor: "gray",
                      //   marginBottom: isIphoneX() ? 25 : 10,
                    }}
                  >
                    <View
                      style={{
                        borderBottomWidth: 0.3,
                        height: "40%",
                        borderBottomColor: darkMode ? "#2e2e2e" : "#a9a9a9",
                        paddingLeft: 5,
                        paddingRight: 10,
                        flexDirection: "row",

                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: darkMode ? "#d9d9d9" : "black",
                          fontSize: 15,
                          //  marginTop: 5,
                          marginLeft: 15,
                          fontWeight: "600",
                        }}
                      >
                        {language ? "Dark mode" : "الوضع الليلي"}
                      </Text>
                      {/* </View> */}

                      <Switch
                        thumbColor={darkMode ? "#e5e5e5" : "#f4f3f4"}
                        onValueChange={setmode}
                        ios_backgroundColor={darkMode ? "#e5e5e5" : "#2E2E2E"}
                        value={darkMode}
                      />
                    </View>
                    <View
                      style={{
                        width: deviceWidth,
                        height: "70%",
                        borderBottomWidth: 0.3,
                        borderBottomColor: darkMode ? "#2e2e2e" : "#a9a9a9",
                        marginBottom: 15,
                        justifyContent: "center",
                        paddingLeft: 5,
                        paddingRight: 10,
                      }}
                    >
                      <View
                        style={{
                          //  height: "70%",
                          marginBottom: 10,
                          flexDirection: "row",
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            color: darkMode ? "#d9d9d9" : "black",
                            fontSize: 15,
                            //  marginTop: 5,
                            marginLeft: 15,
                            fontWeight: "600",
                          }}
                        >
                          {language
                            ? "Use device settings"
                            : "استخدم اعدادات الجهاز"}
                        </Text>
                        <Switch
                          thumbColor={deviceMode ? "#e5e5e5" : "#f4f3f4"}
                          onValueChange={setDeviceMode}
                          ios_backgroundColor={
                            deviceMode ? "#e5e5e5" : "#2E2E2E"
                          }
                          value={deviceMode}
                        />
                      </View>
                      <View
                        style={{
                          height: 35,
                          width: "100%",
                          // backgroundColor: "gray",
                          //  textAlign: "center",
                          paddingHorizontal: 10,
                          marginTop: 0,
                        }}
                      >
                        {language ? (
                          <Text
                            style={{
                              //    textAlign: "center",
                              color: "gray",
                              //   fontSize: 13,
                            }}
                          >
                            set Dark mode to use the Light or Dark selection
                            located in your device Display & Brightness settings
                          </Text>
                        ) : (
                          <>
                            <Text
                              style={{
                                textAlign: "right",
                                color: "gray",
                                //   fontSize: 13,
                              }}
                            >
                              فعل الوضع الليلي لإستخدام الوضع الداكن او الوضع
                              الطبيعي
                            </Text>
                            <Text
                              style={{
                                textAlign: "right",
                                color: "gray",
                                //   fontSize: 13,
                              }}
                            >
                              بناءً على الاعدادات الموجودة في اعدادات الجهاز
                            </Text>
                          </>
                        )}
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      height: "40%",
                      marginTop: 20,
                    }}
                  >
                    <TouchableOpacity
                      onPress={handleTranslate}
                      style={{
                        width: "100%",
                        height: 30,
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <>
                        <Animated.View
                          style={{
                            justifyContent: "center",
                            height: "100%",
                            flexDirection: "row",
                            margin: 1,
                            paddingTop: 3,
                            width: "20%",
                            transform: [{ rotate: rotateAnim }],
                          }}
                        >
                          <MaterialCommunityIcons
                            name="keyboard-arrow-down"
                            size={26}
                            color={darkMode ? "#e5e5e5" : "black"}
                          />
                        </Animated.View>
                        <View
                          style={{
                            zIndex: 1000,
                            elevation: 1000,
                            height: "100%",
                            justifyContent: "center",
                            width: "60%",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: darkMode ? "#d9d9d9" : "black",
                              fontSize: 18,
                              fontWeight: "600",
                            }}
                          >
                            {" "}
                            {language ? "Language" : "اللغة"}{" "}
                          </Text>
                        </View>
                      </>
                      <View
                        style={{
                          width: "20%",
                        }}
                      />
                    </TouchableOpacity>
                    {isDown ? (
                      <Animated.View
                        style={{
                          opacity: downOpacity,
                          transform: [{ translateY: translateAnim }],
                          marginTop: 10,
                          justifyContent: "space-between",
                          height: "100%",
                          //  backgroundColor: "gray",
                          padding: 10,
                        }}
                      >
                        <TouchableOpacity
                          onPress={setArabic}
                          style={{
                            paddingHorizontal: 10,
                            backgroundColor: language
                              ? "transparent"
                              : darkMode
                              ? "black"
                              : "#bdbdbd",
                            width: "100%",
                            paddingBottom: 10,
                            borderRadius: 5,
                            padding: 5,
                            alignContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: darkMode ? "#d9d9d9" : "black",
                              fontSize: 14,
                              marginTop: 5,
                              marginLeft: 15,
                              fontWeight: "600",
                            }}
                          >
                            {" "}
                            عربي{" "}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={setEnglish}
                          style={{
                            backgroundColor: language
                              ? darkMode
                                ? "black"
                                : "#bdbdbd"
                              : "transparent",
                            width: "100%",
                            marginTop: 5,
                            paddingBottom: 10,
                            borderRadius: 5,
                            padding: 5,
                            alignContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: darkMode ? "#d9d9d9" : "black",
                              fontSize: 14,
                              marginTop: 5,
                              marginLeft: 15,
                              fontWeight: "600",
                            }}
                          >
                            {" "}
                            English{" "}
                          </Text>
                        </TouchableOpacity>
                      </Animated.View>
                    ) : null}
                  </View>
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
