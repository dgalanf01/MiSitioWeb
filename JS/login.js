document.addEventListener("DOMContentLoaded", () => {
    const loginDiv = document.getElementById("login");

    const sugerenciasLink = document.getElementById("linkSugerencias");
    const estadoSesion = sessionStorage.getItem("logado");
    const usuarioSesion = sessionStorage.getItem("usuario");

    if (estadoSesion === "true") {
        mostrarLogout(usuarioSesion);
        sugerenciasLink.style.display = "flex";
    } else {
        fetch("PHP/check_session.php")
            .then(res => res.json())
            .then(data => {
                if (data.logado) {
                    sessionStorage.setItem("logado", "true");
                    sessionStorage.setItem("usuario", data.usuario);
                    mostrarLogout(data.usuario);
                    sugerenciasLink.style.display = "inline";
                } else {
                    sugerenciasLink.style.display = "none";
                    mostrarBotones();
                }
            })
            .catch(error => {
                console.error("Error al verificar sesión:", error);
                mostrarBotones();
            });
    }

    function mostrarBotones() {
        loginDiv.innerHTML = `
            <div class="buttons">
                <button id="btnIniciar">Iniciar sesión</button>
                <button id="btnRegistro">Registrarse</button>
            </div>
        `;

        const btnIniciar = document.getElementById('btnIniciar');
        const btnRegistro = document.getElementById('btnRegistro');

        btnIniciar.addEventListener("click", () => abrirModal("login"));
        btnRegistro.addEventListener("click", () => abrirModal("registro"));

        configurarFormularioLogin();
        configurarFormularioRegistro();
    }

    function abrirModal(tipo) {
        const modal = document.getElementById(tipo === "login" ? "modalLogin" : "modalRegistro");
        modal.style.display = "block";

        window.onclick = (event) => {
            if (event.target === modal) modal.style.display = "none";
        };

        const closeBtn = modal.querySelector(".close");
        closeBtn.onclick = () => modal.style.display = "none";
    }

    function configurarFormularioLogin() {
        const form = document.getElementById("loginForm");
        if (!form) return;

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const usuario = document.getElementById("usuario").value;
            const contrasena = document.getElementById("contrasena").value;

            const formData = new FormData();
            formData.append("usuario", usuario);
            formData.append("contrasena", contrasena);

            const response = await fetch("PHP/login.php", {
                method: "POST",
                body: formData
            });

            const resultado = await response.json();

            if (resultado.status === "success") {
                sessionStorage.setItem("logado", "true");
                sessionStorage.setItem("usuario", usuario);
                window.location.href = "index.html";
            } else {
                alert(resultado.message);
            }
        });
    }

    function configurarFormularioRegistro() {
        const form = document.getElementById("registroForm");
        if (!form) return;

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            try {
                const response = await fetch("PHP/registrar.php", {
                    method: "POST",
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const resultado = await response.json();

                if (resultado.status === "success") {
                    alert(resultado.message);
                    document.getElementById("modalRegistro").style.display = "none";
                } else {
                    alert(resultado.message);
                }
            } catch (error) {
                console.error("Error al registrar:", error);
                alert("Error inesperado al procesar el registro.");
            }
        });
    }

    function mostrarLogout(usuario) {
        loginDiv.innerHTML = `
            <form id="logoutForm"> 
                <label><strong>${usuario}</strong></label>
                <button type="submit" id="cerrarSesion">Cerrar sesión</button>
            </form>
        `;

        document.getElementById("cerrarSesion").addEventListener("click", async (e) => {
            e.preventDefault();
            const response = await fetch("PHP/logout.php", {
                method: "POST"
            });

            const text = await response.text();
            if (text.trim() === "LOGOUT_OK") {
                sessionStorage.clear();
                window.location.href = "index.html";
            } else {
                alert("Error al cerrar sesión.");
            }
        });
    }
});