document.addEventListener('DOMContentLoaded', () => {

    // 1. Control del Modal (Abrir/Cerrar)
    const modal = document.getElementById('modalUsuario');
    const btnNuevo = document.getElementById('btnNuevoUsuario');
    const btnCancelar = document.getElementById('btnCancelarUsuario');
    const formUsuario = document.getElementById('formUsuario');

    if (btnNuevo && modal) {
        btnNuevo.addEventListener('click', () => {
            formUsuario.reset();
            modal.style.display = 'flex';
        });
    }

    if (btnCancelar && modal) {
        btnCancelar.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 2. Buscador y Filtro por Rol en tiempo real
    const inputBuscar = document.getElementById('inputBuscarUsuario');
    const selectRol = document.getElementById('selectRol');
    const filas = document.querySelectorAll('#tablaUsuariosBody tr');

    function filtrarTabla() {
        const textoBusqueda = inputBuscar ? inputBuscar.value.toLowerCase() : '';
        const rolSeleccionado = selectRol ? selectRol.value.toLowerCase() : '';

        filas.forEach(fila => {
            const nombre = fila.cells[1]?.textContent.toLowerCase() || '';
            const email = fila.cells[2]?.textContent.toLowerCase() || '';
            const rol = fila.cells[4]?.textContent.toLowerCase() || '';

            const coincideBusqueda = nombre.includes(textoBusqueda) || email.includes(textoBusqueda);
            const coincideRol = rolSeleccionado === '' || rol.includes(rolSeleccionado);

            fila.style.display = (coincideBusqueda && coincideRol) ? '' : 'none';
        });
    }

    if (inputBuscar) inputBuscar.addEventListener('input', filtrarTabla);
    if (selectRol) selectRol.addEventListener('change', filtrarTabla);

    // 3. Envío del Formulario (Guardar usuario)
    if (formUsuario) {
        formUsuario.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const rol = document.getElementById('rol').value;

            alert(`Usuario "${nombre}" (${email}) registrado con rol ${rol} exitosamente.`);
            modal.style.display = 'none';
            formUsuario.reset();
        });
    }
});