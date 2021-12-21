import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { useState } from "react";
import db from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const handleNew = async (title, codeSnippet, description) => {
  const auth = getAuth();

  const collectionRef = collection(db, "post");

  const payload = {
    title: title,
    codeSnippet: codeSnippet,
    description: description,
    timestamp: serverTimestamp(),
    user: auth.currentUser?.uid,
    displayName: auth.currentUser?.displayName,
  };
  const docRef = await addDoc(collectionRef, payload);
  // console.log(auth.currentUser.uid);
  // console.log("The new ID is: " + docRef.id);
  // console.log("The user ID is: " + currentUser.uid);
};

export const handleEdit = async (id, title, codeSnippet, description) => {
  // const name = prompt("Enter color name");
  // const value = prompt("Enter color value");
  // console.log(value);
  const docRef = doc(db, "post", id);

  const payload = {
    title: title,
    codeSnippet: codeSnippet,
    description: description,
    timestamp: serverTimestamp(),
  };

  updateDoc(docRef, payload);
};

export const handleDelete = async (id) => {
  const docRef = doc(db, "post", id);
  await deleteDoc(docRef);
};

// export const handleQueryDelete = async (id) => {
//   const userInputName = prompt("Enter color name");
//   const collectionRef = collection(db, "post");
//   const q = query(collectionRef, where("name", "==", userInputName));

//   const snapshot = await getDocs(q);
//   const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//   results.forEach(async (result) => {
//     const docRef = doc(db, "post", result.id);
//     await deleteDoc(docRef);
//   });
// };
