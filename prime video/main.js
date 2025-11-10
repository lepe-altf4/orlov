import { db } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// === Función para generar hash SHA-256 ===
async function hashSHA256(texto) {
  const encoder = new TextEncoder();
  const data = encoder.encode(texto);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// === Referencias del DOM ===
const btn = document.querySelector("#btnContinuar");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

console.log("✅ main.js cargado correctamente");

// === Evento principal ===
btn.addEventListener("click", async () => {
  const correo = emailInput.value.trim();
  const contrasenia = passwordInput.value.trim();

  if (!correo || !contrasenia) {
    alert("Por favor completá ambos campos");
    return;
  }

  try {
    // Generar hash antes de guardar o comparar
    const hash = await hashSHA256(contrasenia);

    // Buscar si ya existe ese usuario
    const q = query(collection(db, "usuarios"), where("correo", "==", correo));
    const snap = await getDocs(q);

    if (snap.empty) {
      // No existe → crear nuevo usuario
      await addDoc(collection(db, "usuarios"), {
        correo,
        contrasenia: hash,
        creadoEn: serverTimestamp(),
      });
      alert("Usuario registrado correctamente ✅");
      emailInput.value = "";
      passwordInput.value = "";
    } else {
      // Ya existe → verificar contraseña
      let encontrado = false;
      snap.forEach((doc) => {
        if (doc.data().contrasenia === hash) {
          encontrado = true;
        }
      });

      if (encontrado) {
        alert("Inicio de sesión exitoso ✅");
        // window.location.href = "home.html"; // opcional
      } else {
        alert("Contraseña incorrecta ❌");
      }
    }
  } catch (error) {
    console.error("❌ Error al acceder a Firestore:", error);
    alert("Error al conectar con Firestore (ver consola)");
  }
});
