import * as firebase from "firebase";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBzwXFAIEvkz1iDmyyVLa8WDTAWi4YkAos",
  authDomain: "movie-log-in.firebaseapp.com",
  databaseURL: "https://movie-log-in-default-rtdb.firebaseio.com",
  projectId: "movie-log-in",
  storageBucket: "movie-log-in.appspot.com",
  messagingSenderId: "698838059357",
  appId: "1:698838059357:web:4662f533554172210380b4",
});

export const auth = app.auth();
export default app;
