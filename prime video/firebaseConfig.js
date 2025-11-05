// firebaseConfig.js (CDN / navegador)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyANR5Gj3-yEnwKoJhZN14xDGfVvSaFyabc",
  authDomain: "prime-video-bbea9.firebaseapp.com",
  projectId: "prime-video-bbea9",
  storageBucket: "prime-video-bbea9.appspot.com",   
  messagingSenderId: "372197488917",
  appId: "1:372197488917:web:cfd0d39261de343b0c511c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
