// main.js
import { db } from "./firebaseConfig.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

async function test() {
  const snap = await getDocs(collection(db, "usuarios"));
  snap.forEach(doc => console.log(doc.id, "=>", doc.data()));
}

test();
