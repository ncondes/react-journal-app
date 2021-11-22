// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBylQFUZCU2pJJWI0RZaaaaZ65yEFAKlis",
  authDomain: "react-journal-app-27571.firebaseapp.com",
  projectId: "react-journal-app-27571",
  storageBucket: "react-journal-app-27571.appspot.com",
  messagingSenderId: "893210686648",
  appId: "1:893210686648:web:34787e353ab0c41f0eb04d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
}