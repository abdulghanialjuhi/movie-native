import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons1 from "react-native-vector-icons/AntDesign";
import Context from "../context/Context";
import firebase from "firebase";

const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

const ShowWatchlist = ({
  navigation,
  poster_path,
  title,
  vote_average,
  id,
  movie1,
}) => {
  const handlepress = () => {
    navigation.navigate("Info", { id, movie1 });
  };
  const { actions, watchlist, darkMode } = useContext(Context);

  const user = firebase.auth().currentUser;

  // useEffect(() => {
  //   let isMounted = true;
  //   if (isMounted) {
  //     if (user) {
  //       firebase
  //         .database()
  //         .ref(`${user.uid}`)
  //         .on("value", (snapshot) => {
  //           snapshot.val()
  //             ? actions({
  //                 type: "add_watchlist",
  //                 payload: snapshot.val().watchlist,
  //               })
  //             : [];
  //         });
  //     }
  //   }
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  const handleremove = () => {
    Alert.alert(
      language ? "Are you sure" : "هل انت متأكد",
      language
        ? "you want to remove this movie from your watchlist"
        : "انك تريد ان تزيل هذا الفليم من قائمة المشاهدة",
      [
        {
          text: language ? "Yes" : "نعم",
          onPress: async () => {
            const remove = watchlist.filter((w) => w.id !== item.id);
            console.log("1");
            await actions({
              type: "add_watchlist",
              payload: remove,
            });
            console.log("2");
          },
          style: "destructive",
        },
        {
          text: language ? "Cancel" : "إلغاء",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          shadowColor: darkMode ? "gray" : "black",
          backgroundColor: darkMode ? "#191919" : "#fff",
        },
      ]}
    >
      <View>
        <TouchableOpacity onPress={handlepress}>
          <Image
            resizeMode="contain"
            style={{ width: 160, height: 239 }}
            source={{
              uri: IMAGE_URL + poster_path,
            }}
          />
          <View
            style={{
              padding: 9,
              height: "23%",
            }}
          >
            <View>
              <Text style={{ color: darkMode ? "#D8D8D8" : "black" }}>
                <MaterialCommunityIcons name="star" color="#ffd700" size={14} />{" "}
                {vote_average}{" "}
              </Text>
            </View>
            <View style={{ height: 20 }}>
              <Text
                style={[
                  styles.information,
                  { color: darkMode ? "#e5e5e5" : "black" },
                ]}
              >
                {" "}
                {title}{" "}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.removebuttin}
              onPress={handleremove}
            >
              <MaterialCommunityIcons1
                name="check"
                size={17}
                color={darkMode ? "#4285F4" : "#4285F4"}
              />
              <Text
                style={{
                  color: darkMode ? "#4285F4" : "#4285F4",
                  marginLeft: 4,
                }}
              >
                {" "}
                Watchlisted{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    margin: 10,
    width: 160,
    height: 330,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.0,
  },
  information: {
    color: "#e5e5e5",
    fontWeight: "700",
    fontSize: 13,
    marginTop: 5,
  },
  removebuttin: {
    marginTop: 8,
    flexDirection: "row",
    width: "100%",
    borderColor: "gray",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 3,
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ShowWatchlist;
