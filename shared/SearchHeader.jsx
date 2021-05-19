import React, { useRef, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  Animated,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/AntDesign";
import Context from "../context/Context";
import { isIphoneX } from "react-native-iphone-x-helper";
import { MaterialIcons } from "@expo/vector-icons";

export default function Search(props, { navigation }) {
  const { darkMode, show, search, actions, language } = useContext(Context);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const fadeAnim = useRef(new Animated.Value(windowWidth - 65)).current;

  const handleOnchange = (value) => {
    actions({ type: "set_search", payload: value });
    if (search.length > 0) {
    }
  };

  useEffect(() => {
    if (show) {
      Animated.timing(fadeAnim, {
        toValue: windowWidth - 115,
        duration: 280,
        useNativeDriver: false,
      }).start();
    } else if (!show) {
      Animated.timing(fadeAnim, {
        toValue: windowWidth - 65,
        duration: 250,
        useNativeDriver: false,
      }).start();
      Keyboard.dismiss();
    }
  }, [show]);

  const handleSubmit = () => {
    if (search.length > 0) {
      props.handleSubmit();
      props.navigation.push("Searched", { search });
      //setSearch("");
      // actions({ type: "set_search", payload: "" });
      //  actions({ type: "set_show", payload: false });
    }
  };

  const handleSearch = () => {
    actions({ type: "set_show", payload: true });
  };

  const handleCancel = () => {
    actions({ type: "set_show", payload: false });
    actions({ type: "set_search", payload: "" });
  };

  const widthanim = {
    width: fadeAnim,
  };

  return (
    <View
      style={[
        styles.containor,
        {
          paddingTop: isIphoneX() ? 40 : 20,
          //backgroundColor: "#fff",
          borderColor: darkMode ? "#2e2e2e" : "#c9c9c9",

          //   marginTop: isIphoneX() ? 30 : 20,
          height: isIphoneX() ? 90 : windowHeight / 11,
          width: windowWidth,
        },
      ]}
    >
      <View style={{ width: "10%" }}>
        <MaterialIcons
          name="menu"
          size={28}
          style={[styles.leftButton, { color: darkMode ? "#fff" : "black" }]}
          onPress={() => {
            props.navigation.toggleDrawer();
            Keyboard.dismiss();
          }}
        />
      </View>

      <Animated.View
        style={[
          styles.textInput,
          widthanim,
          {
            backgroundColor: darkMode ? "#212121" : "#e5e5e5",
            marginRight: show ? 4 : 0,
          },
        ]}
      >
        <View
          style={{
            justifyContent: "flex-start",
          }}
        >
          <MaterialCommunityIcons
            name="search1"
            style={{
              paddingLeft: 13,
              paddingRight: 0,
            }}
            color={darkMode ? "#e5e5e5" : "gray"}
            size={18}
          />
        </View>
        <TextInput
          //   onChangeText={handleOnchange}
          returnKeyType="search"
          onTouchStart={handleSearch}
          placeholderTextColor={darkMode ? "#A9A9A9" : "gray"}
          placeholder={
            language ? "Search for moives" : "ابحث عن افلام (بالإنجليزيه)"
          }
          style={[
            styles.input,
            {
              //backgroundColor: "gray",
              color: darkMode ? "#e5e5e5" : "black",
              width: show ? "78%" : "78%",
            },
          ]}
          keyboardAppearance={darkMode ? "dark" : "light"}
          onChangeText={handleOnchange}
          onSubmitEditing={handleSubmit}
          value={search}
        />

        <TouchableOpacity
          style={{ width: 20 }}
          onPress={() => actions({ type: "set_search", payload: "" })}
        >
          {search.length > 0 ? (
            <MaterialCommunityIcons
              name="close"
              style={{
                paddingLeft: show ? 0 : 5,
              }}
              color={darkMode ? "#e5e5e5" : "black"}
              size={15}
            />
          ) : null}
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity onPress={handleCancel}>
        {show ? (
          <Text
            style={{
              color: darkMode ? "#007AFF" : "#007AFF",
              marginTop: 0,
              marginRight: 13,
              marginLeft: 4,
            }}
          >
            {language ? "Cancel" : "إلغاء"}
          </Text>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containor: {
    zIndex: 1000,
    elevation: 1000,
    flexDirection: "row",
    justifyContent: "flex-start",
    // padding: 5,
    alignContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.3,
    paddingHorizontal: 15,
  },
  textInput: {
    height: 33,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  input: {
    paddingLeft: 10,
    fontSize: 16,
  },
});
