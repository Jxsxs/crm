import { useState } from 'react';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { setCurrentUser } from '../redux/reducers/auth-reducer';
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBnVHiabkRt2zsfiS5eJOtu1y0-sYmKfa8",
  authDomain: "crmauth-bd927.firebaseapp.com",
  databaseURL: "https://crmauth-bd927-default-rtdb.firebaseio.com",
  projectId: "crmauth-bd927",
  storageBucket: "crmauth-bd927.appspot.com",
  messagingSenderId: "461028285050",
  appId: "1:461028285050:web:f265edff880009c60979c3"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
export const currentUser = auth.currentUser;

if (currentUser) {
const email = currentUser.email;
const uid = currentUser.uid;
setCurrentUser(uid, email)
} else {
}


export const signUp = async(e, email, password) => {
  e.preventDefault();
  const auth = getAuth();
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const email = user.email;
      setCurrentUser(uid, email);
    }
  } catch (error) {
  }
}

export const signIn = async(e,email, password) => {
  e.preventDefault();
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const email = user.email;
      setCurrentUser(uid, email);
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  }
}

export const logOut = async(dispatch)=> {
    try {
      await auth.signOut();
    } catch (error) {
    }
  }
