import React, { createContext, useReducer, useEffect, useState } from "react";
import { movieReducer } from "./movieReducer";
import firebase from "firebase";

export const MovieContext = createContext();

const MovieContextProvider = (props) => {
  const user = firebase.auth().currentUser;

  // const [watchlist, dispatch] = useReducer(movieReducer, [], () => {
  //   let data;
  //   if (user) {
  //     console.log("ss");
  //     firebase
  //       .database()
  //       .ref(`${user.uid}`)
  //       .on("value", (snapshot) => {
  //         if (snapshot.val()) {
  //           // console.log(snapshot.val());
  //           console.log("sw");
  //           data = snapshot.val().watchlist;
  //         }
  //         return data;
  //       });

  //     return data;
  //   }
  //   console.log(data);
  //   return data;
  // });

  // useEffect(() => {
  //   if (user) {
  //     console.log("ss");
  //     firebase
  //       .database()
  //       .ref(`${user.uid}`)
  //       .on("value", (snapshot) => {
  //         if (snapshot.val()) {
  //           console.log(snapshot.val());
  //           console.log("sw");
  //           const watchlist1 = snapshot.val().watchlist;
  //           console.log("wa", watchlist1);
  //           dispatch({ type: "ADD_FROM_DATA", watchlist1 });
  //         }
  //       });
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log("w", watchlist);
  //   setTimeout(() => {
  //     if (user) {
  //       firebase.database().ref(`${user.uid}`).set({
  //         watchlist,
  //       });
  //     }
  //   }, 1000);
  // }, [watchlist]);

  return (
    <MovieContext.Provider value={{ watchlist, dispatch }}>
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
