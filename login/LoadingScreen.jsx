import React, { useEffect, useState, useContext } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Context from "../context/Context";
import firebase from "firebase";
import Main from "./Main";
import LogIn from "./Login";

function LoadingScreen({ navigation, route }) {
  const [isMounted, setIsMounted] = useState(true);
  //  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const user = firebase.auth().currentUser;

  useEffect(() => {
    if (isMounted) {
      firebase.auth().onAuthStateChanged((user) => {
        setIsLoggedIn(null);
        setTimeout(() => {
          if (user) {
            setIsLoggedIn(true);
            //  navigation.replace("Main");
          } else if (!user) {
            setIsLoggedIn(false);
            //  navigation.replace("Log In");
          }
        }, 1000);
      });
    }

    return () => {
      setIsMounted(false);
    };
  }, []);

  // checkIfLoggedIn = () => {

  // };

  // componentWillUnmount() {
  //   this.setState({ isMounted: false });
  //   //   this._isMounted = false;
  // }
  const { darkMode, language } = useContext(Context);

  if (isLoggedIn) {
    return <Main navigation={navigation} />;
  } else if (isLoggedIn === false) {
    return <LogIn route={route} navigation={navigation} />;
  } else {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: darkMode ? "black" : "#fff" },
        ]}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // return (
  //
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoadingScreen;
