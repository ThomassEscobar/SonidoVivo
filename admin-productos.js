document.addEventListener('DOMContentLoaded', () => {

    // 1. Control del Modal
    const modal = document.getElementById('modalProducto');
    const btnNuevo = document.getElementById('btnNuevoProducto');
    const btnCancelar = document.getElementById('btnCancelarProducto');
    const formProducto = document.getElementById('formProducto');

    if (btnNuevo && modal) {
        btnNuevo.addEventListener('click', () => {
            formProducto.reset();
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

    // 2. Buscador y Filtro por Categoría
    const inputBuscar = document.getElementById('inputBuscarProducto');
    const selectCat = document.getElementById('selectCategoria');
    const filas = document.querySelectorAll('#tablaProductosBody tr');

    function filtrarProductos() {
        const texto = inputBuscar ? inputBuscar.value.toLowerCase() : '';
        const categoria = selectCat ? selectCat.value.toLowerCase() : '';

        filas.forEach(fila => {
            const codigo = fila.cells[0]?.textContent.toLowerCase() || '';
            const nombre = fila.cells[1]?.textContent.toLowerCase() || '';
            const catFila = fila.cells[2]?.textContent.toLowerCase() || '';

            const coincideTexto = codigo.includes(texto) || nombre.includes(texto);
            const coincideCat = categoria === '' || catFila.includes(categoria);

            fila.style.display = (coincideTexto && coincideCat) ? '' : 'none';
        });
    }

    if (inputBuscar) inputBuscar.addEventListener('input', filtrarProductos);
    if (selectCat) selectCat.addEventListener('change', filtrarProductos);

    // 3. Envío del Formulario
    if (formProducto) {
        formProducto.addEventListener('submit', (e) => {
            e.preventDefault();
            const codigo = document.getElementById('codigo').value;
            const nombre = document.getElementById('nombreProd').value;

            alert(`Producto "${nombre}" (${codigo}) guardado correctamente.`);
            modal.style.display = 'none';
            formProducto.reset();
        });
    }
});