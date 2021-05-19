import { useState, useEffect, useRef } from "react";
import firebase from "firebase";
import { AsyncStorage, Animated } from "react-native";
import { Appearance } from "react-native-appearance";

const useGlobalstate = () => {
  const colorScheme = Appearance.getColorScheme();

  const user = firebase.auth().currentUser;
  const [state, setState] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [darkMode, setDarkMood] = useState(false);
  const [deviceMode, setDeviceMode] = useState(false);
  const [show, setShow] = useState(false);
  const [isloaded, setIsloaded] = useState(false);
  const [language, setLanguage] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");

  // const isMountedRef = useRef(false);
  // const isMountedRef2 = useRef(false);
  const [search, setSearch] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [method, setMethod] = useState(true);
  const actions = (action) => {
    const { type, payload } = action;

    switch (type) {
      case "setState":
        return setState(payload);
      case "add_watchlist":
        return setWatchlist(payload);
      case "set_dark":
        return setDarkMood(payload);
      case "set_show":
        return setShow(payload);
      case "set_search":
        return setSearch(payload);
      case "add_search":
        return setSearchHistory(payload);
      case "set_language":
        return setLanguage(payload);
      case "set_image":
        return setProfileImage(payload);
      case "set_name":
        return setName(payload);
      case "set_deviceMode":
        return setDeviceMode(payload);
      default:
        return state, watchlist, searchHistory;
    }
  };

  // useEffect(() => {
  //   if (deviceMode) {
  //     if(colorScheme === 'dark') {
  //       actions({type: 'set_dark', payload: true})
  //     }
  //   }
  // }, [deviceMode]);
  const getFromStorage = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem("Search"));

      if (value !== null) {
        actions({
          type: "add_search",
          payload: value,
        });
      }
    } catch (err) {
      alert("wrong");
    }

    //  console.log(searchHistory, "search");
  };

  useEffect(() => {
    //  isMountedRef.current = true;
    if (method) {
      getFromStorage();
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase
            .database()
            .ref(user.uid)
            .once("value")
            .then((snapshot) => {
              snapshot.val()
                ? snapshot.val().watchlist
                  ? actions({
                      type: "add_watchlist",
                      payload: snapshot.val().watchlist,
                    })
                  : []
                : null;
            });

          firebase
            .database()
            .ref(user.uid)
            .once("value")
            .then((snapshot) => {
              snapshot.val()
                ? snapshot.val().image
                  ? actions({
                      type: "set_image",
                      payload: snapshot.val().image,
                    })
                  : null
                : null;
            });
        }
      });

      setIsloaded(true);
    }
    return () => {
      setMethod(false);
    };
  }, []);

  const addToStorage = async () => {
    if (isloaded) {
      try {
        await AsyncStorage.setItem("Search", JSON.stringify(searchHistory));
      } catch (err) {
        alert(err);
      }
    }
  };

  useEffect(() => {
    addToStorage();
  }, [searchHistory]);

  useEffect(() => {
    let mounted = true;
    if (isloaded) {
      if (mounted) {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            firebase.database().ref(user.uid).set({
              watchlist,
              image: profileImage,
            });
          }
        });
      }
    }

    return () => {
      mounted = true;
    };
  }, [watchlist]);

  useEffect(() => {
    let mounted = true;
    if (isloaded) {
      if (mounted) {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            firebase.database().ref(user.uid).set({
              watchlist,
              image: profileImage,
            });
          }
        });
      }
    }

    return () => {
      mounted = true;
    };
  }, [profileImage]);

  return {
    state,
    watchlist,
    darkMode,
    show,
    search,
    searchHistory,
    language,
    profileImage,
    name,
    deviceMode,
    actions,
  };
};

export default useGlobalstate;
