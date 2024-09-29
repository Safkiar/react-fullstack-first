
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey:   
 "AIzaSyBfgWcvXA8ezbpFiRUm4f7G5jUnDuQaC14",
  authDomain: "house-marketplace-app-bcdfd.firebaseapp.com",
  projectId: "house-marketplace-app-bcdfd",
  storageBucket: "house-marketplace-app-bcdfd.appspot.com",
  messagingSenderId: "714572676257",
  appId: "1:714572676257:web:1a26105f67396f2f0344e0"
};

const app = initializeApp(firebaseConfig); // Initialize the Firebase App

export const db = getFirestore(app); 