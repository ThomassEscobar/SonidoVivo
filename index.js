document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // CARRITO
    // =====================================================

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const actualizarContadorCarrito = () => {
        const contador = document.querySelector(".cart-count");

        if (!contador) return;

        const cantidadTotal = carrito.reduce(
            (total, producto) => total + producto.cantidad,
            0
        );

        contador.textContent = cantidadTotal;
    };


    const guardarCarrito = () => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarContadorCarrito();
    };


    // =====================================================
    // AGREGAR PRODUCTOS DESTACADOS AL CARRITO
    // =====================================================

    const botonesCarrito = document.querySelectorAll(".quick-add");

    botonesCarrito.forEach((boton) => {

        boton.addEventListener("click", () => {

            const tarjeta = boton.closest(".product-card");

            if (!tarjeta) return;

            const nombre =
                tarjeta.querySelector("h3")?.textContent.trim();

            const categoria =
                tarjeta.querySelector(".product-category")?.textContent.trim();

            const precioTexto =
                tarjeta.querySelector(".product-price")?.textContent.trim();

            const imagen =
                tarjeta.querySelector("img")?.getAttribute("src");

            const enlace =
                tarjeta.querySelector(".product-link")?.getAttribute("href");


            // Obtener ID desde producto.html?id=GA001
            let codigo = "";

            if (enlace) {
                const parametros = new URLSearchParams(
                    enlace.split("?")[1]
                );

                codigo = parametros.get("id") || "";
            }


            // Convertir "$129.990" → 129990
            const precio = Number(
                precioTexto
                    ?.replace("$", "")
                    .replace(/\./g, "")
                    .replace(",", ".")
            );


            const productoExistente = carrito.find(
                (producto) => producto.codigo === codigo
            );


            if (productoExistente) {

                productoExistente.cantidad += 1;

            } else {

                carrito.push({
                    codigo: codigo,
                    nombre: nombre,
                    categoria: categoria,
                    precio: precio,
                    imagen: imagen,
                    cantidad: 1
                });

            }


            guardarCarrito();

            mostrarNotificacion(
                `${nombre} fue agregado al carrito.`
            );


            // Animación visual
            boton.classList.add("added");

            setTimeout(() => {
                boton.classList.remove("added");
            }, 700);

        });

    });


    // =====================================================
    // NEWSLETTER
    // =====================================================

    const newsletterForm =
        document.querySelector("#newsletterForm");

    const newsletterEmail =
        document.querySelector("#newsletterEmail");

    const emailSuggestion =
        document.querySelector("#emailSuggestion");

    const emailError =
        document.querySelector("#emailError");


    if (newsletterForm && newsletterEmail) {

        newsletterForm.addEventListener("submit", (event) => {

            event.preventDefault();


            // Limpiar mensajes anteriores
            emailError.textContent = "";
            emailSuggestion.textContent =
                "Usa un correo electrónico válido para recibir nuestras novedades.";


            const email = newsletterEmail.value.trim();


            // Validación: campo vacío
            if (email === "") {

                emailError.textContent =
                    "Por favor, ingresa tu correo electrónico.";

                emailSuggestion.textContent =
                    "Este campo es obligatorio.";

                newsletterEmail.focus();

                return;
            }


            // Validación del formato
            const formatoEmail =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!formatoEmail.test(email)) {

                emailError.textContent =
                    "El correo ingresado no es válido.";

                emailSuggestion.textContent =
                    "Ejemplo: nombre@correo.cl";

                newsletterEmail.focus();

                return;
            }


            // Obtener suscripciones existentes
            let suscripciones =
                JSON.parse(
                    localStorage.getItem("suscripciones")
                ) || [];


            // Evitar duplicados
            if (!suscripciones.includes(email)) {

                suscripciones.push(email);

                localStorage.setItem(
                    "suscripciones",
                    JSON.stringify(suscripciones)
                );

            }


            // Mensaje de éxito
            emailError.textContent = "";

            emailSuggestion.textContent =
                "¡Suscripción realizada correctamente! Gracias por registrarte.";


            newsletterEmail.value = "";


            // Ocultar mensaje después de unos segundos
            setTimeout(() => {

                emailSuggestion.textContent =
                    "Usa un correo electrónico válido para recibir nuestras novedades.";

            }, 4000);

        });


        // Validación mientras escribe
        newsletterEmail.addEventListener("input", () => {

            const email = newsletterEmail.value.trim();

            emailError.textContent = "";


            if (email === "") {

                emailSuggestion.textContent =
                    "Usa un correo electrónico válido para recibir nuestras novedades.";

                return;
            }


            const formatoEmail =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!formatoEmail.test(email)) {

                emailSuggestion.textContent =
                    "Ejemplo: nombre@correo.cl";

            } else {

                emailSuggestion.textContent =
                    "Correo válido.";

            }

        });

    }


    // =====================================================
    // MENÚ MÓVIL
    // =====================================================

    const menuToggle =
        document.querySelector("#menuToggle");

    const mainNav =
        document.querySelector(".main-nav");


    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const menuAbierto =
                mainNav.classList.toggle("active");


            menuToggle.setAttribute(
                "aria-expanded",
                menuAbierto
            );


            menuToggle.setAttribute(
                "aria-label",
                menuAbierto
                    ? "Cerrar menú"
                    : "Abrir menú"
            );

        });


        // Cerrar menú al seleccionar un enlace
        const enlacesMenu =
            mainNav.querySelectorAll("a");


        enlacesMenu.forEach((enlace) => {

            enlace.addEventListener("click", () => {

                mainNav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menú"
                );

            });

        });

    }


    // =====================================================
    // NOTIFICACIÓN DEL CARRITO
    // =====================================================

    const mostrarNotificacion = (mensaje) => {

        let notificacion =
            document.querySelector(".cart-notification");


        // Crear la notificación si no existe
        if (!notificacion) {

            notificacion =
                document.createElement("div");

            notificacion.className =
                "cart-notification";

            document.body.appendChild(notificacion);

        }


        notificacion.textContent = mensaje;

        notificacion.classList.add("show");


        setTimeout(() => {

            notificacion.classList.remove("show");

        }, 2500);

    };


    // =====================================================
    // INICIALIZACIÓN
    // =====================================================

    actualizarContadorCarrito();

});