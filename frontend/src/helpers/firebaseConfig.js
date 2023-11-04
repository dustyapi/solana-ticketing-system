import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_API_KEY,
  authDomain: "solana-ticketing-system.firebaseapp.com",
  projectId: "solana-ticketing-system",
  storageBucket: "solana-ticketing-system.appspot.com",
  messagingSenderId: "732341201289",
  appId: "1:732341201289:web:315f773c607609aa055958",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
