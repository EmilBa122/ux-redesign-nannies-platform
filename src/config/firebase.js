import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyALd6eTd6zeON9EjIZP1bCETRsJiXRkgbA",
    authDomain: "eamergasia3-3c65b.firebaseapp.com",
    projectId: "eamergasia3-3c65b",
    storageBucket: "eamergasia3-3c65b.firebasestorage.com",
    messagingSenderId: "162170181294",
    appId: "1:162170181294:web:35a20f8470178e570ebf3f",
    measurementId: "G-VENW1TE64F"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

// Set Persistence
FIREBASE_AUTH.setPersistence(browserLocalPersistence)
    .catch((error) => console.error("Error setting persistence:", error));

// Initialize Firestore
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

// console.log("Firebase App:", FIREBASE_APP);
// console.log("Firebase Auth:", FIREBASE_AUTH);
// console.log("Firebase Firestore:", FIREBASE_DB);