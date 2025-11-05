// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANR5Gj3-yEnwKoJhZN14xDGfVvSaFyabc",
  authDomain: "prime-video-bbea9.firebaseapp.com",
  projectId: "prime-video-bbea9",
  storageBucket: "prime-video-bbea9.firebasestorage.app",
  messagingSenderId: "372197488917",
  appId: "1:372197488917:web:cfd0d39261de343b0c511c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);