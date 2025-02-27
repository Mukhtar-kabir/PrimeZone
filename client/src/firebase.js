// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "primezone-8fa23.firebaseapp.com",
  projectId: "primezone-8fa23",
  storageBucket: "primezone-8fa23.firebasestorage.app",
  messagingSenderId: "264609471840",
  appId: "1:264609471840:web:973c33966966235b8c1205",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
