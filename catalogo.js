/* =========================================================
   SONIDO VIVO - CATALOGO.JS
   Catálogo dinámico cargado con datos reales de la tienda
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // BASE DE DATOS REAL (51 PRODUCTOS EXCEL SONIDO VIVO)
    // =====================================================
    const productosBase = [
        // Guitarras Acústicas
        { codigo: "GA001", categoria: "Guitarras Acústicas", nombre: "Guitarra Acústica Folk", marca: "Yamaha", modelo: "F310", precio: 129990, stock: 8, descripcion: "Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes.", destacado: true },
        { codigo: "GA002", categoria: "Guitarras Acústicas", nombre: "Guitarra Acústica Dreadnought", marca: "Fender", modelo: "CD-60S", precio: 189990, stock: 5, descripcion: "Tapa de abeto macizo, brazo de caoba. Sonido cálido y proyectado.", destacado: true },
        { codigo: "GA003", categoria: "Guitarras Acústicas", nombre: "Guitarra Acústica Clásica 4/4", marca: "Yamaha", modelo: "C40", precio: 89990, stock: 10, descripcion: "Nailon, tapa de abeto. Ideal para estudio y flamenco.", destacado: true },
        { codigo: "GA004", categoria: "Guitarras Acústicas", nombre: "Guitarra Electroacústica", marca: "Takamine", modelo: "GN20CE", precio: 349990, stock: 3, descripcion: "Pickup integrado, afinador incorporado.", destacado: true },
        { codigo: "GA005", categoria: "Guitarras Acústicas", nombre: "Guitarra 3/4 Niños", marca: "Yamaha", modelo: "JR1", precio: 79990, stock: 6, descripcion: "Tamaño reducido para niños de 6 a 10 años." },

        // Guitarras Eléctricas
        { codigo: "GE001", categoria: "Guitarras Eléctricas", nombre: "Guitarra Eléctrica Stratocaster", marca: "Squier", modelo: "Affinity Strat", precio: 249990, stock: 5, descripcion: "Cuerpo de álamo, mástil de arce, pastillas SSS." },
        { codigo: "GE002", categoria: "Guitarras Eléctricas", nombre: "Guitarra Eléctrica Les Paul", marca: "Epiphone", modelo: "Les Paul Std", precio: 329990, stock: 4, descripcion: "Cuerpo caoba, tapa arce, pastillas humbucker." },
        { codigo: "GE003", categoria: "Guitarras Eléctricas", nombre: "Guitarra Eléctrica SG", marca: "Epiphone", modelo: "SG Standard", precio: 319990, stock: 3, descripcion: "Cuerpo caoba, mástil caoba, 2 humbuckers." },
        { codigo: "GE004", categoria: "Guitarras Eléctricas", nombre: "Guitarra Eléctrica Telecaster", marca: "Squier", modelo: "Affinity Tele", precio: 239990, stock: 4, descripcion: "Cuerpo álamo, clavijero vintage, 2 pastillas single." },
        { codigo: "GE005", categoria: "Guitarras Eléctricas", nombre: "Guitarra Eléctrica Semi-hollow", marca: "Epiphone", modelo: "ES-335", precio: 549990, stock: 2, descripcion: "Semi-hueca, 2 humbuckers, ideal para jazz y blues." },

        // Bajos Eléctricos
        { codigo: "BA001", categoria: "Bajos Eléctricos", nombre: "Bajo Eléctrico 4 Cuerdas", marca: "Squier", modelo: "Affinity PJ", precio: 299990, stock: 5, descripcion: "Pickup PJ, cuerpo álamo, mástil arce." },
        { codigo: "BA002", categoria: "Bajos Eléctricos", nombre: "Bajo Eléctrico Jazz Bass", marca: "Fender", modelo: "Player Jazz", precio: 699990, stock: 2, descripcion: "Alder body, 2 Alnico V Jazz single-coil." },
        { codigo: "BA003", categoria: "Bajos Eléctricos", nombre: "Bajo Acústico 4 Cuerdas", marca: "Yamaha", modelo: "APX700II", precio: 429990, stock: 2, descripcion: "Electroacústico, afinador incorporado." },

        // Baterías
        { codigo: "BT001", categoria: "Baterías", nombre: "Batería Acústica 5 piezas", marca: "Pearl", modelo: "Roadshow", precio: 599990, stock: 2, descripcion: "Incluye stands, platillos y pedal de bombo." },
        { codigo: "BT002", categoria: "Baterías", nombre: "Batería Electrónica 8 pads", marca: "Roland", modelo: "TD-02KV", precio: 799990, stock: 2, descripcion: "Módulo TD-02, 8 pads de goma, pedal hi-hat." },
        { codigo: "BT003", categoria: "Baterías", nombre: "Caja Snare 14\"", marca: "Pearl", modelo: "STE1450", precio: 89990, stock: 4, descripcion: "Acero, 14x5\", 10 tensores." },
        { codigo: "BT004", categoria: "Baterías", nombre: "Platillo Hi-Hat 14\"", marca: "Zildjian", modelo: "A Series", precio: 149990, stock: 3, descripcion: "Latón B20, sonido brillante y claro." },
        { codigo: "BT005", categoria: "Baterías", nombre: "Platillo Crash 16\"", marca: "Zildjian", modelo: "A Series", precio: 129990, stock: 3, descripcion: "Latón B20, ataque rápido." },

        // Teclados y Pianos
        { codigo: "TC001", categoria: "Teclados y Pianos", nombre: "Teclado Digital 61 teclas", marca: "Yamaha", modelo: "PSR-E373", precio: 249990, stock: 4, descripcion: "Sensible a la velocidad, 622 voces." },
        { codigo: "TC002", categoria: "Teclados y Pianos", nombre: "Piano Digital 88 teclas", marca: "Yamaha", modelo: "P-45", precio: 499990, stock: 2, descripcion: "Mecanismo Graded Hammer Standard (GHS)." },
        { codigo: "TC003", categoria: "Teclados y Pianos", nombre: "Sintetizador 49 teclas", marca: "Arturia", modelo: "MiniLab MKII", precio: 129990, stock: 5, descripcion: "Teclas delgadas, 8 pads RGB, 16 encoders." },
        { codigo: "TC004", categoria: "Teclados y Pianos", nombre: "Teclado MIDI 88 teclas", marca: "M-Audio", modelo: "Hammer 88", precio: 399990, stock: 2, descripcion: "Teclas contrapesadas de acción martillo." },

        // Amplificadores
        { codigo: "AM001", categoria: "Amplificadores", nombre: "Amplificador Guitarra 15W", marca: "Fender", modelo: "Frontman 15G", precio: 99990, stock: 5, descripcion: "2 canales, ecualizador de 3 bandas." },
        { codigo: "AM002", categoria: "Amplificadores", nombre: "Amplificador Guitarra 40W", marca: "Marshall", modelo: "MG40GFX", precio: 299990, stock: 3, descripcion: "Efectos digitales integrados, canal limpio/overdrive." },
        { codigo: "AM003", categoria: "Amplificadores", nombre: "Amplificador Bajo 100W", marca: "Hartke", modelo: "HD100", precio: 449990, stock: 2, descripcion: "Altavoz HyDrive de 15 pulgadas." },
        { codigo: "AM004", categoria: "Amplificadores", nombre: "Amplificador Acústico 40W", marca: "Fishman", modelo: "Loudbox Mini", precio: 499990, stock: 2, descripcion: "Canal de micrófono y guitarra, conectividad Bluetooth." },

        // Micrófonos
        { codigo: "MI001", categoria: "Micrófonos", nombre: "Micrófono Dinámico Cardioide", marca: "Shure", modelo: "SM58", precio: 149990, stock: 8, descripcion: "Patrón polar cardioide, estándar mundial en vivo." },
        { codigo: "MI002", categoria: "Micrófonos", nombre: "Micrófono Dinámico Instrumento", marca: "Shure", modelo: "SM57", precio: 139990, stock: 6, descripcion: "Excelente respuesta para instrumentos y percusión." },
        { codigo: "MI003", categoria: "Micrófonos", nombre: "Micrófono Condensador", marca: "Audio-Tech.", modelo: "AT2020", precio: 199990, stock: 4, descripcion: "Condensador de estudio con diafragma de reducida masa." },
        { codigo: "MI004", categoria: "Micrófonos", nombre: "Micrófono USB de Condensador", marca: "Blue", modelo: "Yeti", precio: 299990, stock: 5, descripcion: "Múltiples patrones polares seleccionables, USB." },

        // Pedales de Efectos
        { codigo: "PE001", categoria: "Pedales de Efectos", nombre: "Pedal Distorsión", marca: "Boss", modelo: "DS-1", precio: 79990, stock: 7, descripcion: "Distorsión clásica analógica para guitarra." },
        { codigo: "PE002", categoria: "Pedales de Efectos", nombre: "Pedal Reverb", marca: "Boss", modelo: "RV-6", precio: 179990, stock: 4, descripcion: "Procesamiento DSP de última generación con 8 modos." },
        { codigo: "PE003", categoria: "Pedales de Efectos", nombre: "Pedal Multi-efectos", marca: "Boss", modelo: "ME-80", precio: 349990, stock: 2, descripcion: "Multiefectos compacto con simulación de amplificadores COSM." },
        { codigo: "PE004", categoria: "Pedales de Efectos", nombre: "Pedal Tuner Cromático", marca: "Boss", modelo: "TU-3", precio: 89990, stock: 8, descripcion: "Afinador de formato pedal ultra preciso." },
        { codigo: "PE005", categoria: "Pedales de Efectos", nombre: "Pedal Delay", marca: "MXR", modelo: "Carbon Copy", precio: 179990, stock: 4, descripcion: "Delay analógico con circuito BBD." },
        { codigo: "PE006", categoria: "Pedales de Efectos", nombre: "Pedal Overdrive", marca: "Ibanez", modelo: "TS9", precio: 99990, stock: 6, descripcion: "El legendario pedal Tube Screamer." },

        // Accesorios
        { codigo: "AC001", categoria: "Accesorios", nombre: "Cuerdas Guitarra Eléctrica 09-42", marca: "Ernie Ball", modelo: "Super Slinky", precio: 8990, stock: 25, descripcion: "Níquel entorchado, calibre súper ligero." },
        { codigo: "AC002", categoria: "Accesorios", nombre: "Cuerdas Guitarra Acústica 12-53", marca: "Ernie Ball", modelo: "Earthwood", precio: 10990, stock: 20, descripcion: "Bronce 80/20, tono brillante y rico." },
        { codigo: "AC003", categoria: "Accesorios", nombre: "Cuerdas Bajo 45-105", marca: "Ernie Ball", modelo: "Regular Slinky", precio: 14990, stock: 12, descripcion: "Entorchado redondo en níquel." },
        { codigo: "AC004", categoria: "Accesorios", nombre: "Púas de Guitarra x10 (0.73mm)", marca: "Fender", modelo: "351", precio: 3990, stock: 50, descripcion: "Pack de 10 unidades de celuloide." },
        { codigo: "AC005", categoria: "Accesorios", nombre: "Capotraste Guitarra", marca: "Dunlop", modelo: "Trigger", precio: 12990, stock: 15, descripcion: "Construcción en aluminio de aviación." },
        { codigo: "AC006", categoria: "Accesorios", nombre: "Afinador de Clip", marca: "Snark", modelo: "SN-5", precio: 8990, stock: 20, descripcion: "Pantalla a todo color giratoria." },
        { codigo: "AC007", categoria: "Accesorios", nombre: "Cable Instrumento 3m", marca: "Monster", modelo: "S100-I-3", precio: 12990, stock: 15, descripcion: "Cable de instrumento de 3 metros blindado." },
        { codigo: "AC008", categoria: "Accesorios", nombre: "Cable Instrumento 6m", marca: "Monster", modelo: "S100-I-6", precio: 17990, stock: 10, descripcion: "Cable de instrumento de 6 metros blindado." },
        { codigo: "AC009", categoria: "Accesorios", nombre: "Soporte Guitarra de Piso", marca: "Hercules", modelo: "GS302B", precio: 22990, stock: 12, descripcion: "Diseño plegable compacto." },
        { codigo: "AC010", categoria: "Accesorios", nombre: "Soporte Guitarra de Pared", marca: "Hercules", modelo: "WAH-202", precio: 18990, stock: 10, descripcion: "Base de madera con agarre seguro." },

        // Estudio y Grabación
        { codigo: "ES001", categoria: "Estudio y Grabación", nombre: "Interfaz de Audio 2x2 USB", marca: "Focusrite", modelo: "Scarlett Solo", precio: 149990, stock: 4, descripcion: "Interfaz USB con preamp Scarlett." },
        { codigo: "ES002", categoria: "Estudio y Grabación", nombre: "Auriculares de Estudio", marca: "Audio-Tech.", modelo: "ATH-M20x", precio: 79990, stock: 6, descripcion: "Drivers de 40mm para monitoreo." },
        { codigo: "ES003", categoria: "Estudio y Grabación", nombre: "Auriculares de Estudio Pro", marca: "Audio-Tech.", modelo: "ATH-M50x", precio: 219990, stock: 4, descripcion: "Respuesta en frecuencia extendida y precisa." },
        { codigo: "ES004", categoria: "Estudio y Grabación", nombre: "Monitor de Estudio 5\"", marca: "Yamaha", modelo: "HS5", precio: 349990, stock: 2, descripcion: "Monitor cerca de campo bi-amplificado de 70W." },
        { codigo: "ES005", categoria: "Estudio y Grabación", nombre: "Pop Filter para Micrófono", marca: "Sennheiser", modelo: "MZP 40", precio: 149990, stock: 8, descripcion: "Filtro anti-pop con brazo flexible." }
    ];

    // Mapeo de rutas de imágenes
    const productos = productosBase.map(p => ({
        ...p,
        imagen: `assets/img/productos/${p.codigo}.jpg`
    }));

    // DOM Elements
    const grid = document.querySelector("#catalogProductsGrid");
    const resultsCount = document.querySelector("#resultsCount");
    const noResults = document.querySelector("#noResults");
    const searchInput = document.querySelector("#searchInput");
    const brandSelect = document.querySelector("#brandSelect");
    const priceRange = document.querySelector("#priceRange");
    const priceValue = document.querySelector("#priceValue");
    const sortSelect = document.querySelector("#sortSelect");
    const resetBtn = document.querySelector("#resetFilters");
    const categoryBtns = document.querySelectorAll(".filter-btn");

    if (!grid) return; // Validación de seguridad por si el script corre fuera de catalogo.html

    // Formatear CLP
    const formatCLP = (val) => `$${val.toLocaleString("es-CL")}`;

    // Cargar Marcas únicas
    const cargarMarcas = () => {
        if (!brandSelect) return;
        const marcas = [...new Set(productos.map(p => p.marca))].sort();
        marcas.forEach(marca => {
            const opt = document.createElement("option");
            opt.value = marca;
            opt.textContent = marca;
            brandSelect.appendChild(opt);
        });
    };

    // Obtener categoría de la URL
    const obtenerCategoriaURL = () => {
        const params = new URLSearchParams(window.location.search);
        const catParam = params.get("categoria");
        if (!catParam) return "todos";

        const map = {
            "guitarras": "Guitarras Acústicas",
            "bajos": "Bajos Eléctricos",
            "baterias": "Baterías",
            "teclados": "Teclados y Pianos",
            "amplificadores": "Amplificadores",
            "microfonos": "Micrófonos"
        };
        return map[catParam.toLowerCase()] || "todos";
    };

    let categoriaActual = obtenerCategoriaURL();

    // Actualizar botones de categoría UI
    const actualizarCategoriaUI = () => {
        categoryBtns.forEach(btn => {
            const cat = btn.dataset.category;
            if (cat === categoriaActual || (categoriaActual === "Guitarras Acústicas" && cat && cat.includes("Guitarras"))) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    };

    // Renderizar Productos
    const renderizarProductos = (lista) => {
        grid.innerHTML = "";

        if (lista.length === 0) {
            if (noResults) noResults.style.display = "block";
            if (resultsCount) resultsCount.textContent = "0 productos encontrados";
            return;
        }

        if (noResults) noResults.style.display = "none";
        if (resultsCount) resultsCount.textContent = `Mostrando ${lista.length} producto${lista.length > 1 ? 's' : ''}`;

        lista.forEach(prod => {
            const article = document.createElement("article");
            article.className = "product-card";

            article.innerHTML = `
                <div class="product-image">
                    ${prod.destacado ? '<span class="product-badge">DESTACADO</span>' : ''}
                    <img src="${prod.imagen}" alt="${prod.nombre} ${prod.marca}" loading="lazy">
                    <button type="button" class="quick-add" aria-label="Agregar ${prod.nombre} al carrito" data-id="${prod.codigo}">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
                <div class="product-info">
                    <span class="product-category">${prod.categoria}</span>
                    <h3>${prod.marca} ${prod.modelo}</h3>
                    <p class="product-description">${prod.descripcion}</p>
                    <div class="product-footer">
                        <strong class="product-price">${formatCLP(prod.precio)}</strong>
                        <a href="producto.html?id=${prod.codigo}" class="product-link">
                            Ver producto <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `;

            grid.appendChild(article);
        });

        vincularBotonesCarrito();
    };

    // Aplicar Filtros y Ordenamiento
    const aplicarFiltros = () => {
        let resultado = [...productos];

        // 1. Categoría
        if (categoriaActual !== "todos") {
            if (categoriaActual === "Guitarras Acústicas") {
                resultado = resultado.filter(p => p.categoria.includes("Guitarras"));
            } else {
                resultado = resultado.filter(p => p.categoria === categoriaActual);
            }
        }

        // 2. Buscador
        if (searchInput && searchInput.value.trim() !== "") {
            const texto = searchInput.value.trim().toLowerCase();
            resultado = resultado.filter(p =>
                p.nombre.toLowerCase().includes(texto) ||
                p.marca.toLowerCase().includes(texto) ||
                p.modelo.toLowerCase().includes(texto) ||
                p.codigo.toLowerCase().includes(texto)
            );
        }

        // 3. Marca
        if (brandSelect && brandSelect.value !== "todas") {
            resultado = resultado.filter(p => p.marca === brandSelect.value);
        }

        // 4. Precio máximo
        if (priceRange) {
            const maxPrecio = Number(priceRange.value);
            resultado = resultado.filter(p => p.precio <= maxPrecio);
        }

        // 5. Ordenamiento
        if (sortSelect) {
            const orden = sortSelect.value;
            if (orden === "precio-asc") {
                resultado.sort((a, b) => a.precio - b.precio);
            } else if (orden === "precio-desc") {
                resultado.sort((a, b) => b.precio - a.precio);
            } else if (orden === "nombre-asc") {
                resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
            }
        }

        renderizarProductos(resultado);
    };

    // Agregar al Carrito
    const vincularBotonesCarrito = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        document.querySelectorAll("#catalogProductsGrid .quick-add").forEach(boton => {
            boton.addEventListener("click", () => {
                const codigo = boton.dataset.id;
                const prod = productos.find(p => p.codigo === codigo);

                if (!prod) return;

                const existente = carrito.find(item => item.codigo === codigo);

                if (existente) {
                    existente.cantidad += 1;
                } else {
                    carrito.push({
                        codigo: prod.codigo,
                        nombre: `${prod.marca} ${prod.modelo}`,
                        categoria: prod.categoria,
                        precio: prod.precio,
                        imagen: prod.imagen,
                        cantidad: 1
                    });
                }

                localStorage.setItem("carrito", JSON.stringify(carrito));

                const contador = document.querySelector(".cart-count");
                if (contador) {
                    contador.textContent = carrito.reduce((t, i) => t + i.cantidad, 0);
                }

                let notif = document.querySelector(".cart-notification");
                if (!notif) {
                    notif = document.createElement("div");
                    notif.className = "cart-notification";
                    document.body.appendChild(notif);
                }
                notif.textContent = `${prod.marca} ${prod.modelo} fue agregado al carrito.`;
                notif.classList.add("show");

                setTimeout(() => notif.classList.remove("show"), 2500);

                boton.classList.add("added");
                setTimeout(() => boton.classList.remove("added"), 700);
            });
        });
    };

    // Listeners de Eventos
    categoryBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            categoryBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            categoriaActual = btn.dataset.category || "todos";
            aplicarFiltros();
        });
    });

    if (searchInput) searchInput.addEventListener("input", aplicarFiltros);
    if (brandSelect) brandSelect.addEventListener("change", aplicarFiltros);

    if (priceRange) {
        priceRange.addEventListener("input", (e) => {
            if (priceValue) priceValue.textContent = formatCLP(Number(e.target.value));
            aplicarFiltros();
        });
    }

    if (sortSelect) sortSelect.addEventListener("change", aplicarFiltros);

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            if (searchInput) searchInput.value = "";
            if (brandSelect) brandSelect.value = "todas";
            if (priceRange) {
                priceRange.value = 800000;
                if (priceValue) priceValue.textContent = "$800.000";
            }
            if (sortSelect) sortSelect.value = "destacados";
            categoriaActual = "todos";
            actualizarCategoriaUI();
            aplicarFiltros();
        });
    }

    // Menú Filtros Móvil
    const filterMobileToggle = document.querySelector("#filterMobileToggle");
    const catalogSidebar = document.querySelector("#catalogSidebar");
    const closeSidebar = document.querySelector("#closeSidebar");

    if (filterMobileToggle && catalogSidebar) {
        filterMobileToggle.addEventListener("click", () => catalogSidebar.classList.add("active"));
        if (closeSidebar) closeSidebar.addEventListener("click", () => catalogSidebar.classList.remove("active"));
    }

    // Inicialización del catálogo
    cargarMarcas();
    actualizarCategoriaUI();
    aplicarFiltros();
});