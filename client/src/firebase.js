// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-ccd1f.firebaseapp.com",
  projectId: "mern-auth-ccd1f",
  storageBucket: "mern-auth-ccd1f.firebasestorage.app",
  messagingSenderId: "586935660739",
  appId: "1:586935660739:web:71d544bb0a1622fbbf7276",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
