// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { createUserWithEmailAndPassword } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  // authDomain: "nextjswithfirebaseauth.firebaseapp.com",
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: "nextjswithfirebaseauth",
  storageBucket: "nextjswithfirebaseauth.appspot.com",
  messagingSenderId: "904610825122",
  appId: "1:904610825122:web:7d56445df312b909a9a8fb",
  measurementId: "G-4KLN20MK4R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);
  return currentUser;
}
