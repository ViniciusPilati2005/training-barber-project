import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuizoGJcztGVVdJZDyvxsy07akbukY8E0",
  authDomain: "training-web-96b5a.firebaseapp.com",
  projectId: "training-web-96b5a",
  storageBucket: "training-web-96b5a.appspot.com",
  messagingSenderId: "305085251064",
  appId: "1:305085251064:web:8c31dc4c41e77fae626a0d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
