
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


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const auth = getAuth();
