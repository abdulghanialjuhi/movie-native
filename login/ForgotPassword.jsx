import React, { useState, useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Animated,
  Dimensions,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import MaterialCommunityIcons from "react-native-vector-icons/AntDesign";
import Context from "../context/Context";
import Header from "../shared/Header";
import { isIphoneX } from "react-native-iphone-x-helper";
import MaterialCommunityIcons2 from "react-native-vector-icons/MaterialIcons";

const { height, width } = Dimensions.get("window");

function Forgotpassword({ navigation, route }) {
  const [email, setEmail] = useState("");
  const { forgotPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { darkMode, language } = useContext(Context);
  const scrollA = useRef(new Animated.Value(0)).current;
  const [isEmail, setIsEmail] = useState(false);

  const HEIGHT = isIphoneX() ? height / 4 : height / 4;
  const handleOnchange1 = (value) => {
    setEmail(value);
  };

  const handleEmail = () => {
    setIsEmail(true);
  };

  async function handleSubmit() {
    try {
      setMessage("");
      setError("");
      setLoading(true);

      await forgotPassword(email);
      setMessage(language ? "check your inbox" : "تحقق من  بريدك الإلكتروني");
    } catch {
      if (email.length < 1) {
        setError(
          language
            ? "please enter your email"
            : "الرجاء إدخال البريد الإلكتروني"
        );
      } else {
        setError(
          language
            ? "Faild to reset password"
            : "فشل في إعادة تعيين كلمة المرور"
        );
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    if (error.length > 1) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
    if (message.length > 1) {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [error, message]);

  useEffect(() => {
    let mounted = true;
    Keyboard.addListener("keyboardDidHide", () => {
      if (mounted) {
        setIsEmail(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [Keyboard]);

  return (
    <View style={{ flex: 1, backgroundColor: darkMode ? "black" : "#fff" }}>
      {/* <Header
        name={language ? "Forgot Password" : "إعادة تعيين كلمة المرور"}
        onScrollY={onScrollY}
        navigation={navigation}
        route={route}
      /> */}
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
          //  justifyContent: "center",
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
            paddingTop: isIphoneX() ? 51 : 26,
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
              {language ? "Reset password" : "إعادة تعيين كلمة المرور"}{" "}
            </Animated.Text>
          </View>
        </Animated.View>
        <View
          style={[
            styles.container,
            {
              //   backgroundColor: darkMode ? "#101010" : "#fff",
              //  borderColor: darkMode ? "#202020" : "#c9c9c9",
            },
          ]}
        >
          <View style={styles.container1}>
            <View style={{ height: 25, margin: 5 }}>
              {error ? (
                <Text style={{ color: "red", marginTop: 5 }}> {error}</Text>
              ) : null}
              {message ? (
                <Text style={{ color: "#007fff", marginTop: 5 }}>
                  {" "}
                  {message}
                </Text>
              ) : null}
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
                //onChangeText={handleOnchange1}
                value={email}
                keyboardType="email-address"
                keyboardAppearance={darkMode ? "dark" : "default"}
                style={[
                  styles.textInput,
                  { color: darkMode ? "#e5e5e5" : "black" },
                ]}
                placeholder={language ? "Email" : "البريد الإلكتروني"}
                placeholderTextColor="#A9A9A9"
                autoCapitalize="none"
                returnKeyType="go"
                onSubmitEditing={handleSubmit}
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
                  <MaterialCommunityIcons name="close" color="gray" size={18} />
                ) : null}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              //  disabled={disable()}
              style={[
                styles.button,
                {
                  backgroundColor: "#007fff",
                  borderColor: darkMode ? "#007fff" : "#007fff",
                },
              ]}
              onPress={handleSubmit}
            >
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
                  {language ? "Send email" : "إرسال بريد إلكتروني"}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                margin: 6,
              }}
            >
              <Text
                style={{
                  color: darkMode ? "#e5e5e5" : "#454545",
                  fontSize: 15,
                  marginTop: 10,
                  marginBottom: 25,
                }}
              >
                {language ? "Already have an account" : "لديك حساب إلكتروني"}
              </Text>
              <Button
                title={language ? "Log In" : "سجل دخول"}
                onPress={() => navigation.navigate("Loading")}
              />
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: "center",
    // borderWidth: 1,
    width: "90%",
    borderRadius: 5,
  },
  container1: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  signuptext: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 25,
    marginBottom: 15,
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

export default Forgotpassword;
