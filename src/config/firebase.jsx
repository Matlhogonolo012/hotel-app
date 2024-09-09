// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyASLCxkner6cPZ7nu1bSmyLTrVlYJKD_h0",
  authDomain: "hotel-app-c98da.firebaseapp.com",
  projectId: "hotel-app-c98da",
  storageBucket: "hotel-app-c98da.appspot.com",
  messagingSenderId: "895739396530",
  appId: "1:895739396530:web:17bbeb942f999e396224ab",
  measurementId: "G-YMB6GSMXE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth;
export default {auth}