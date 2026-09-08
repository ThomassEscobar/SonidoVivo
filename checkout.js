document.addEventListener('DOMContentLoaded', () => {

    // 1. Selección visual del método de pago
    const opcionesPago = document.querySelectorAll('.payment-option');
    
    opcionesPago.forEach(opcion => {
        opcion.addEventListener('click', () => {
            opcionesPago.forEach(o => o.classList.remove('active'));
            opcion.classList.add('active');
            
            const radio = opcion.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });

    // 2. Control del envío de la orden
    const formCheckout = document.getElementById('formCheckout');

    if (formCheckout) {
        formCheckout.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const metodoPago = document.querySelector('input[name="pago"]:checked')?.value;

            alert(`¡Gracias por tu compra, ${nombre}!\n\nHemos enviado un correo de confirmación a ${email}.\nMétodo seleccionado: ${metodoPago.toUpperCase()}`);
            
            // Redireccionar al inicio o catálogo
            window.location.href = 'index.html';
        });
    }
});