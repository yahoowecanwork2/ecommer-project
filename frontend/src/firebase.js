// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgK3V_g3rPAF2mEywej-7CSD3nEZizUv4",
  authDomain: "ecommerce-59905.firebaseapp.com",
  projectId: "ecommerce-59905",
  storageBucket: "ecommerce-59905.firebasestorage.app",
  messagingSenderId: "753504773892",
  appId: "1:753504773892:web:98096577a3855f3ea7d251",
  measurementId: "G-XJ2DKE46NF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth  = getAuth(app)