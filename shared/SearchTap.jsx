import "react-native-gesture-handler";
import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Keyboard } from "react-native";
import Info from "../component/Info";
import { MaterialIcons } from "@expo/vector-icons";
import Search, { Notshow } from "../component/Search";
import Header from "./Header";
import Searched from "../component/Searched";
import Top from "../component/Top";
import About from "../component/About";
import Coming from "../component/Coming";
import Overview from "../component/Overview";
import Watchlist from "../component/Watchlist";
import Context from "../context/Context";
import Onchange from "../component/Onchange";

const HomeStack = createStackNavigator();

export default SearchStackScreen = ({ navigation }) => {
  const { state, darkMode, actions } = useContext(Context);

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      //  alert("Default behavior prevented");
      // Do something manually
      actions({ type: "set_show", payload: false });
      actions({ type: "set_search", payload: "" });
      // ...
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <HomeStack.Navigator
      headerMode="none"
      // screenOptions={{
      //   headerStyle: {
      //     backgroundColor: darkMode ? "#212121" : "#fff",
      //   },
      // }}
    >
      <HomeStack.Screen
        name="Search"
        // options={({ navigation }) => ({
        //   headerTitle: () => (
        //     <Search
        //       Search={"Search"}
        //       navigation={navigation}
        //       handleSubmit={handleSubmit}
        //     />
        //   ),
        //   headerLeft: () => (
        //     <MaterialIcons
        //       name="menu"
        //       size={25}
        //       style={[
        //         styles.leftButton,
        //         { color: darkMode ? "#fff" : "black" },
        //       ]}
        //       onPress={() => {
        //         Keyboard.dismiss();
        //         navigation.toggleDrawer();
        //       }}
        //     />
        //   ),
        // })}
      >
        {(props) => <Notshow {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Searched"
        // options={({ navigation }) => ({
        //   headerBackTitle: " ",
        //   headerTitle: () => (
        //     <Search navigation={navigation} handleSubmit={handleSubmit} />
        //   ),
        // })}
      >
        {(props) => <Searched {...props} />}
      </HomeStack.Screen>
      {/* <HomeStack.Screen
        name="OnChange"
        // options={({ navigation }) => ({
        //   headerBackTitle: " ",
        //   headerTitle: () => (
        //     <Search navigation={navigation} handleSubmit={handleSubmit} />
        //   ),
        // })}
      >
        {(props) => <Onchange {...props} />}
      </HomeStack.Screen> */}
      <HomeStack.Screen
        name="Info"
        // options={{
        //   headerBackTitle: " ",
        //   headerTitle: (props) => <Header {...props} title={state.title} />,
        // }}
      >
        {(props) => <Info {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Overview"
        // options={{
        //   headerBackTitle: " ",
        //   headerTitle: (props) => <Header {...props} title="Overview" />,
        // }}
      >
        {(props) => <Overview {...props} />}
      </HomeStack.Screen>
      {/* <HomeStack.Screen
        name="Top1"
        // options={{
        //   headerBackTitle: " ",
        //   headerTitle: (props) => <Header {...props} title="Top" />,
        // }}
      >
        {(props) => <Top {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Coming1"
        options={{
          headerBackTitle: " ",
          headerTitle: (props) => <Header {...props} title="Coming" />,
        }}
      >
        {(props) => <Coming {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Watchlist1"
        options={{
          headerBackTitle: " ",
          headerTitle: (props) => <Header {...props} title="Watchlist" />,
        }}
      >
        {(props) => <Watchlist {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="About1"
        options={{
          headerBackTitle: " ",
          headerTitle: (props) => <Header {...props} title="About" />,
        }}
      >
        {(props) => <About {...props} />}
      </HomeStack.Screen> */}
    </HomeStack.Navigator>
  );
};
const styles = StyleSheet.create({
  leftButton: {
    marginLeft: 13,
  },
  Search: {
    marginTop: 4,
  },
  Tap: {
    paddingTop: 20,
  },
});
