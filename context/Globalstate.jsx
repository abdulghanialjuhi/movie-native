import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
import { firebaseConfig } from "../config";
import firebase from "firebase";

const user = firebase.auth().currentUser;

//console.log(firebase);
const initialstate = {
  watchlist: firebase.auth().currentUser
    ? firebase
        .database()
        .ref(`${firebase.auth().currentUser.uid}`)
        .on("value", (snapshot) => {
          console.log(snapshot.val());
          snapshot.val() ? snapshot.val().movies : console.log("ss");
        })
    : [],
};

export const GlobalContext = createContext(initialstate);

export const Globalprovider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialstate);

  const user = firebase.auth().currentUser;

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (user) {
        firebase.database().ref(`${user.uid}`).set({
          movies: state.watchlist,
        });
      }
    }
    return () => {
      isMounted = false;
    };
  }, [state]);
  const addMovieToWatchlist = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };
  return (
    <GlobalContext.Provider
      value={{ watchlist: state.watchlist, addMovieToWatchlist }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
