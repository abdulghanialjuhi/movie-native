import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useContext, useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  Animated,
  View,
  TouchableOpacity,
  Share,
} from "react-native";
import Home from "../component/Home";
import Info from "../component/Info";
import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons1 from "react-native-vector-icons/Ionicons";
import Header from "./Header";
import Top from "../component/Top";
import { About } from "../component/About";
import Coming from "../component/Coming";
import Overview from "../component/Overview";
import Watchlist from "../component/Watchlist";
import SearchStackScreen from "./SearchTap";
import LoginTap from "./LoginTap";
import Context from "../context/Context";
import {
  CustomDrawer,
  SearchCustomDrawer,
  LogCustomDrawer,
} from "../routes/DrawerContent";
import { useAuth } from "../context/AuthContext";
import { isIphoneX } from "react-native-iphone-x-helper";

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();

export function MyTabBar({ state, descriptors, navigation }) {
  const { darkMode } = useContext(Context);
  return (
    <View
      style={{
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: darkMode ? "#080808" : "#f7f7f7",
        flexDirection: "row",
        height: "9.4%",
        justifyContent: "space-between",
        paddingBottom: 10,
        alignContent: "center",
        alignItems: "center",
        borderTopWidth: 0.3,
        borderColor: darkMode ? "#2e2e2e" : "#c9c9c9",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const animatedValue = useRef(new Animated.Value(1)).current;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });
          Animated.spring(animatedValue, {
            toValue: 0.7,
            //   duration: 200,
            useNativeDriver: false,
          }).start();
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const handlePressOut = () => {
          Animated.spring(animatedValue, {
            toValue: 1,
            friction: 3,
            tension: 30,
            useNativeDriver: false,
          }).start();
        };

        return (
          <TouchableOpacity
            style={{
              //     paddingTop: 15,
              paddingBottom: isIphoneX() ? 10 : 0,
              paddingLeft: 20,
              paddingRight: 20,
              //   backgroundColor: "gray",
            }}
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPressIn={onPress}
            onPressOut={handlePressOut}
            onLongPress={onLongPress}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
          >
            <Animated.View
              style={{
                //   backgroundColor: "black",
                padding: 6,
                transform: [{ scale: animatedValue }],
              }}
            >
              <MaterialCommunityIcons1
                style={{
                  color: isFocused
                    ? darkMode
                      ? "#ffd700"
                      : "black"
                    : "#a9a9a9",
                }}
                size={24}
                name={label}
              />
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const MainTapScreen = () => {
  const { darkMode } = useContext(Context);

  return (
    <Tab.Navigator
      shifting={true}
      inactiveColor="#a9a9a9"
      activeColor={darkMode ? "#ffd700" : "black"}
      initialRouteName="Home"
      barStyle={{
        backgroundColor: darkMode ? "#212121" : "#f7f7f7",
        paddingTop: 13,
        height: "9.4%",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="search1" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Log in"
        backgroundColor="initialRoute"
        component={LoginTap}
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons1 name="person" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();

export const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      drawerType="slide"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="HomeDrawer" component={HomeStackScreen} />
    </Drawer.Navigator>
  );
};
export const SearchDrawer = () => {
  return (
    <Drawer.Navigator
      drawerType="slide"
      initialRouteName="Search"
      drawerContent={(props) => <SearchCustomDrawer {...props} />}
    >
      <Drawer.Screen name="SearchDrawer" component={SearchStackScreen} />
    </Drawer.Navigator>
  );
};
export const LogDrawer = () => {
  return (
    <Drawer.Navigator
      drawerType="slide"
      initialRouteName="Loading"
      drawerContent={(props) => <LogCustomDrawer {...props} />}
    >
      <Drawer.Screen name="LoginDrawer" component={LoginTap} />
    </Drawer.Navigator>
  );
};

export default MainTapScreen;

export const HomeStackScreen = ({ navigation }) => {
  const { state, darkMode } = useContext(Context);
  const onScrollY = new Animated.Value(0);
  const diffclamp = Animated.diffClamp(onScrollY, 0, 90);
  const transplateY = onScrollY.interpolate({
    inputRange: [0, 45],
    outputRange: [0, 0],
    extrapolate: "clamp",
  });
  const { currentUser } = useAuth();
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      //   alert("Default behavior prevented");
      // Do something manually
      // ...
    });

    return unsubscribe;
  }, [navigation]);
  const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
        url: IMAGE_URL + state.poster_path,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <HomeStack.Navigator
      headerMode="none"
      // screenOptions={{
      //   headerStyle: {
      //     transform: [{ translateY: 0 }],
      //     height: diffclamp.interpolate({
      //       inputRange: [0, 90],
      //       outputRange: [90, 40],
      //       extrapolate: "clamp",
      //     }),
      //     backgroundColor: darkMode ? "#0a0a0a" : "#f7f7f7",
      //   },
      // }}
    >
      <HomeStack.Screen
        Header=""
        name="Home"
        // options={({ navigation }) => ({
        //   headerTitle: (props) => <Header {...props} title="Popular" />,
        //   headerLeft: () => (
        //     <MaterialIcons
        //       name="menu"
        //       size={28}
        //       style={[
        //         styles.leftButton,
        //         { color: darkMode ? "#fff" : "black" },
        //       ]}
        //       onPress={() => navigation.toggleDrawer()}
        //     />
        //   ),
        // })}
      >
        {(props) => <Home onScrollY={onScrollY} {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Info"
        // options={{
        //   headerRight: () => (
        //     <TouchableOpacity>
        //       <MaterialCommunityIcons1
        //         name="share-outline"
        //         size={28}
        //         style={[
        //           styles.rightButton,
        //           { color: darkMode ? "#fff" : "black" },
        //         ]}
        //         onPress={onShare}
        //       />
        //     </TouchableOpacity>
        //   ),
        //   headerBackTitle: " ",
        //   headerTitle: (props) => <Header {...props} title={state.title} />,
        // }}
      >
        {(props) => <Info {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Overview"
        options={{
          headerBackTitle: " ",
          headerTitle: (props) => <Header {...props} title="Overview" />,
        }}
      >
        {(props) => <Overview {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Top"
        options={{
          headerBackTitle: " ",
          headerTitle: (props) => <Header {...props} title="Top" />,
        }}
      >
        {(props) => <Top {...props} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Coming"
        options={{
          headerBackTitle: " ",
          headerTitle: (props) => <Header {...props} title="Coming" />,
        }}
      >
        {(props) => <Coming {...props} />}
      </HomeStack.Screen>
      {currentUser ? (
        <HomeStack.Screen
          name="Watchlist"
          options={{
            headerBackTitle: " ",
            headerTitle: (props) => <Header {...props} title="Watchlist" />,
          }}
        >
          {(props) => <Watchlist {...props} />}
        </HomeStack.Screen>
      ) : null}
      <HomeStack.Screen
        name="About"
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
  rightButton: {
    marginRight: 15,
  },
  Search: {
    marginTop: 4,
  },
  Tap: {
    paddingTop: 20,
  },
});
