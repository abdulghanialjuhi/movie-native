import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
  Animated,
  Dimensions,
} from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import MaterialCommunityIcons1 from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons2 from "react-native-vector-icons/MaterialIcons";
import Context from "../context/Context";
import Header from "../shared/Header";
import firebase from "firebase";
import { isIphoneX } from "react-native-iphone-x-helper";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
const { height, width } = Dimensions.get("window");

export default function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isConfirmPass, setIsconfirmPass] = useState(false);

  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showpassword, setshowpassword] = useState(true);
  const { darkMode, language } = useContext(Context);
  const scrollA = useRef(new Animated.Value(0)).current;

  const HEIGHT = isIphoneX() ? height / 5 : height / 5;

  const handleName = () => {
    setIsName(true);
    setIsEmail(false);
    setIsPassword(false);
    setIsconfirmPass(false);
  };

  const handleEmail = () => {
    setIsName(false);
    setIsEmail(true);
    setIsPassword(false);
    setIsconfirmPass(false);
  };

  const handlePassword = () => {
    setIsName(false);
    setIsEmail(false);
    setIsPassword(true);
    setIsconfirmPass(false);
  };

  const handleConfirmPass = () => {
    setIsName(false);
    setIsEmail(false);
    setIsPassword(false);
    setIsconfirmPass(true);
  };

  // const handleOnchange1 = (value) => {

  // };

  // const handleNamechange1 = (value) => {
  //   setName(value);
  // };
  // const handleOnchange2 = (value) => {
  //   setPassword(value);
  // };
  // const handleOnchange3 = (value) => {
  //   setConfirmpassword(value);
  // };

  const disable = () => {
    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmpassword.length === 0
    ) {
      return true;
    } else if (loading) {
      return true;
    } else {
      return false;
    }
  };

  async function handleSubmit() {
    // setError("");
    // navigation.navigate("Loading");
    Keyboard.dismiss();
    if (!disable()) {
      if (password !== confirmpassword) {
        return setError(
          language ? "Password do not match" : "كلمة المرور غير متطابقة"
        );
      }

      try {
        setError("");
        setLoading(true);
        await signup(email, password, name);
        await navigation.goBack();
      } catch {
        setError(language ? "Faild to create an account" : "فشل في إنشاء حساب");
      }

      setLoading(false);
    }
  }

  // useEffect(() => {
  //   // setIsMounted(true);

  //   return () => {
  //     setIsMounted(false);
  //     Keyboard.dismiss();
  //   };
  // }, []);

  useEffect(() => {
    let method = true;

    if (error.length > 1) {
      setTimeout(() => {
        if (method) {
          setError("");
        }
      }, 3000);
    }

    return () => {
      method = false;
    };
  }, [error]);

  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsName(false);
        setIsEmail(false);
        setIsPassword(false);
        setIsconfirmPass(false);
      }}
    >
      {children}
    </TouchableWithoutFeedback>
  );

  useEffect(() => {
    let mounted = true;
    Keyboard.addListener("keyboardDidHide", () => {
      if (mounted) {
        setIsName(false);
        setIsEmail(false);
        setIsPassword(false);
        setIsconfirmPass(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [Keyboard]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: darkMode ? "black" : "#fff" }}
    >
      {/* <Header
        name={language ? "Sign up" : "إنشاء حساب"}
        onScrollY={onScrollY}
        navigation={navigation}
        route={route}
      /> */}
      <View style={{ flex: 1, backgroundColor: darkMode ? "#0f0f0f" : "#fff" }}>
        <Animated.ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollA } } }],
            { useNativeDriver: true }
          )}
          contentContainerStyle={{
            flex: 1,
            backgroundColor: darkMode ? "#080808" : "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animated.View
            style={{
              transform: [{ translateY: scrollA }],
              //  backgroundColor: "gray",
              width: "100%",
              height: HEIGHT,
              //  justifyContent: "center",
              paddingHorizontal: 15,
              paddingTop: isIphoneX() ? 51 : 30,
            }}
          >
            <MaterialCommunityIcons2
              name="arrow-back-ios"
              size={23}
              style={{
                width: "12%",

                color: darkMode ? "#1e90ff" : "black",
                //     paddingRight: 10,
                //   backgroundColor: "gray",
              }}
              onPress={() => navigation.goBack()}
            />

            <View
              style={{
                width: "100%",
                justifyContent: "center",
                //  backgroundColor: "black",
                paddingHorizontal: 20,
                alignItems: "center",
              }}
            >
              <Animated.Text
                style={{
                  transform: [
                    {
                      scale: scrollA.interpolate({
                        inputRange: [-500, 0],
                        outputRange: [1.2, 1],
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                  color: darkMode ? "#fff" : "black",
                  fontSize: 30,
                  fontWeight: "500",
                  fontFamily: "Gill Sans",
                }}
              >
                {" "}
                {language ? "Create account" : "إنشاء حساب"}{" "}
              </Animated.Text>
            </View>
          </Animated.View>
          <View
            style={[
              styles.container,
              {
                //  height: isIphoneX() ? HEIGHT / 2 : HEIGHT / 1.8,
                //   backgroundColor: darkMode ? "#101010" : "#fff",
                //   borderColor: darkMode ? "#202020" : "#c9c9c9",
              },
            ]}
          >
            <View
              style={[
                styles.container1,
                // { backgroundColor: darkMode ? "#171717" : "#fff" },
              ]}
            >
              {/* <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  //backgroundColor: "black",
                  paddingHorizontal: 20,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: darkMode ? "#fff" : "black",
                    fontSize: 30,
                    fontWeight: "500",
                    fontFamily: "Gill Sans",
                  }}
                >
                  {" "}
                  {language ? "Create account" : "إنشاء حساب"}{" "}
                </Text>
              </View> */}
              <Text style={{ color: "red", margin: 6 }}> {error} </Text>
              <View
                style={[
                  styles.Cpasswordinput,
                  {
                    backgroundColor: darkMode
                      ? isName
                        ? "transparent"
                        : "#212121"
                      : isName
                      ? "transparent"
                      : "#e5e5e5",
                    borderColor: darkMode
                      ? isName
                        ? "#e5e5e5"
                        : "transparent"
                      : isName
                      ? "#3d3d3d"
                      : "transparent",
                  },
                ]}
              >
                <TextInput
                  onFocus={handleName}
                  onChangeText={(value) => {
                    handleName();
                    setName(value);
                  }}
                  value={name}
                  //   keyboardType="email-address"
                  keyboardAppearance={darkMode ? "dark" : "default"}
                  style={[
                    styles.textInput,
                    { color: darkMode ? "#e5e5e5" : "black" },
                  ]}
                  placeholder={language ? "Full name" : "الأسم الكامل"}
                  placeholderTextColor={darkMode ? "#636363" : "#A9A9A9"}
                  //   autoCapitalize='none'
                />
                <TouchableOpacity
                  onPress={() => setName("")}
                  style={{
                    height: "100%",
                    justifyContent: "center",
                    padding: 10,
                  }}
                >
                  {name.length > 0 ? (
                    <MaterialCommunityIcons
                      name="close"
                      color="gray"
                      size={18}
                    />
                  ) : null}
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.Cpasswordinput,
                  {
                    backgroundColor: darkMode
                      ? isEmail
                        ? "transparent"
                        : "#212121"
                      : isEmail
                      ? "transparent"
                      : "#e5e5e5",
                    borderColor: darkMode
                      ? isEmail
                        ? "#e5e5e5"
                        : "transparent"
                      : isEmail
                      ? "#3d3d3d"
                      : "transparent",
                  },
                ]}
              >
                <TextInput
                  onFocus={handleEmail}
                  onChangeText={(value) => {
                    handleEmail();
                    setEmail(value);
                  }}
                  value={email}
                  keyboardType="email-address"
                  keyboardAppearance={darkMode ? "dark" : "default"}
                  style={[
                    styles.textInput,
                    { color: darkMode ? "#e5e5e5" : "black" },
                  ]}
                  placeholder={language ? "Email" : "البريد الإلكتروني"}
                  placeholderTextColor={darkMode ? "#636363" : "#A9A9A9"}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setEmail("")}
                  style={{
                    height: "100%",
                    justifyContent: "center",
                    padding: 10,
                  }}
                >
                  {email.length > 0 ? (
                    <MaterialCommunityIcons
                      name="close"
                      color="gray"
                      size={18}
                    />
                  ) : null}
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.Cpasswordinput,
                  {
                    backgroundColor: darkMode
                      ? isPassword
                        ? "transparent"
                        : "#212121"
                      : isPassword
                      ? "transparent"
                      : "#e5e5e5",
                    borderColor: darkMode
                      ? isPassword
                        ? "#e5e5e5"
                        : "transparent"
                      : isPassword
                      ? "#3d3d3d"
                      : "transparent",
                  },
                ]}
              >
                <TextInput
                  onFocus={handlePassword}
                  onChangeText={(value) => {
                    handlePassword();
                    setPassword(value);
                  }}
                  value={password}
                  keyboardAppearance={darkMode ? "dark" : "default"}
                  style={[
                    styles.textInput,
                    { color: darkMode ? "#e5e5e5" : "black" },
                  ]}
                  placeholder={language ? "Password" : "كلمة المرور"}
                  placeholderTextColor={darkMode ? "#636363" : "#A9A9A9"}
                  secureTextEntry={showpassword ? true : false}
                  textContentType="none"
                />
                <TouchableOpacity
                  onPress={() => setshowpassword(!showpassword)}
                  style={{
                    height: "100%",
                    justifyContent: "center",
                    padding: 10,
                  }}
                >
                  {password.length > 0 ? (
                    <MaterialCommunityIcons1
                      name={showpassword ? "eye-off" : "eye"}
                      color="gray"
                      size={18}
                    />
                  ) : null}
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.Cpasswordinput,
                  {
                    // width: 40,
                    backgroundColor: darkMode
                      ? isConfirmPass
                        ? "transparent"
                        : "#212121"
                      : isConfirmPass
                      ? "transparent"
                      : "#e5e5e5",
                    borderColor: darkMode
                      ? isConfirmPass
                        ? "#e5e5e5"
                        : "transparent"
                      : isConfirmPass
                      ? "#3d3d3d"
                      : "transparent",
                  },
                ]}
              >
                <TextInput
                  onFocus={handleConfirmPass}
                  returnKeyType="go"
                  onChangeText={(value) => {
                    handleConfirmPass();
                    setConfirmpassword(value);
                  }}
                  value={confirmpassword}
                  keyboardAppearance={darkMode ? "dark" : "default"}
                  style={[
                    styles.textInput,
                    { color: darkMode ? "#e5e5e5" : "black" },
                  ]}
                  placeholder={
                    language ? "Confirm Password" : "تأكيد كلمة المرور"
                  }
                  secureTextEntry={showpassword ? true : false}
                  onSubmitEditing={handleSubmit}
                  placeholderTextColor={darkMode ? "#636363" : "#A9A9A9"}
                  textContentType="none"
                />
              </View>
              <TouchableOpacity
                disabled={disable()}
                style={[
                  styles.button,
                  {
                    backgroundColor: "#007fff",
                    borderColor: darkMode
                      ? disable()
                        ? "rgba(0, 0, 0, 0.6)"
                        : "#007fff"
                      : disable()
                      ? "rgba(192,192,192,0.5)"
                      : "#007fff",
                  },
                ]}
                onPress={handleSubmit}
              >
                {disable() ? (
                  <View
                    style={{
                      width: "100%",
                      backgroundColor: darkMode
                        ? "rgba(0, 0, 0, 0.6)"
                        : "rgba(192,192,192,0.5)",
                      height: "100%",
                      borderRadius: 4,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: "Gill Sans",
                        color: darkMode ? "gray" : "#e5e5e5",
                      }}
                    >
                      {language ? " Sign up" : "إنشاء حساب"}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      width: "100%",
                      backgroundColor: "transparent",
                      height: "100%",
                      borderRadius: 5,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: "Gill Sans",
                        // color: darkMode ? "gray" : "#e5e5e5",
                        color: "#fff",
                      }}
                    >
                      {language ? " Sign up" : "إنشاء حساب"}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              margin: 6,
              // height: 90,
              //    alignItems: "center",
            }}
          >
            <Text
              style={{
                color: darkMode ? "#e5e5e5" : "#454545",
                fontSize: 16,

                marginTop: 10,
              }}
            >
              {language ? "Alredy have an account" : "لديك حساب "}
            </Text>
            <Button
              title={language ? "Log in" : "تسجيل دخول"}
              onPress={() => navigation.navigate("Loading")}
            />
          </View>
          <View style={{ height: isIphoneX() ? "16.5%" : "8%" }} />
        </Animated.ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderColor: "#202020",
    // borderWidth: 1,
    width: "90%",
    borderRadius: 5,
  },
  container1: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    paddingTop: 10,
    paddingBottom: 10,
  },
  textInput: {
    borderRadius: 5,
    paddingLeft: 10,
    height: 40,
    color: "#e5e5e5",
    width: "87%",
  },
  Cpasswordinput: {
    flexDirection: "row",
    borderRadius: 7,
    paddingLeft: 10,
    borderWidth: 0.5,
    // color: "#e5e5e5",
    width: "95%",
    height: isIphoneX() ? 48 : 43,
    margin: 10,
    // marginTop: 10,
    // padding: 5,
    alignItems: "center",
  },
  button: {
    marginBottom: 10,
    marginTop: 20,
    width: 300,
    height: isIphoneX() ? 50 : 45,
    borderWidth: 0.8,
    borderRadius: 5,
    justifyContent: "center",
  },
});
