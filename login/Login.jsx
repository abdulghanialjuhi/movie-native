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
  TouchableHighlight,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import MaterialCommunityIcons1 from "react-native-vector-icons/AntDesign";
import { useAuth } from "../context/AuthContext";
import Context from "../context/Context";
import Header from "../shared/Header";
import { isIphoneX } from "react-native-iphone-x-helper";
import { MaterialIcons } from "@expo/vector-icons";

function LogIn({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showpassword, setshowpassword] = useState(true);
  const { darkMode, language } = useContext(Context);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const scrollA = useRef(new Animated.Value(0)).current;

  const handleEmail = () => {
    setIsEmail(true);
    setIsPassword(false);
  };

  const handlePassword = () => {
    setIsEmail(false);
    setIsPassword(true);
  };

  const disable = () => {
    if (email.length === 0 || password.length === 0) {
      return true;
    } else if (loading) {
      return true;
    } else {
      return false;
    }
  };

  async function handleSubmit() {
    Keyboard.dismiss();
    if (!disable()) {
      if (email.length && password.length >= 1) {
        try {
          setError("");
          setLoading(true);
          await login(email, password);
          //  await setLoading(false);
          //  await navigation.goBack();
        } catch {
          setError(language ? "Faild to log in" : "فشل في تسجبل الدخول");
          setLoading(false);
        }

        //   setLoading(false);
      } else {
        setError(
          language
            ? "Please enter email and password"
            : "الرجاء إدخال البريد الإلكتروني وكلمة المرور"
        );
      }
    }
  }

  useEffect(() => {
    let mounted = true;
    Keyboard.addListener("keyboardDidHide", () => {
      if (mounted) {
        setIsEmail(false);
        setIsPassword(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [Keyboard]);

  useEffect(() => {
    let mounted = true;
    if (error.length > 1) {
      setTimeout(() => {
        if (mounted) {
          setError("");
        }
      }, 3000);
    }

    return () => (mounted = false);
  }, [error]);

  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  const onSignIn = (googleUser) => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function (result) {
            if (result.additionalUserInfo.isNewUser) {
              console.log("user signed in");
              firebase
                .database()
                .ref("/users/" + result.user.uid)
                .set({
                  gmail: result.user.email,
                  prfile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  create_at: Date.now(),
                });
            } else {
              firebase
                .database()
                .ref("/users/" + result.user.uid)
                .update({
                  last_logged_in: Date.now(),
                });
            }
          })

          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log("User already signed-in Firebase.");
      }
    });
  };

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        //  androidClientId: YOUR_CLIENT_ID_HERE,
        //   behavior: "web",
        iosClientId:
          "698838059357-j753eituqcdguuer85ot1mj6l0i7fodf.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
  const windowHeight = Dimensions.get("window").height;

  const HEIGHT = isIphoneX() ? windowHeight / 5 : windowHeight / 5;
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: darkMode ? "black" : "#fff" }}
    >
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
          // justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View
          style={{
            transform: [{ translateY: scrollA }],
            //backgroundColor: "gray",
            width: "100%",
            height: HEIGHT,
            //  justifyContent: "center",
            paddingHorizontal: 15,
            paddingTop: isIphoneX() ? 51 : 26,
          }}
        >
          <MaterialIcons
            name="menu"
            size={28}
            style={{
              color: darkMode ? "#fff" : "black",
              width: "14%",
              //  backgroundColor: "gray",
            }}
            onPress={() => navigation.toggleDrawer()}
          />
          <View
            //   onPress={() => Haptics.selectionAsync()}
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
              {language ? "Log in" : "تسجيل الدخول"}{" "}
            </Animated.Text>
          </View>
        </Animated.View>
        <View
          style={[
            styles.container,
            {
              //  backgroundColor: darkMode ? "#101010" : "#fff",
              //  borderColor: darkMode ? "#202020" : "#c9c9c9",
            },
          ]}
        >
          <View style={styles.container1}>
            <Text style={{ color: "red", margin: 6 }}> {error}</Text>
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
                placeholderTextColor="#A9A9A9"
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
                  <MaterialCommunityIcons name="close" color="gray" size={18} />
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
                returnKeyType="go"
                onSubmitEditing={handleSubmit}
                value={password}
                keyboardAppearance={darkMode ? "dark" : "default"}
                style={[
                  styles.textInput,
                  { color: darkMode ? "#e5e5e5" : "black" },
                ]}
                placeholder={language ? "Password" : "كلمة المرور"}
                placeholderTextColor="#A9A9A9"
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
                  <MaterialCommunityIcons
                    name={showpassword ? "eye-off" : "eye"}
                    color="gray"
                    size={18}
                  />
                ) : null}
              </TouchableOpacity>
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
                    {language ? "Log in" : "تسجيل الدخول"}
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
                      color: "#fff",
                      fontFamily: "Gill Sans",
                    }}
                  >
                    {language ? "Log in" : "تسجيل الدخول"}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <Button
              title={language ? "Forgot Password ?" : "نسيت كلمة المرور ؟"}
              onPress={() => navigation.navigate("Forgot Password")}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: darkMode ? "#e5e5e5" : "#454545",
                  fontSize: 15,
                  marginTop: 10,
                }}
              >
                {language ? "Do not Have an Account" : "ليس لديك حساب"}
              </Text>

              <Button
                title={language ? "Sign up" : "إنشاء حساب"}
                onPress={() => navigation.navigate("Sign Up")}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              paddingRight: 10,
              paddingLeft: 10,
            }}
          >
            <View
              style={{
                marginTop: 22,
                flexDirection: "row",
                width: "43%",
                backgroundColor: "gray",
                height: 1,
              }}
            />
            <Text
              style={{
                color: darkMode ? "#e5e5e5" : "gray",
                fontSize: 19,
                margin: 10,
              }}
            >
              {" "}
              {language ? "or" : "أو"}{" "}
            </Text>
            <View
              style={{
                margin: 0,
                marginTop: 22,
                flexDirection: "row",
                width: "43%",
                backgroundColor: "gray",
                height: 1,
              }}
            ></View>
          </View>
          <View style={styles.googleButton}>
            <TouchableOpacity
              onPress={signInWithGoogleAsync}
              style={{
                backgroundColor: "#4285F4",
                borderRadius: 3,
                width: 250,
                padding: 2,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  marginLeft: 1,
                  marginRight: 15,
                  borderRadius: 3,
                }}
              >
                <MaterialCommunityIcons1
                  style={{ margin: 10 }}
                  name="google"
                  color="#4285F4"
                  size={24}
                />
              </View>
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{
                    fontSize: language ? 20 : 18,
                    color: "white",
                    fontFamily: "Gill Sans",
                  }}
                >
                  {" "}
                  {language
                    ? "Sign in with Google"
                    : "سجل عن طريق  Google"}{" "}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "90%",
    borderRadius: 5,
  },
  container1: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  signuptext: {
    fontSize: 25,
    fontWeight: "700",
    marginTop: 15,
  },
  Cpasswordinput: {
    flexDirection: "row",
    borderRadius: 7,
    paddingLeft: 10,
    borderWidth: 0.5,
    width: "95%",
    height: isIphoneX() ? 48 : 43,
    margin: 10,
    alignItems: "center",
  },
  textInput: {
    borderRadius: 5,
    paddingLeft: 10,
    height: 40,
    width: "87%",
  },
  passwordinput: {
    borderRadius: 5,
    paddingLeft: 10,
    height: 40,
    width: "87%",
  },
  button: {
    marginBottom: 10,
    marginTop: 20,
    width: 300,
    height: 50,
    borderWidth: 0.8,
    borderRadius: 5,
    justifyContent: "center",
  },
  googleButton: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
  },
});

export default LogIn;
