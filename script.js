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

const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const sliderHoras = document.getElementById('horas');
const displayHoras = document.getElementById('horas-display');

sliderHoras.addEventListener('input', (e) => {
    displayHoras.textContent = e.target.value + " h";
});

document.getElementById("calcularBtn").addEventListener("click", () => {
    const servicio = parseFloat(document.getElementById("servicio").value);
    const horas = parseFloat(document.getElementById("horas").value);
    const precioHora = parseFloat(document.getElementById("precioHora").value);

    if (servicio === 0) {
        alert("Por favor, selecciona un tipo de intervención primero.");
        return;
    }

    const total = servicio + (horas * precioHora);
    document.getElementById("total").textContent = total.toFixed(2).replace('.', ',') + " €";
});