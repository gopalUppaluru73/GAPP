// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQTaGnJYM4T6uPBt6-w8wKb71OPQcaRSY",
  authDomain: "restaurantapp-5ba92.firebaseapp.com",
  databaseURL: "https://restaurantapp-5ba92-default-rtdb.firebaseio.com",
  projectId: "restaurantapp-5ba92",
  storageBucket: "restaurantapp-5ba92.appspot.com",
  messagingSenderId: "1065930208646",
  appId: "1:1065930208646:web:94a8fb1a7aae06b3476807"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);