document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modalProducto');
    const btnNuevo = document.getElementById('btnNuevoProducto');
    const btnCancelar = document.getElementById('btnCancelar');

    // Apertura y cierre del Modal de Productos
    if (btnNuevo && modal) {
        btnNuevo.addEventListener('click', () => {
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

    // Filtros de la tabla de inventario
    const searchInput = document.querySelector('.search-box input');
    const categorySelect = document.querySelector('.search-box select');
    const tableRows = document.querySelectorAll('table tbody tr');

    function filterTable() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedCategory = categorySelect ? categorySelect.value.toLowerCase() : '';

        tableRows.forEach(row => {
            const code = row.cells[0]?.textContent.toLowerCase() || '';
            const name = row.cells[1]?.textContent.toLowerCase() || '';
            const category = row.cells[2]?.textContent.toLowerCase() || '';

            const matchesSearch = code.includes(searchTerm) || name.includes(searchTerm);
            const matchesCategory = selectedCategory === '' || category.includes(selectedCategory);

            row.style.display = (matchesSearch && matchesCategory) ? '' : 'none';
        });
    }

    if (searchInput) searchInput.addEventListener('input', filterTable);
    if (categorySelect) categorySelect.addEventListener('change', filterTable);
});