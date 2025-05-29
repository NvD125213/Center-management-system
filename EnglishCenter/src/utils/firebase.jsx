// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5p20FzxIQk3-hOPx4pvsBmEM6UblYphM",
  authDomain: "english-center-project-v2.firebaseapp.com",
  projectId: "english-center-project-v2",
  storageBucket: "english-center-project-v2.firebasestorage.app",
  messagingSenderId: "49493926987",
  appId: "1:49493926987:web:a6e039a3cd807be4d9d9ce",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const providerGG = new GoogleAuthProvider();
