import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Keyboard } from "react-native";
import Info from "../component/Info";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "./Header";
import Searched from "../component/Searched";
import Top from "../component/Top";
import About from "../component/About";
import Coming from "../component/Coming";
import Overview from "../component/Overview";
import Main from "../login/Main";
import SignUp from "../login/SignUp";
import Login from "../login/Login";
import ForgotPassword from "../login/ForgotPassword";
import LoadingScreen from "../login/LoadingScreen";
import Watchlist from "../component/Watchlist";
import Updateprofile from "../login/Updateprofile";
import Context from "../context/Context";
import NameSetting from "../login/NameSetting";
import firebase from "firebase";

const HomeStack = createStackNavigator();

export const LogStackScreen = () => {
  const { state, darkMode } = useContext(Context);
  // const [isLoaggedIn, setIsLoggedIn] = useState(null);

  // useEffect(() => {
  //   let isMounted = true;
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       if (isMounted) {
  //         setIsLoggedIn(true);
  //       }
  //     } else {
  //       if (isMounted) {
  //         setIsLoggedIn(false);
  //       }
  //     }
  //   });

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);
  return (
    <HomeStack.Navigator initialRouteName="Loading" headerMode="none">
      <HomeStack.Screen name="Loading">
        {(props) => <LoadingScreen {...props} />}
      </HomeStack.Screen>
      {/* <HomeStack.Screen name="Log In">
        {(props) => <Login {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="Main">
        {(props) => <Main {...props} />}
      </HomeStack.Screen> */}
      <HomeStack.Screen name="Name">
        {(props) => <NameSetting {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="Sign Up">
        {(props) => <SignUp {...props} />}
      </HomeStack.Screen>

      <HomeStack.Screen name="UpdateProfile">
        {(props) => <Updateprofile {...props} />}
      </HomeStack.Screen>

      <HomeStack.Screen name="Forgot Password">
        {(props) => <ForgotPassword {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="Info">
        {(props) => <Info {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="Overview">
        {(props) => <Overview {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Top2"
        options={{
          headerBackTitle: " ",
          headerTitle: (props) => <Header {...props} title="Top" />,
        }}
      >
        {(props) => <Top {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Coming2"
        options={{
          headerBackTitle: " ",

          headerTitle: (props) => <Header {...props} title="Coming" />,
        }}
      >
        {(props) => <Coming {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Watchlist2"
        options={{
          headerBackTitle: " ",
          headerTitle: (props) => <Header {...props} title="Watchlist" />,
        }}
      >
        {(props) => <Watchlist {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="About2"
        options={{
          headerBackTitle: " ",
          headerTitle: (props) => <Header {...props} title="About" />,
        }}
      >
        {(props) => <About {...props} />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

export const MainStackScreen = () => {
  const { state, darkMode } = useContext(Context);

  return (
    <HomeStack.Navigator headerMode="none">
      {/* <HomeStack.Screen name="Loading">
        {(props) => <LoadingScreen {...props} />}
      </HomeStack.Screen> */}
      <HomeStack.Screen name="Main">
        {(props) => <Main {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="Log In">
        {(props) => <Login {...props} />}
      </HomeStack.Screen>

      <HomeStack.Screen name="Name">
        {(props) => <NameSetting {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="Sign Up">
        {(props) => <SignUp {...props} />}
      </HomeStack.Screen>

      <HomeStack.Screen name="UpdateProfile">
        {(props) => <Updateprofile {...props} />}
      </HomeStack.Screen>

      <HomeStack.Screen name="Forgot Password">
        {(props) => <ForgotPassword {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="Info">
        {(props) => <Info {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="Overview">
        {(props) => <Overview {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Top2"
        options={{
          headerBackTitle: " ",
          headerTitle: (props) => <Header {...props} title="Top" />,
        }}
      >
        {(props) => <Top {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Coming2"
        options={{
          headerBackTitle: " ",

          headerTitle: (props) => <Header {...props} title="Coming" />,
        }}
      >
        {(props) => <Coming {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Watchlist2"
        options={{
          headerBackTitle: " ",
          headerTitle: (props) => <Header {...props} title="Watchlist" />,
        }}
      >
        {(props) => <Watchlist {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="About2"
        options={{
          headerBackTitle: " ",
          headerTitle: (props) => <Header {...props} title="About" />,
        }}
      >
        {(props) => <About {...props} />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  leftButton: {
    marginLeft: 15,
  },
  Search: {
    marginTop: 4,
  },
  Tap: {
    paddingTop: 20,
  },
});
