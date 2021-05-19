import React, { useState, useContext, useEffect } from "react";
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
} from "react-native";
import { useAuth } from "../context/AuthContext";
import MaterialCommunityIcons from "react-native-vector-icons/AntDesign";
import Context from "../context/Context";
import Header from "../shared/Header";
import firebase from "firebase";

function NameSetting({ navigation, route }) {
  const [email, setEmail] = useState("");
  const { forgotPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { darkMode, language } = useContext(Context);
  const onScrollY = new Animated.Value(0);

  const handleOnchange1 = (value) => {
    setEmail(value);
  };

  async function handleSubmit() {
    try {
      setMessage("");
      setError("");
      setLoading(true);

      await forgotPassword(email);
      setMessage(language ? "check your inbox" : "تحقق من  بريدك الإلكتروني");
    } catch {
      setError(
        language ? "Faild to reset password" : "فشل في إعادة تعيين كلمة المرور"
      );
    }

    setLoading(false);
  }

  useEffect(() => {
    if (error.length > 1) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  return (
    <View style={{ flex: 1, backgroundColor: darkMode ? "black" : "#fff" }}>
      {/* <Header
        name={language ? "Forgot Password" : "إعادة تعيين كلمة المرور"}
        onScrollY={onScrollY}
        navigation={navigation}
        route={route}
      /> */}
      <View
        style={{
          width: "100%",
          height: "20%",
          backgroundColor: "#fff",
          justifyContent: "center",
          paddingTop: 15,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 20 }}>
          {" "}
          {language ? "Tell us your name (: " : "أخبرنا بإسمك ):"}{" "}
        </Text>
      </View>
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flex: 1,
          backgroundColor: darkMode ? "#080808" : "#fff",
          marginTop: 80,
          alignItems: "center",
        }}
      >
        <View
          style={[
            styles.container,
            {
              backgroundColor: darkMode ? "#101010" : "#fff",
              borderColor: darkMode ? "#202020" : "#c9c9c9",
            },
          ]}
        >
          <View style={styles.container1}>
            {/* <Text
              style={[
                styles.signuptext,
                { color: darkMode ? "#e5e5e5" : "black" },
              ]}
            >
              {" "}
              Forgot password{" "}
            </Text> */}
            {error ? (
              <Text style={{ color: "red", marginTop: 5 }}> {error}</Text>
            ) : null}
            {message ? (
              <Text style={{ color: "#e5e5e5", marginTop: 5 }}> {message}</Text>
            ) : null}

            <View
              style={[
                styles.Cpasswordinput,
                { backgroundColor: darkMode ? "#0F0F0F" : "#fff" },
              ]}
            >
              <TextInput
                onChangeText={handleOnchange1}
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
                  paddingTop: 10,
                  padding: 10,
                }}
              >
                {email.length > 0 ? (
                  <MaterialCommunityIcons name="close" color="gray" size={18} />
                ) : null}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: darkMode ? "black" : "#4285F4" },
              ]}
              onPress={() => firebase.auth().signOut()}
            >
              <Button
                color={darkMode ? "" : "#fff"}
                disabled={loading}
                onPress={() => firebase.auth().signOut()}
                title={language ? "Send email" : "إرسال بريد إلكتروني"}
              />
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
                onPress={() => navigation.navigate("Log In")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: "center",
    borderWidth: 1,
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
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: 0.5,
    color: "#e5e5e5",
    width: "95%",
    height: 50,
    margin: 10,
    marginTop: 20,
    padding: 5,
  },

  button: {
    borderRadius: 3,
    marginBottom: 10,
    marginTop: 20,
    width: 300,
    height: 50,
    justifyContent: "center",
  },
});

export default NameSetting;
