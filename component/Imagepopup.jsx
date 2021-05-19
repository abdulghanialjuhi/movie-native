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
import firebase from "firebase";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import { isIphoneX } from "react-native-iphone-x-helper";

class Bottompopup extends Component {
  state = {
    show: false,
    translateAnim: new Animated.Value(0),
    isDown: true,
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

  show1 = () => {
    this.setState({ show: true });
  };

  close1 = () => {
    this.setState({ show: false });
  };

  static contextType = Context;

  render() {
    const user = firebase.auth().currentUser;
    const {
      darkMode,
      watchlist,
      actions,
      language,
      profileImage,
    } = this.context;
    const { show } = this.state;
    const { onTouchOutside, handlechange } = this.props;

    const onSwipeComplete = () => {
      this.setState({ show: false });
      this.setState({ isDown: false });
      Animated.timing(this.state.translateAnim, {
        toValue: -90,
        duration: 300,
        useNativeDriver: false,
      }).start();
    };

    return (
      <>
        <Modal
          backdropColor={darkMode ? "#787878" : "black"}
          backdropOpacity={darkMode ? 0.3 : 0.8}
          //    backgroundColor="rgba(0,0,0,0.1)"
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
                maxHeight: deviceHeight * 0.5,
                // justifyContent: "center",
                alignItems: "center",
                height: deviceHeight / 2.3,
                //     maxHeight: deviceHeight / 2.4,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  width: "100%",
                  paddingTop: 10,
                  height: "30%",
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
                    marginBottom: 3,
                  }}
                >
                  {language ? "Upload Photo" : " رفع صورة عرض"}
                </Text>
                <Text
                  style={{
                    color: darkMode ? "gray" : "#182E44",
                    fontSize: 12,
                    //fontWeight: "300",
                    //  margin: 15,
                  }}
                >
                  {language
                    ? "Choose your profile picture"
                    : "اختيار صورة عرض لحسابك"}
                </Text>
              </View>

              <View
                style={{
                  // marginTop: 5,
                  width: "100%",
                  height: "45%",
                  //  backgroundColor: "gray",
                  //  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 5,
                  paddingTop: 10,
                  //   paddingBottom: 35,
                }}
              >
                {/* <View
                  style={{
                    // height: "65%",
                    width: "100%",
                  
                    //  alignContent: "center",
                
                    //  backgroundColor: "gray",
                  }}
                > */}
                <TouchableOpacity
                  onPress={async () => {
                    await handlechange();
                    setTimeout(() => {
                      this.setState({ show: false });
                    }, 900);
                  }}
                  style={{
                    width: "90%",
                    height: 40,
                    marginBottom: 15,
                    backgroundColor: darkMode ? "#171717" : "#c9c9c9",
                    borderRadius: 5,
                    justifyContent: "center",
                    alignContent: "center",
                    margin: 5,
                  }}
                >
                  <Text
                    style={{
                      color: darkMode ? "#fff" : "#182E44",
                      fontSize: 18,
                      textAlign: "center",
                      //fontWeight: "300",
                      //  margin: 15,
                    }}
                  >
                    {" "}
                    {language
                      ? "Choose from library"
                      : "اختيار من مكتبة الصور"}{" "}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={profileImage === null ? true : false}
                  onPress={() => {
                    actions({ type: "set_image", payload: null });
                    setTimeout(() => {
                      this.setState({ show: false });
                    }, 700);
                  }}
                  style={{
                    width: "90%",
                    height: 40,
                    //  marginTop: 10,
                    backgroundColor: darkMode ? "#171717" : "#c9c9c9",
                    borderRadius: 5,
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: darkMode
                        ? profileImage === null
                          ? "gray"
                          : "#fff"
                        : profileImage === null
                        ? "gray"
                        : "#182E44",
                      fontSize: 18,
                      textAlign: "center",
                      //fontWeight: "300",
                      //  margin: 15,
                    }}
                  >
                    {" "}
                    {language
                      ? "Remove profile picture"
                      : "حذف صورة العرض"}{" "}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => this.setState({ show: false })}
                style={{
                  width: "90%",
                  height: 45,
                  backgroundColor: darkMode ? "#171717" : "#c9c9c9",
                  borderRadius: 50,
                  justifyContent: "center",
                  alignContent: "center",
                  margin: 5,
                }}
              >
                <Text
                  style={{
                    color: darkMode ? "#fff" : "#182E44",
                    fontSize: 18,
                    textAlign: "center",
                    //fontWeight: "300",
                    //  margin: 15,
                  }}
                >
                  {" "}
                  {language ? "Cancel" : "إلغاء"}{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* </View> */}
        </Modal>
      </>
    );
  }
}

export default Bottompopup;
