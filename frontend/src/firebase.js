import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";



const firebaseConfig = {
  apiKey:import.meta.env.FIREBASE_API_KEY,
  authDomain:import.meta.env.AUTH_DOMAIN,
  projectId:import.meta.env.PROJECT_ID,
  storageBucket:import.meta.env.STORAGE_BUCKET,
  messagingSenderId:import.meta.env.MESSAGING_SENDERID,
  appId:import.meta.env.APP_ID,
  measurementId: import.meta.env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app)
const analytics = getAnalytics(app);






