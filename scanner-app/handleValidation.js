import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.EXPO_FIREBASE_API_KEY,
  authDomain: "solana-ticketing-system.firebaseapp.com",
  projectId: "solana-ticketing-system",
  storageBucket: "solana-ticketing-system.appspot.com",
  messagingSenderId: "732341201289",
  appId: "1:732341201289:web:315f773c607609aa055958",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const checkIfStringExists = async (data) => {
  try {
    const q = query(collection(db, "qrHashes"), where("hash", "==", data));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      const documentData = querySnapshot.docs[0].data();
      const hash = documentData.hash;
      const mint = documentData.mintId;
      const visited = documentData.visited;
      const name = documentData.name;
      return { exists: true, hash, mint, visited, name };
    } else {
      return { exists: false };
    }
  } catch (error) {
    console.error("Error checking if string exists:", error);
    return { exists: false };
  }
};
export const updateVisitedField = async (hash, mintId) => {
  try {
    const q = query(
      collection(db, "qrHashes"),
      where("hash", "==", hash),
      where("mintId", "==", mintId)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      const qrHashRef = doc(db, "qrHashes", docId);
      await updateDoc(qrHashRef, { visited: true });
      console.log("Visited field updated to true for:", mintId);
    }
  } catch (error) {
    console.error("Error updating visited field:", error);
  }
};
export const getAllValidatedQR = async () => {
  try {
    const q = query(collection(db, "qrHashes"), where("visited", "==", true));
    const querySnapshot = await getDocs(q);
    const validatedQRList = [];

    querySnapshot.forEach((doc) => {
      const documentData = doc.data();
      const hash = documentData.hash;
      const mint = documentData.mintId;
      const visited = documentData.visited;
      const name = documentData.name;
      const email=documentData.email;
      validatedQRList.push({ hash, mint, visited, name ,email});
    });

    return validatedQRList;
  } catch (error) {
    console.error("Error fetching validated QR codes:", error);
    return [];
  }
};

