/* =========================================================
   SONIDO VIVO - CARRITO.JS
   Lógica interactiva del carrito de compras
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    // Referencias al DOM
    const itemsContainer = document.querySelector("#cartItemsContainer");
    const emptyMessage = document.querySelector("#emptyCartMessage");
    const globalActions = document.querySelector("#cartGlobalActions");
    const summarySection = document.querySelector("#cartSummary");

    const subtotalEl = document.querySelector("#summarySubtotal");
    const totalEl = document.querySelector("#summaryTotal");
    const discountRow = document.querySelector("#discountRow");
    const discountEl = document.querySelector("#summaryDiscount");
    const clearCartBtn = document.querySelector("#clearCartBtn");
    const checkoutBtn = document.querySelector("#checkoutBtn");

    const couponInput = document.querySelector("#couponCode");
    const applyCouponBtn = document.querySelector("#applyCouponBtn");
    const couponMessage = document.querySelector("#couponMessage");

    let porcentajeDescuento = 0;

    // Formatear CLP
    const formatCLP = (val) => `$${val.toLocaleString("es-CL")}`;

    // Obtener carrito desde localStorage
    const obtenerCarrito = () => {
        return JSON.parse(localStorage.getItem("carrito")) || [];
    };

    // Guardar carrito en localStorage
    const guardarCarrito = (carrito) => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarContadorHeader();
    };

    // Actualizar el indicador del header
    const actualizarContadorHeader = () => {
        const carrito = obtenerCarrito();
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        const cartCountBadge = document.querySelector(".cart-count");
        if (cartCountBadge) {
            cartCountBadge.textContent = totalItems;
        }
    };

    // Renderizar la lista de productos y totales
    const renderizarCarrito = () => {
        const carrito = obtenerCarrito();

        if (carrito.length === 0) {
            itemsContainer.innerHTML = "";
            itemsContainer.style.display = "none";
            if (emptyMessage) emptyMessage.style.display = "block";
            if (globalActions) globalActions.style.display = "none";
            if (summarySection) summarySection.style.opacity = "0.4";
            if (checkoutBtn) checkoutBtn.disabled = true;

            subtotalEl.textContent = "$0";
            totalEl.textContent = "$0";
            return;
        }

        itemsContainer.style.display = "flex";
        if (emptyMessage) emptyMessage.style.display = "none";
        if (globalActions) globalActions.style.display = "flex";
        if (summarySection) summarySection.style.opacity = "1";
        if (checkoutBtn) checkoutBtn.disabled = false;

        itemsContainer.innerHTML = "";

        carrito.forEach((item) => {
            const row = document.createElement("div");
            row.className = "cart-item";

            row.innerHTML = `
                <div class="item-info">
                    <img src="${item.imagen}" alt="${item.nombre}" class="item-img" onerror="this.src='assets/img/productos/placeholder.jpg'">
                    <div class="item-details">
                        <h3>${item.nombre}</h3>
                        <span class="item-code">Cód: ${item.codigo}</span>
                    </div>
                </div>

                <div class="item-price">${formatCLP(item.precio)}</div>

                <div class="qty-controls">
                    <button type="button" class="qty-btn btn-minus" data-id="${item.codigo}">-</button>
                    <input type="number" class="qty-input" value="${item.cantidad}" min="1" readonly>
                    <button type="button" class="qty-btn btn-plus" data-id="${item.codigo}">+</button>
                </div>

                <div class="item-subtotal">${formatCLP(item.precio * item.cantidad)}</div>

                <button type="button" class="btn-remove-item" data-id="${item.codigo}" aria-label="Eliminar producto">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;

            itemsContainer.appendChild(row);
        });

        vincularEventosItems();
        calcularTotales();
    };

    // Calcular montos de la tarjeta de resumen
    const calcularTotales = () => {
        const carrito = obtenerCarrito();
        const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        const montoDescuento = Math.round(subtotal * porcentajeDescuento);
        const total = subtotal - montoDescuento;

        subtotalEl.textContent = formatCLP(subtotal);
        totalEl.textContent = formatCLP(total);

        if (porcentajeDescuento > 0) {
            discountRow.style.display = "flex";
            discountEl.textContent = `-${formatCLP(montoDescuento)}`;
        } else {
            discountRow.style.display = "none";
        }
    };

    // Vincular botones +, - y eliminar dentro de la lista
    const vincularEventosItems = () => {
        let carrito = obtenerCarrito();

        // Incrementar
        document.querySelectorAll(".btn-plus").forEach(btn => {
            btn.addEventListener("click", () => {
                const codigo = btn.dataset.id;
                const item = carrito.find(p => p.codigo === codigo);
                if (item) {
                    item.cantidad += 1;
                    guardarCarrito(carrito);
                    renderizarCarrito();
                }
            });
        });

        // Decrementar
        document.querySelectorAll(".btn-minus").forEach(btn => {
            btn.addEventListener("click", () => {
                const codigo = btn.dataset.id;
                const item = carrito.find(p => p.codigo === codigo);
                if (item) {
                    if (item.cantidad > 1) {
                        item.cantidad -= 1;
                    } else {
                        carrito = carrito.filter(p => p.codigo !== codigo);
                    }
                    guardarCarrito(carrito);
                    renderizarCarrito();
                }
            });
        });

        // Eliminar elemento completo
        document.querySelectorAll(".btn-remove-item").forEach(btn => {
            btn.addEventListener("click", () => {
                const codigo = btn.dataset.id;
                carrito = carrito.filter(p => p.codigo !== codigo);
                guardarCarrito(carrito);
                renderizarCarrito();
            });
        });
    };

    // Evento vaciar carrito completo
    if (clearCartBtn) {
        clearCartBtn.addEventListener("click", () => {
            if (confirm("¿Estás seguro de que deseas vaciar tu carrito?")) {
                localStorage.removeItem("carrito");
                actualizarContadorHeader();
                renderizarCarrito();
            }
        });
    }

    // Aplicar cupón de descuento promocional (Ejemplo: SONIDO10)
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener("click", () => {
            const code = couponInput.value.trim().toUpperCase();

            if (code === "SONIDO10") {
                porcentajeDescuento = 0.10; // 10% Descuento
                couponMessage.textContent = "¡Cupón del 10% aplicado con éxito!";
                couponMessage.className = "coupon-msg success";
            } else if (code === "") {
                couponMessage.textContent = "Ingresa un código de cupón.";
                couponMessage.className = "coupon-msg error";
            } else {
                porcentajeDescuento = 0;
                couponMessage.textContent = "Cupón no válido o expirado.";
                couponMessage.className = "coupon-msg error";
            }

            calcularTotales();
        });
    }

    // Simular paso al proceso de pago
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            alert("Redirigiendo a la pasarela de pago segura...");
        });
    }

    // Carga inicial
    actualizarContadorHeader();
    renderizarCarrito();
});