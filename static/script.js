
const botonesNav = document.querySelectorAll('.nav-btn');
const secciones = document.querySelectorAll('.seccion');

if (botonesNav.length > 0 && secciones.length > 0) {
    botonesNav.forEach(boton => {
        boton.addEventListener('click', () => {
            const destino = boton.dataset.target;
            

            if (!destino) return; 

            botonesNav.forEach(b => b.classList.remove('active'));
            secciones.forEach(s => s.classList.remove('activa'));

            boton.classList.add('active');
            const targetElement = document.getElementById(destino);
            if (targetElement) {
                targetElement.classList.add('activa');
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

const calcularBtn = document.getElementById("calcularBtn");
const horasInput = document.getElementById("horas");
const horasDisplay = document.getElementById("horas-display");

if (horasInput && horasDisplay) {
    horasInput.addEventListener("input", (e) => {
        horasDisplay.textContent = e.target.value + " h";
    });
}

if (calcularBtn) {
    calcularBtn.addEventListener("click", () => {
        const servicioElement = document.getElementById("servicio");
        const precioHoraElement = document.getElementById("precioHora");

        if (!servicioElement || !horasInput || !precioHoraElement) return;

        const servicio = parseFloat(servicioElement.value);
        const horas = parseFloat(horasInput.value);
        const precioHora = parseFloat(precioHoraElement.value);

        if (servicio === 0) {
            alert("Selecciona un servicio válido para calcular.");
            return;
        }

        const total = servicio + (horas * precioHora);
        document.getElementById("total").textContent = total.toFixed(2) + " €";
    });
}


const blogCards = document.querySelectorAll(".blog-card");

if (blogCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    blogCards.forEach(card => {
        observer.observe(card);
    });
}