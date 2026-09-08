/* =========================================================
   SONIDO VIVO - LOGIN.JS
   Control de pestañas, validaciones y autenticación
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    // Pestañas
    const tabLogin = document.querySelector("#tabLogin");
    const tabRegister = document.querySelector("#tabRegister");
    const formLogin = document.querySelector("#formLogin");
    const formRegister = document.querySelector("#formRegister");
    const authAlert = document.querySelector("#authAlert");

    // Función para mostrar alertas de feedback
    const mostrarAlerta = (mensaje, tipo = "error") => {
        if (!authAlert) return;
        authAlert.textContent = mensaje;
        authAlert.className = `auth-alert ${tipo}`;
        authAlert.style.display = "block";

        setTimeout(() => {
            authAlert.style.display = "none";
        }, 4000);
    };

    // Cambiar entre Login y Registro
    const alternarTabs = (esLogin) => {
        if (esLogin) {
            tabLogin.classList.add("active");
            tabLogin.setAttribute("aria-selected", "true");
            tabRegister.classList.remove("active");
            tabRegister.setAttribute("aria-selected", "false");

            formLogin.classList.add("active");
            formRegister.classList.remove("active");
        } else {
            tabRegister.classList.add("active");
            tabRegister.setAttribute("aria-selected", "true");
            tabLogin.classList.remove("active");
            tabLogin.setAttribute("aria-selected", "false");

            formRegister.classList.add("active");
            formLogin.classList.remove("active");
        }
        if (authAlert) authAlert.style.display = "none";
    };

    if (tabLogin && tabRegister) {
        tabLogin.addEventListener("click", () => alternarTabs(true));
        tabRegister.addEventListener("click", () => alternarTabs(false));
    }

    // Toggle para ver/ocultar contraseña
    document.querySelectorAll(".toggle-password").forEach(boton => {
        boton.addEventListener("click", () => {
            const input = boton.parentElement.querySelector("input");
            const icono = boton.querySelector("i");

            if (input.type === "password") {
                input.type = "text";
                icono.className = "fa-regular fa-eye-slash";
            } else {
                input.type = "password";
                icono.className = "fa-regular fa-eye";
            }
        });
    });

    // Validar formato de Email
    const esEmailValido = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // LOGICA DE INICIO DE SESIÓN
    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();

            const emailInput = document.querySelector("#loginEmail");
            const passwordInput = document.querySelector("#loginPassword");
            const emailError = document.querySelector("#loginEmailError");
            const passwordError = document.querySelector("#loginPasswordError");

            let esValido = true;
            emailError.textContent = "";
            passwordError.textContent = "";

            if (!emailInput.value.trim()) {
                emailError.textContent = "Ingresa tu correo electrónico.";
                esValido = false;
            } else if (!esEmailValido(emailInput.value.trim())) {
                emailError.textContent = "El correo no tiene un formato válido.";
                esValido = false;
            }

            if (!passwordInput.value.trim()) {
                passwordError.textContent = "Ingresa tu contraseña.";
                esValido = false;
            }

            if (esValido) {
                // Simulación de credenciales en localStorage
                const usuarioRegistrado = JSON.parse(localStorage.getItem("usuarioSonidoVivo"));

                if (
                    usuarioRegistrado &&
                    usuarioRegistrado.email === emailInput.value.trim() &&
                    usuarioRegistrado.password === passwordInput.value.trim()
                ) {
                    mostrarAlerta("¡Sesión iniciada con éxito! Redirigiendo...", "success");
                    localStorage.setItem("sesionIniciada", "true");
                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 1500);
                } else {
                    mostrarAlerta("Correo o contraseña incorrectos.", "error");
                }
            }
        });
    }

    // LÓGICA DE REGISTRO
    if (formRegister) {
        formRegister.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameInput = document.querySelector("#regName");
            const emailInput = document.querySelector("#regEmail");
            const passInput = document.querySelector("#regPassword");
            const confirmPassInput = document.querySelector("#regConfirmPassword");

            const nameError = document.querySelector("#regNameError");
            const emailError = document.querySelector("#regEmailError");
            const passError = document.querySelector("#regPasswordError");
            const confirmPassError = document.querySelector("#regConfirmPasswordError");

            let esValido = true;
            nameError.textContent = "";
            emailError.textContent = "";
            passError.textContent = "";
            confirmPassError.textContent = "";

            if (!nameInput.value.trim()) {
                nameError.textContent = "Ingresa tu nombre completo.";
                esValido = false;
            }

            if (!emailInput.value.trim()) {
                emailError.textContent = "Ingresa tu correo electrónico.";
                esValido = false;
            } else if (!esEmailValido(emailInput.value.trim())) {
                emailError.textContent = "Ingresa un correo electrónico válido.";
                esValido = false;
            }

            if (passInput.value.length < 6) {
                passError.textContent = "La contraseña debe tener al menos 6 caracteres.";
                esValido = false;
            }

            if (passInput.value !== confirmPassInput.value) {
                confirmPassError.textContent = "Las contraseñas no coinciden.";
                esValido = false;
            }

            if (esValido) {
                const nuevoUsuario = {
                    nombre: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    password: passInput.value.trim()
                };

                localStorage.setItem("usuarioSonidoVivo", JSON.stringify(nuevoUsuario));
                mostrarAlerta("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.", "success");

                formRegister.reset();
                setTimeout(() => {
                    alternarTabs(true);
                }, 1500);
            }
        });
    }

    // Recuperar Contraseña (Simulación)
    const forgotLink = document.querySelector("#forgotPasswordLink");
    if (forgotLink) {
        forgotLink.addEventListener("click", (e) => {
            e.preventDefault();
            const email = prompt("Ingresa tu correo registrado para restablecer la contraseña:");
            if (email) {
                if (esEmailValido(email)) {
                    alert(`Hemos enviado las instrucciones a: ${email}`);
                } else {
                    alert("El correo ingresado no es válido.");
                }
            }
        });
    }
});