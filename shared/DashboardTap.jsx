import "react-native-gesture-handler";

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "./Header";
import Main from "../login/Main";
import SignUp from "../login/SignUp";
import Login from "../login/Login";
import ForgotPassword from "../login/ForgotPassword";
import LoadingScreen from "../login/LoadingScreen";

const HomeStack = createStackNavigator();

export default MainStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#212121",
        },
      }}
    >
      <HomeStack.Screen
        name="Main"
        options={({ navigation }) => ({
          headerTitle: (props) => <Header {...props} title="Main" />,
          headerLeft: () => (
            <MaterialIcons
              name="menu"
              size={28}
              style={styles.leftButton}
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      >
        {(props) => <Main {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Loading"
        options={{
          headerTitle: (props) => <Header {...props} title="Loading" />,
        }}
      >
        {(props) => <LoadingScreen {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Sign Up"
        options={{
          headerTitle: (props) => <Header {...props} title="Sign up" />,
        }}
      >
        {(props) => <SignUp {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Log In"
        options={{
          headerTitle: (props) => <Header {...props} title="Log In" />,
        }}
      >
        {(props) => <Login {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Forgot Password"
        options={{
          headerTitle: (props) => <Header {...props} title="Forgot Password" />,
        }}
      >
        {(props) => <ForgotPassword {...props} />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  leftButton: {
    color: "#fff",
    marginLeft: 15,
  },
  Search: {
    marginTop: 4,
  },
  Tap: {
    paddingTop: 20,
  },
});
