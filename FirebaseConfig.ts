// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcWiu03WImktJnNEtHNk04DYRioHDvv0g",
  authDomain: "firstapp-d36a2.firebaseapp.com",
  projectId: "firstapp-d36a2",
  databaseURL: "https://firstapp-d36a2-default-rtdb.firebaseio.com",
  storageBucket: "firstapp-d36a2.appspot.com",
  messagingSenderId: "340986070524",
  appId: "1:340986070524:web:217fc9f042b038a926de79"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getDatabase(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);


export default FIREBASE_APP;