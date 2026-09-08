// Archivo: admin.js (Lógica para el Dashboard principal de Administración)
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navegación entre Pestañas/Secciones dentro de admin.html
    const navLinks = document.querySelectorAll('.sidebar nav a');
    const sections = document.querySelectorAll('.main-content section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').replace('#', '');
            
            // Si el enlace apunta a otra página (ej: admin-productos.html), deja que navegue normalmente
            if (link.getAttribute('href').includes('.html')) {
                return;
            }

            e.preventDefault();

            // Desactivar todos los enlaces y ocultar todas las secciones
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.style.display = 'none');

            // Activar el enlace presionado y mostrar la sección correspondiente
            link.classList.add('active');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });

    // 2. Simulación de carga de métricas y resumen (Dashboard)
    function cargarResumenDashboard() {
        // En el futuro, aquí harás fetch('http://localhost:8080/api/dashboard') a Spring Boot
        const resumenSimulado = {
            ventasTotales: "$1.450.000",
            pedidosPendientes: 4,
            productosAgotados: 2
        };

        const elemVentas = document.getElementById('metric-ventas');
        const elemPedidos = document.getElementById('metric-pedidos');
        const elemAgotados = document.getElementById('metric-agotados');

        if (elemVentas) elemVentas.textContent = resumenSimulado.ventasTotales;
        if (elemPedidos) elemPedidos.textContent = resumenSimulado.pedidosPendientes;
        if (elemAgotados) elemAgotados.textContent = resumenSimulado.productosAgotados;
    }

    cargarResumenDashboard();

    // 3. Manejo de Cierre de Sesión (Logout)
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            // Limpiar token de autenticación guardado en el navegador
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
            
            // Redireccionar a la pantalla de inicio de sesión
            window.location.href = 'login.html';
        });
    }
});