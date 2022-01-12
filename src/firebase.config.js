// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqR2XcD5F1ThHwwJ3WObd4ideHeoRdko4",
  authDomain: "house-marketplace-app-9f008.firebaseapp.com",
  projectId: "house-marketplace-app-9f008",
  storageBucket: "house-marketplace-app-9f008.appspot.com",
  messagingSenderId: "436701146783",
  appId: "1:436701146783:web:2b57c4ab960b716af17caa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();