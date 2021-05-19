import React, { useState, useRef, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons1 from "react-native-vector-icons/Feather";
import Context from "../context/Context";
import { SwipeListView } from "react-native-swipe-list-view";
import { isIphoneX } from "react-native-iphone-x-helper";
import Search from "../shared/SearchHeader";
import Onchange from "./Onchange";

// const DismissKeyboard = ({ children }) => (
//   <TouchableWithoutFeedback
//     onPress={() => {
//       Keyboard.dismiss();
//     }}
//   >
//     {children}
//   </TouchableWithoutFeedback>
// );

// export default function Search(props, { navigation }) {
//   // const [search, setSearch] = useState("");

//   const { darkMode, show, search, actions } = useContext(Context);

//   const windowWidth = Dimensions.get("window").width;
//   const fadeAnim = useRef(new Animated.Value(windowWidth - 65)).current;

//   const handleOnchange = (value) => {
//     //  setSearch(value);
//     actions({ type: "set_search", payload: value });
//   };

//   useEffect(() => {
//     if (show) {
//       Animated.timing(fadeAnim, {
//         toValue: windowWidth - 115,
//         duration: 250,
//         useNativeDriver: false,
//       }).start();
//     } else if (!show) {
//       Animated.timing(fadeAnim, {
//         toValue: windowWidth - 65,
//         duration: 250,
//         useNativeDriver: false,
//       }).start();
//       Keyboard.dismiss();
//     }
//   }, [show]);

//   const handleSubmit = () => {
//     if (search.length > 0) {
//       props.handleSubmit();
//       props.navigation.push("Searched", { search });
//       //setSearch("");
//       // actions({ type: "set_search", payload: "" });
//       //  actions({ type: "set_show", payload: false });
//     }
//   };

//   const handleSearch = () => {
//     actions({ type: "set_show", payload: true });
//   };

//   const handleCancel = () => {
//     actions({ type: "set_show", payload: false });
//     actions({ type: "set_search", payload: "" });
//   };

//   const widthanim = {
//     width: fadeAnim,
//   };
//   return (
//     <View
//       style={{
//         zIndex: 1000,
//         elevation: 1000,
//         flexDirection: "row",
//         justifyContent: "flex-start",
//         padding: 5,
//         paddingTop: isIphoneX() ? 15 : 0,
//         alignContent: "center",
//         alignItems: "center",
//         //backgroundColor: "black",
//         borderColor: darkMode ? "#2e2e2e" : "#c9c9c9",
//         borderBottomWidth: 0.3,
//         // marginLeft: 15,
//         marginTop: isIphoneX() ? 30 : 20,
//         height: isIphoneX() ? 60 : 45,
//         paddingHorizontal: 7,
//         width: windowWidth,
//       }}
//     >
//       <View style={{ width: "10%" }}>
//         <MaterialIcons
//           name="menu"
//           size={28}
//           style={[styles.leftButton, { color: darkMode ? "#fff" : "black" }]}
//           onPress={() => navigation.toggleDrawer()}
//         />
//       </View>

//       <Animated.View
//         style={[
//           styles.textInput,
//           widthanim,
//           {
//             backgroundColor: darkMode ? "#353535" : "#e5e5e5",
//             marginRight: show ? 4 : 0,
//           },
//         ]}
//       >
//         <View
//           style={{
//             justifyContent: "flex-start",
//           }}
//         >
//           <MaterialCommunityIcons
//             name="search1"
//             style={{
//               paddingLeft: 13,
//               paddingRight: 0,
//             }}
//             color={darkMode ? "#e5e5e5" : "gray"}
//             size={18}
//           />
//         </View>
//         <TextInput
//           returnKeyType="search"
//           onTouchStart={handleSearch}
//           placeholderTextColor={darkMode ? "#A9A9A9" : "gray"}
//           placeholder="Search for moives"
//           style={[
//             styles.input,
//             {
//               //backgroundColor: "gray",
//               color: darkMode ? "#e5e5e5" : "black",
//               width: show ? "78%" : "78%",
//             },
//           ]}
//           keyboardAppearance={darkMode ? "dark" : "light"}
//           onChangeText={handleOnchange}
//           onSubmitEditing={handleSubmit}
//           value={search}
//         />

//         <TouchableOpacity
//           style={{ width: 20 }}
//           onPress={() => actions({ type: "set_search", payload: "" })}
//         >
//           {search.length > 0 ? (
//             <MaterialCommunityIcons
//               name="close"
//               style={{
//                 paddingLeft: show ? 0 : 5,
//               }}
//               color={darkMode ? "#e5e5e5" : "black"}
//               size={15}
//             />
//           ) : null}
//         </TouchableOpacity>
//       </Animated.View>
//       <TouchableOpacity onPress={handleCancel}>
//         {show ? (
//           <Text
//             style={{
//               color: darkMode ? "#007AFF" : "#007AFF",
//               marginTop: 0,
//               marginRight: 13,
//               marginLeft: 4,
//             }}
//           >
//             Cancel
//           </Text>
//         ) : null}
//       </TouchableOpacity>
//     </View>
//   );
// }

export const Notshow = ({ navigation }) => {
  const [remove, setRemove] = useState(true);
  const {
    show,
    searchHistory,
    darkMode,
    language,
    actions,
    search,
  } = useContext(Context);

  const showSearch = useRef(new Animated.Value(-10)).current;
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const removeanimated = useRef(new Animated.Value(0)).current;
  const removeopacity = useRef(new Animated.Value(0)).current;
  const hideSearch = useRef(new Animated.Value(0)).current;
  const heightAnimation = useRef(new Animated.Value(0)).current;
  const [isExtra, setIsExtra] = useState(false);
  useEffect(() => {
    if (show) {
      Animated.spring(heightAnimation, {
        toValue: 0,
        // duration: 350,
        useNativeDriver: false,
      }).start();

      Animated.timing(showSearch, {
        toValue: 18,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(showSearch, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          Animated.timing(hideSearch, {
            toValue: -600,
            duration: 0,
            useNativeDriver: false,
          }).start();
        });
      });
    }
    if (!show) {
      Animated.timing(hideSearch, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(heightAnimation, {
          toValue: -800,
          duration: 200,
          useNativeDriver: false,
        }).start();
      });
    }
  }, [show]);

  const animatedOpacity = heightAnimation.interpolate({
    inputRange: [-20, 0],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  // const animatedHeight = {
  //  // marginTop: showSearch,
  // };

  const translateX = {
    transform: [
      {
        translateX: hideSearch,
      },
    ],
  };

  const translateY = {
    transform: [
      {
        translateY: heightAnimation,
      },
    ],
  };

  useEffect(() => {
    if (!remove) {
      setTimeout(() => {
        setRemove(true);
      }, 2000);
    }

    if (remove) {
      Animated.timing(removeanimated, {
        toValue: 17,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(removeopacity, {
          toValue: 1,
          duration: 0,
          useNativeDriver: false,
        }).start();
      });
    } else if (!remove) {
      Animated.timing(removeanimated, {
        toValue: 41,
        duration: 200,
        useNativeDriver: false,
      }).start();

      Animated.timing(removeopacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  }, [remove]);

  const animatedWidth = {
    width: removeanimated,
  };
  const handleSearch = (search) => {
    const search1 = search + " ";
    navigation.push("Searched", { search });
    actions({ type: "set_search", payload: search1 });
    actions({ type: "set_show", payload: false });
  };

  const handleArrow = (search) => {
    const search1 = search + " ";
    actions({ type: "set_search", payload: search1 });
  };

  const VisableItem = (props) => {
    const {
      data,
      rowHeightAnimatedValue,
      removeRow,
      rightActionState,
      rowData,
    } = props;
    //  console.log(props);
    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
        setIsExtra(false);
      });
    }

    return (
      <Animated.View
        style={{
          flexDirection: "row",
          height: rowHeightAnimatedValue,
          borderBottomWidth: 0.3,
          borderBottomColor: darkMode ? "#2e2e2e" : "#a9a9a9",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.0,
          paddingHorizontal: 12,
          backgroundColor: darkMode ? "black" : "#fff",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={handleSearch.bind(this, data.item.search)}
          style={{
            height: "100%",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            width: 300,
          }}
        >
          <Text
            style={{
              color: darkMode ? "#fff" : "black",
              fontSize: 15,
            }}
          >
            {data.item.search}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignContent: "center",
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 7,
          }}
          onPress={handleArrow.bind(this, data.item.search)}
        >
          <MaterialCommunityIcons1
            name="arrow-up-left"
            color="#6495ed"
            size={20}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(38);
    // console.log(rowMap);
    return (
      <VisableItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => deleteRow(rowMap, data.item.id)}
      />
    );
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const deleteItem = searchHistory.filter((s) => s.id !== rowKey);
    actions({ type: "add_search", payload: deleteItem });
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(38);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.item.id)}
        deleteRow={() => deleteRow(rowMap, data.item.id)}
      />
    );
  };

  const handleLeftAction = (props) => {
    const { isActivated } = props;
    if (isActivated) {
      setIsExtra(true);
    } else {
      setIsExtra(false);
    }
  };

  const handleRightaction = (props) => {
    //  console.log("action1");
  };

  const HiddenItemWithActions = (props) => {
    const {
      onClose,
      deleteRow,
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      rightActionState,
    } = props;
    //  console.log(props);
    if (rightActionActivated) {
      Animated.timing(rowActionAnimatedValue, {
        toValue: windowWidth,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else if (!rightActionActivated) {
      Animated.timing(rowActionAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }

    const scale = swipeAnimatedValue.interpolate({
      inputRange: [-75, 0],
      outputRange: [0, 75],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[styles.rowBack, { height: rowHeightAnimatedValue }]}
      >
        <Animated.View
          style={[
            styles.backRightBtn,
            styles.backRightBtnRight,
            { width: rowActionAnimatedValue },
          ]}
        >
          <TouchableOpacity
            onPress={deleteRow}
            style={[styles.backRightBtn, styles.backRightBtnRight]}
          >
            <Animated.View
              style={{
                alignItems: "center",
                transform: [{ translateX: scale }],
              }}
            >
              <Text style={{ color: "#fff" }}>
                {" "}
                {language ? "Delete" : "مسح"}{" "}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  };

  const handleSubmit = () => {
    if (search.length > 0) {
      const newSearch = {
        id: Math.random(),
        search,
      };
      actions({ type: "set_show", payload: false });
      actions({
        type: "add_search",
        payload: [...searchHistory, newSearch],
      });
    }
  };

  return (
    <View style={{ backgroundColor: darkMode ? "black" : "#fff", flex: 1 }}>
      <Search
        Search={"Search"}
        navigation={navigation}
        handleSubmit={handleSubmit}
      />
      {search.length > 0 ? (
        <>
          <Onchange navigation={navigation} />
        </>
      ) : (
        <>
          {!show ? (
            <Animated.View
              style={[
                translateX,
                {
                  flex: 1,
                  backgroundColor: darkMode ? "#080808" : "#fff",
                  justifyContent: "center",
                  alignContent: "center",
                },
              ]}
            >
              <ScrollView
                contentContainerStyle={{
                  flex: 1,
                  backgroundColor: darkMode ? "#080808" : "#fff",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      color: "gray",
                      fontSize: 20,
                      textAlign: "center",
                    }}
                  >
                    {language ? "Search for movies !" : "ابحث عن افلام !"}
                  </Text>
                </View>
              </ScrollView>
            </Animated.View>
          ) : (
            <Animated.View
              style={[
                translateY,
                {
                  flex: 1,
                  opacity: animatedOpacity,
                },
              ]}
            >
              {searchHistory.length > 0 ? (
                <View
                  style={[
                    styles.container,
                    { backgroundColor: darkMode ? "#080808" : "#fff" },
                  ]}
                >
                  <View
                    style={[
                      styles.header,
                      { backgroundColor: darkMode ? "#0f0f0f" : "#f7f7f7" },
                    ]}
                  >
                    <Text
                      style={{
                        color: darkMode ? "#e5e5e5" : "#0f0f0f",
                        fontSize: 18,
                        fontWeight: "500",
                      }}
                    >
                      {language ? "Recent searches" : "عمليات البحث الأخيرة"}
                    </Text>
                    <Animated.View
                      style={[
                        animatedWidth,
                        {
                          backgroundColor: darkMode ? "#7a7a7a" : "#a9a9a9",
                          //  justifyContent: "flex-end",
                          textAlign: "center",
                          flexDirection: "row",
                          height: 18,
                          borderRadius: remove ? "50%" : 15,
                        },
                      ]}
                    >
                      {remove ? (
                        <TouchableOpacity onPress={() => setRemove(false)}>
                          <Animated.View style={{ opacity: removeopacity }}>
                            <MaterialCommunityIcons
                              name="close"
                              color={"#fff"}
                              size={17}
                            />
                          </Animated.View>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            actions({ type: "add_search", payload: [] })
                          }
                        >
                          <View
                            style={{
                              paddingBottom: language ? null : 2,
                              paddingLeft: language ? null : 6,
                            }}
                          >
                            <Text
                              style={{
                                color: "#fff",
                              }}
                            >
                              {" "}
                              {language ? "Clear" : "مسح"}{" "}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </Animated.View>
                  </View>
                  <SwipeListView
                    rightOpenValue={-75}
                    disableRightSwipe
                    keyboardShouldPersistTaps="always"
                    keyboardDismissMode="on-drag"
                    data={searchHistory}
                    keyExtractor={(data) => data.id.toString()}
                    rightActivationValue={-250}
                    rightActionValue={-windowWidth}
                    onRightAction={handleRightaction}
                    renderItem={renderItem}
                    onRightActionStatusChange={handleLeftAction}
                    renderHiddenItem={renderHiddenItem}
                    //  onSwipeValueChange={onSwipeValueChange}
                    useNativeDriver={false}
                  />
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: darkMode ? "#080808" : "#fff",
                  }}
                >
                  <ScrollView>
                    <Text
                      style={{
                        color: "gray",
                        fontSize: 18,
                        letterSpacing: 1,
                        textAlign: "center",
                        marginTop: 20,
                        fontWeight: "300",
                      }}
                    >
                      {language
                        ? "Search by the movie title"
                        : "ابحث عن طريق عنوان الفيلم"}
                    </Text>
                  </ScrollView>
                </View>
              )}
            </Animated.View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  input: {
    paddingLeft: 10,
    fontSize: 16,
  },
  searchContainor: {
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",

    justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 18,
    height: 48,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  rowFront: {
    backgroundColor: "gray",
    height: 60,
    margin: 5,
    marginBottom: 15,
    elevation: 5,
  },
  rowBack: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    // justifyContent: "space-between",
    marginTop: 1,
    marginBottom: 1,
  },
  backRightBtn: {
    flexDirection: "row",
    width: 75,
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "red",
  },
  backRightBtnRight: {},
});
