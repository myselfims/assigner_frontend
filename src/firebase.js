// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOLGUl7jWdwiHJDhqk5q0RkFbkCx1Txn4",
  authDomain: "assignerwebsite.firebaseapp.com",
  projectId: "assignerwebsite",
  storageBucket: "assignerwebsite.appspot.com",
  messagingSenderId: "728247751812",
  appId: "1:728247751812:web:9d62106e81fc90d0d1ded1",
  measurementId: "G-2X1RLRMDVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)