import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2Jm0rGW-JRMpdcOdvQDEPZwHp2dhejf4",
  authDomain: "whatsapp-web-clone-cb385.firebaseapp.com",
  projectId: "whatsapp-web-clone-cb385",
  storageBucket: "whatsapp-web-clone-cb385.appspot.com",
  messagingSenderId: "363136109258",
  appId: "1:363136109258:web:f33b7defcd86d223b00233",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
