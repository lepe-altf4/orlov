// main.js
import { db } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Referencias
const btn = document.querySelector("#btnContinuar");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

console.log("✅ main.js cargado correctamente");

// Acción al presionar el botón
btn.addEventListener("click", async () => {
  const correo = emailInput.value.trim();
  const contraseña = passwordInput.value.trim();

  if (!correo || !contraseña) {
    alert("Por favor completá ambos campos.");
    return;
  }

  try {
    // Verificar si ya existe un usuario con ese correo
    const q = query(collection(db, "usuarios"), where("correo", "==", correo));
    const snap = await getDocs(q);

    if (!snap.empty) {
      alert("Ese usuario ya está registrado.");
      return;
    }

    // Guardar nuevo usuario
    const ref = await addDoc(collection(db, "usuarios"), {
      correo,
      contraseña,
      creadoEn: serverTimestamp(),
    });

    console.log("✅ Usuario guardado con ID:", ref.id);
    alert("Usuario registrado correctamente en Firestore");

    // Limpiar campos
    emailInput.value = "";
    passwordInput.value = "";

  } catch (error) {
    console.error("❌ Error al guardar:", error);
    alert("Error al escribir en Firestore (revisá consola)");
  }
});

// Test opcional para ver usuarios existentes
async function testLectura() {
  console.log("🔍 Leyendo usuarios existentes...");
  const snap = await getDocs(collection(db, "usuarios"));
  snap.forEach((doc) => console.log(doc.id, "=>", doc.data()));
}
testLectura();
