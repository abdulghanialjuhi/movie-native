import "react-native-gesture-handler";
import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTapScreen, { HomeStackScreen, MyTabBar } from "./shared/MainTap";
import { CustomDrawer } from "./routes/DrawerContent";
import MovieContextProvider from "./context/MovieContext";
import useGlobalstate from "./context/useGlobal";
import Context from "./context/Context";
import { ActivityIndicator, View, StatusBar, AsyncStorage } from "react-native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchTap from "./shared/SearchTap";
import { MainStackScreen, LogStackScreen } from "./shared/LoginTap";
import firebase from "firebase";
import MainComponent from "./login/Main";
import LogIn from "./login/Login";
import { AppearanceProvider, Appearance } from "react-native-appearance";

const Drawer = createDrawerNavigator();

const Main = () => {
  const { darkMode } = useContext(Context);
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      activeColor={darkMode ? "#ffd700" : "black"}
      initialRouteName="Home"
      barStyle={{
        backgroundColor: darkMode ? "#212121" : "#f7f7f7",
        paddingTop: 13,
        height: "9.4%",
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="home" component={HomeStackScreen} />
      <Tab.Screen name="search" component={SearchTap} />
      <Tab.Screen name="person" component={LogStackScreen} />
    </Tab.Navigator>
  );
};

export default function Root() {
  const store = useGlobalstate();
  return (
    <AppearanceProvider>
      <AuthProvider>
        <Context.Provider value={store}>
          <App />
        </Context.Provider>
      </AuthProvider>
    </AppearanceProvider>
  );
}

export function App() {
  const { inisilaized } = useAuth();
  const { darkMode, actions } = useContext(Context);
  const [loaded, setLoaded] = useState(false);

  const getitem = async () => {
    try {
      const mode = JSON.parse(await AsyncStorage.getItem("Mode"));
      const language1 = JSON.parse(await AsyncStorage.getItem("Language"));
      const deviceSettings = JSON.parse(
        await AsyncStorage.getItem("DeviceMode")
      );

      if (mode !== null) {
        actions({ type: "set_dark", payload: mode });
      }

      if (language1 !== null) {
        actions({ type: "set_language", payload: language1 });
      }

      if (deviceSettings !== null) {
        console.log("sorage", deviceSettings);
        // if (colorScheme === "dark") {
        //   actions({ type: "set_dark", payload: true });
        // } else if (colorScheme === "light") {
        //   actions({ type: "set_dark", payload: false });
        // }
        actions({ type: "set_deviceMode", payload: deviceSettings });
      }
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getitem();
  }, []);

  return (
    <>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
      {!inisilaized ? (
        loaded ? (
          <NavigationContainer>
            <Drawer.Navigator
              drawerType="slide"
              initialRouteName="Home"
              drawerContent={(props) => <CustomDrawer {...props} />}
            >
              <Drawer.Screen name="HomeDrawer" component={Main} />
            </Drawer.Navigator>
          </NavigationContainer>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: darkMode ? "black" : "#fff",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <ActivityIndicator
              size="large"
              color={darkMode ? "#e5e5e5" : "gray"}
            />
          </View>
        )
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: darkMode ? "black" : "#fff",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <ActivityIndicator
            size="large"
            color={darkMode ? "#e5e5e5" : "gray"}
          />
        </View>
      )}
    </>
  );
}
