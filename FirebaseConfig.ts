// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcWiu03WImktJnNEtHNk04DYRioHDvv0g",
  authDomain: "firstapp-d36a2.firebaseapp.com",
  projectId: "firstapp-d36a2",
  storageBucket: "firstapp-d36a2.appspot.com",
  messagingSenderId: "340986070524",
  appId: "1:340986070524:web:217fc9f042b038a926de79"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);