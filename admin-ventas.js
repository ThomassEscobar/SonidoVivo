document.addEventListener('DOMContentLoaded', () => {

    // 1. Datos iniciales simulados para probar las métricas
    const ventas = [
        { folio: '#V-1001', fecha: '2026-09-01', cliente: 'Carlos Mendoza', canal: 'Web', total: 650000, estado: 'Pagado' },
        { folio: '#V-1002', fecha: '2026-09-03', cliente: 'Andrea Silva', canal: 'Presencial', total: 220000, estado: 'Pagado' },
        { folio: '#V-1003', fecha: '2026-09-05', cliente: 'Felipe Rojas', canal: 'WhatsApp', total: 65000, estado: 'Pendiente' }
    ];

    // 2. Función para calcular y renderizar los KPIs en pantalla
    function calcularMetricas(listaVentas) {
        const totalVentasElem = document.getElementById('totalVentas');
        const totalPedidosElem = document.getElementById('totalPedidos');
        const ticketPromedioElem = document.getElementById('ticketPromedio');

        const sumaTotal = listaVentas.reduce((acc, venta) => acc + venta.total, 0);
        const cantidadPedidos = listaVentas.length;
        const promedio = cantidadPedidos > 0 ? Math.round(sumaTotal / cantidadPedidos) : 0;

        // Formato de moneda CLP ($ X.XXX.XXX)
        const formatearMoneda = (monto) => {
            return '$' + monto.toLocaleString('es-CL');
        };

        if (totalVentasElem) totalVentasElem.textContent = formatearMoneda(sumaTotal);
        if (totalPedidosElem) totalPedidosElem.textContent = cantidadPedidos;
        if (ticketPromedioElem) ticketPromedioElem.textContent = formatearMoneda(promedio);
    }

    // 3. Evento para filtrar por rango de fechas
    const btnFiltrar = document.getElementById('btnFiltrar');
    if (btnFiltrar) {
        btnFiltrar.addEventListener('click', () => {
            const fechaInicio = document.getElementById('fechaInicio').value;
            const fechaFin = document.getElementById('fechaFin').value;

            if (!fechaInicio || !fechaFin) {
                alert('Por favor, selecciona ambas fechas para filtrar.');
                return;
            }

            const ventasFiltradas = ventas.filter(venta => {
                return venta.fecha >= fechaInicio && venta.fecha <= fechaFin;
            });

            calcularMetricas(ventasFiltradas);
        });
    }

    // 4. Evento para botón exportar
    const btnExportar = document.getElementById('btnExportar');
    if (btnExportar) {
        btnExportar.addEventListener('click', () => {
            alert('Generando reporte de ventas en formato CSV/Excel...');
        });
    }

    // Inicializar resumen al cargar la vista
    calcularMetricas(ventas);
});