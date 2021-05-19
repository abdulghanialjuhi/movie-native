import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentuser] = useState();

  const [loading, setLoading] = useState(true);
  const [inisilaized, setInisilaized] = useState(true);
  async function signup(email, password, name) {
    await auth.createUserWithEmailAndPassword(email, password);
    auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function forgotPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updateName(name) {
    return auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    let method = true;

    auth.onAuthStateChanged(async (user) => {
      if (method) {
        await setCurrentuser(user);
        await setLoading(false);
        if (inisilaized) setInisilaized(false);
      }
    });

    // return unsubscribe;

    return () => (method = false);
  }, []);
  const value = {
    currentUser,
    inisilaized,
    signup,
    login,
    forgotPassword,
    updateEmail,
    updatePassword,
    updateName,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
