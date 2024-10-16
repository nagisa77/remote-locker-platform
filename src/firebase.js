// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase, ref, set, get, child, push, onValue } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgLBH7BXA9mPiiwX7xkDb4LN8PqxKk288",
  authDomain: "remotelocker-e2e68.firebaseapp.com",
  databaseURL: "https://remotelocker-e2e68-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "remotelocker-e2e68",
  storageBucket: "remotelocker-e2e68.appspot.com",
  messagingSenderId: "112977761793",
  appId: "1:112977761793:web:50136a6c361c1dc9159200",
  measurementId: "G-5GSEJVTEEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app, "https://remotelocker-e2e68-default-rtdb.asia-southeast1.firebasedatabase.app");
const analytics = getAnalytics(app);

export { auth, provider, signInWithPopup, database, ref, set, get, child, push, onValue, analytics };
