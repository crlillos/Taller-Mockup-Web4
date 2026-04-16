const botonesNav = document.querySelectorAll('.nav-btn');
const secciones = document.querySelectorAll('.seccion');

botonesNav.forEach(boton => {
    boton.addEventListener('click', () => {
        const destino = boton.dataset.target;

     
        botonesNav.forEach(b => b.classList.remove('active'));
        secciones.forEach(s => s.classList.remove('activa'));

       
        boton.classList.add('active');
        document.getElementById(destino).classList.add('activa');


        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

document.getElementById("calcularBtn").addEventListener("click", () => {
    const servicio = parseFloat(document.getElementById("servicio").value);
    const horas = parseFloat(document.getElementById("horas").value);
    const precioHora = parseFloat(document.getElementById("precioHora").value);

    if (servicio === 0) {
        alert("Selecciona un servicio válido");
        return;
    }

    const total = servicio + (horas * precioHora);
    document.getElementById("total").textContent = total.toFixed(2) + "€";
});


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".blog-card").forEach(card => {
    observer.observe(card);
});


 import { initializeApp } from "firebase/app";
  import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

  const firebaseConfig = {
    apiKey: "AIzaSyBHF9b1yQvd0qECUYgJPIaxWv0iN3qemjc",
    authDomain: "taller-mockup-web4.firebaseapp.com",
    projectId:"taller-mockup-web4",
    storageBucket: "taller-mockup-web4.firebasestorage.app",
    messagingSenderId: "782151136268",
    appId: "1:782151136268:web:fc0f9e2fccb8fcbc19aa29",
    measurementId: "G-HQDEGQVVH5"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  async function guardarEjemplo() {
    await addDoc(collection(db, "usuarios"), {
      nombre: "Juan",
      edad: 18
    });
  async function guardarEjemplo() {   
    await addDoc(collection(db, "usuarios"), {
    nombre: "Angel",
    edad: 24
  });
    console.log("Dato guardado");
  }
  async function leerEjemplo() {
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }
  guardarEjemplo();
  leerEjemplo();
