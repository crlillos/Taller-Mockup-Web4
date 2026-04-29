const botonesNav = document.querySelectorAll('.nav-btn:not(.theme-btn)');
const secciones = document.querySelectorAll('.seccion');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });
}

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

            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
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

const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const sunIcon = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
const moonIcon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.innerHTML = moonIcon; 
} else {
    themeIcon.innerHTML = sunIcon;
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            themeIcon.innerHTML = sunIcon;
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.innerHTML = moonIcon;
        }
    });
}