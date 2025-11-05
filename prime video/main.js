// main.js
import { db } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Referencias al botón y al input
const btn = document.querySelector(".continue-btn");
const emailInput = document.querySelector("#email");

// Verificación de carga
console.log("✅ main.js cargado correctamente");

// Acción al presionar el botón
btn.addEventListener("click", async () => {
  const correo = emailInput.value.trim();

  if (!correo) {
    alert("Ingresá un correo antes de continuar");
    return;
  }

  try {
    // Guardar un nuevo documento en Firestore
    const ref = await addDoc(collection(db, "usuarios"), {
      correo: correo,
      creadoEn: serverTimestamp(),
    });

    console.log("✅ Usuario guardado con ID:", ref.id);
    alert("Usuario guardado correctamente en Firestore");
  } catch (error) {
    console.error("❌ Error al guardar:", error);
    alert("Error al escribir en Firestore (revisá consola)");
  }
});

// Test: lectura para confirmar conexión
async function testLectura() {
  console.log("🔍 Leyendo documentos existentes...");
  const snap = await getDocs(collection(db, "usuarios"));
  snap.forEach(doc => console.log(doc.id, "=>", doc.data()));
}
testLectura();
