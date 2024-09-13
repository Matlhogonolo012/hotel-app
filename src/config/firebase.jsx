import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASLCxkner6cPZ7nu1bSmyLTrVlYJKD_h0",
  authDomain: "hotel-app-c98da.firebaseapp.com",
  projectId: "hotel-app-c98da",
  storageBucket: "hotel-app-c98da.appspot.com",
  messagingSenderId: "895739396530",
  appId: "1:895739396530:web:17bbeb942f999e396224ab",
  measurementId: "G-YMB6GSMXE5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
export  {auth, db} 