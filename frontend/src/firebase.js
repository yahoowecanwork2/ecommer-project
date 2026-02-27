import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";



// const firebaseConfig = {
//   apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain:import.meta.env.VITE_AUTH_DOMAIN,
//   projectId:import.meta.env.VITE_PROJECT_ID,
//   storageBucket:import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId:import.meta.env.VITE_MESSAGING_SENDERID,
//   appId:import.meta.env.VITE_APP_ID,
//   measurementId: import.meta.env.VITE_MEASUREMENT_ID,
// };


const firebaseConfig = {
  apiKey: "AIzaSyDgK3V_g3rPAF2mEywej-7CSD3nEZizUv4",
  authDomain: "ecommerce-59905.firebaseapp.com",
  projectId: "ecommerce-59905",
  storageBucket: "ecommerce-59905.firebasestorage.app",
  messagingSenderId: "753504773892",
  appId: "1:753504773892:web:605b87112ab308a0a7d251",
  measurementId: "G-ZYF9X9HYY5"
};

const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app)






