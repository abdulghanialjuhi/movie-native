import React, { useState, useContext, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Dimensions,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons2 from "react-native-vector-icons/MaterialIcons";
import Context from "../context/Context";
import Header from "../shared/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { isIphoneX } from "react-native-iphone-x-helper";
import firebase from "firebase";

const { height } = Dimensions.get("window");
export default function Updateprofile({ navigation, route }) {
  const user = firebase.auth().currentUser;
  const { currentUser, updatePassword, updateEmail, updateName } = useAuth();
  const [name, setName] = useState(user.displayName);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessagr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showpassword, setshowpassword] = useState(true);
  const { darkMode, language } = useContext(Context);
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isConfirmPass, setIsconfirmPass] = useState(false);

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

  const scrollA = useRef(new Animated.Value(0)).current;
  const HEIGHT = isIphoneX() ? height / 5 : height / 5;

  function handleSubmit() {
    if (password !== confirmpassword) {
      return setError(
        language ? "Password do not match" : "كلمة المرور غير متطابقة"
      );
    }
    if (name.length < 1) {
      return setError("Please enter a valid name");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (email !== currentUser.email) {
      promises.push(updateEmail(email));
    }

    if (name !== user.displayName) {
      promises.push(updateName(name));
    }

    if (password) {
      promises.push(updatePassword(password));
    }

    Promise.all(promises)
      .then(() => {
        setMessagr(
          language
            ? "Your account has been updated successfully"
            : "تم تحديث حسابك بنجاح"
        );
        setTimeout(() => {
          navigation.navigate("Loading");
        }, 2000);
      })
      .catch(() => {
        setError(language ? "Falid to update account" : "فشل في تحديث الحساب");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  return (
    <View
      style={[styles.body, { backgroundColor: darkMode ? "black" : "#fff" }]}
    >
      {/* <Header
        name={language ? "Update Profile" : "تحديث الملف"}
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
          <MaterialCommunityIcons2
            name="arrow-back-ios"
            size={23}
            style={{
              width: "12%",
              color: darkMode ? "#1e90ff" : "black",
              //     paddingRight: 10,
              //backgroundColor: "gray",
            }}
            onPress={() => navigation.goBack()}
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
              {language ? "Update profile" : "تعديل الملف الشخصي"}{" "}
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
                selectTextOnFocus={true}
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
                  <MaterialCommunityIcons name="close" color="gray" size={18} />
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
                selectTextOnFocus={true}
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
                value={password}
                keyboardAppearance={darkMode ? "dark" : "default"}
                style={[
                  styles.textInput,
                  { color: darkMode ? "#e5e5e5" : "black" },
                ]}
                placeholder={
                  language
                    ? "Leave blank to keep the same"
                    : "للأبقاء بدون تعديل لا تملئ الحقل "
                }
                underlineColorAndroid="transparent"
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
                  language
                    ? "Leave blank to keep the same"
                    : "للأبقاء بدون تعديل لا تملئ الحقل "
                }
                underlineColorAndroid="transparent"
                placeholderTextColor="#A9A9A9"
                secureTextEntry={showpassword ? true : false}
                textContentType="none"
              />
            </View>
            <TouchableOpacity
              disabled={loading}
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
                  {language ? "Update profile" : "تحديث الملف الشخصي"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  scrool: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
    color: "#e5e5e5",
    width: "87%",
    backgroundColor: "#0F0F0F",
  },
  Tbuttin: {
    borderRadius: 5,
    width: 220,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginTop: 20,
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
