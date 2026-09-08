document.addEventListener('DOMContentLoaded', () => {

    // 1. Elementos del Modal
    const modal = document.getElementById('modalPedido');
    const btnCancelar = document.getElementById('btnCancelarPedido');
    const formPedido = document.getElementById('formPedido');
    const modalIdPedido = document.getElementById('modalIdPedido');
    const selectNuevoEstado = document.getElementById('nuevoEstado');
    const inputSeguimiento = document.getElementById('codigoSeguimiento');

    let filaSeleccionada = null;

    // 2. Evento al hacer clic en "Gestionar" en la tabla
    const botonesGestionar = document.querySelectorAll('.btn-gestionar');
    botonesGestionar.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filaSeleccionada = e.target.closest('tr');
            
            const idPedido = filaSeleccionada.cells[0].textContent;
            const estadoActual = filaSeleccionada.cells[4].textContent.trim();
            const seguimientoActual = filaSeleccionada.cells[5].textContent.trim();

            if (modalIdPedido) modalIdPedido.textContent = idPedido;
            if (selectNuevoEstado) selectNuevoEstado.value = estadoActual;
            if (inputSeguimiento) inputSeguimiento.value = seguimientoActual === '---' ? '' : seguimientoActual;

            modal.style.display = 'flex';
        });
    });

    // 3. Cerrar Modal
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

    // 4. Guardar Cambios del Pedido
    if (formPedido) {
        formPedido.addEventListener('submit', (e) => {
            e.preventDefault();

            if (filaSeleccionada) {
                const nuevoEstado = selectNuevoEstado.value;
                const nuevoSeguimiento = inputSeguimiento.value.trim() || '---';

                // Mapear clases de badge según estado
                let badgeClass = 'badge-warning';
                if (nuevoEstado === 'En Preparación') badgeClass = 'badge-info';
                if (nuevoEstado === 'Enviado') badgeClass = 'badge-primary';
                if (nuevoEstado === 'Entregado') badgeClass = 'badge-success';
                if (nuevoEstado === 'Cancelado') badgeClass = 'badge-danger';

                // Actualizar la fila de la tabla en tiempo real
                filaSeleccionada.cells[4].innerHTML = `<span class="badge ${badgeClass}">${nuevoEstado}</span>`;
                filaSeleccionada.cells[5].textContent = nuevoSeguimiento;

                alert('Estado del pedido actualizado correctamente.');
            }

            modal.style.display = 'none';
        });
    }

    // 5. Filtros y Búsqueda en tiempo real
    const inputBuscar = document.getElementById('inputBuscarPedido');
    const selectEstado = document.getElementById('selectEstadoPedido');
    const filasTabla = document.querySelectorAll('#tablaPedidosBody tr');

    function filtrarPedidos() {
        const busqueda = inputBuscar ? inputBuscar.value.toLowerCase() : '';
        const estadoFiltro = selectEstado ? selectEstado.value.toLowerCase() : '';

        filasTabla.forEach(fila => {
            const idPedido = fila.cells[0]?.textContent.toLowerCase() || '';
            const cliente = fila.cells[2]?.textContent.toLowerCase() || '';
            const estado = fila.cells[4]?.textContent.toLowerCase() || '';

            const coincideBusqueda = idPedido.includes(busqueda) || cliente.includes(busqueda);
            const coincideEstado = estadoFiltro === '' || estado.includes(estadoFiltro);

            fila.style.display = (coincideBusqueda && coincideEstado) ? '' : 'none';
        });
    }

    if (inputBuscar) inputBuscar.addEventListener('input', filtrarPedidos);
    if (selectEstado) selectEstado.addEventListener('change', filtrarPedidos);
});