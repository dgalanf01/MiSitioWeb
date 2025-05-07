document.addEventListener("DOMContentLoaded", () => {
    const loginDiv = document.getElementById("login");

    // Verifica si ya existe una sesión activa en sessionStorage
    const estadoSesion = sessionStorage.getItem("logado");
    const usuarioSesion = sessionStorage.getItem("usuario");

    if (estadoSesion === "true") {
        mostrarLogout(usuarioSesion); // Si está logueado, muestra la opción de logout
    } else {
        // Si no hay sesión activa, verifica en el servidor si el usuario está autenticado
        fetch("PHP/check_session.php")
            .then(res => res.json())
            .then(data => {
                if (data.logado) {
                    sessionStorage.setItem("logado", "true");
                    sessionStorage.setItem("usuario", data.usuario);
                    mostrarLogout(data.usuario); // Muestra la opción de logout con el nombre del usuario
                } else {
                    mostrarLogin(); // Si no está autenticado, muestra el formulario de login
                }
            })
            .catch(error => {
                console.error("Error al verificar sesión:", error);
                mostrarLogin(); // Si hay un error al verificar la sesión, muestra el formulario de login
            });
    }

    // Función para mostrar el formulario de logout
    function mostrarLogout(usuario) {
        loginDiv.innerHTML = `
            <form id="logoutForm"> 
                <label><strong>${usuario}</strong></label>
                <button type="submit" id="cerrarSesion">Cerrar sesión</button>
            </form>
        `;

        // Agrega el evento para el cierre de sesión
        document.getElementById("cerrarSesion").addEventListener("click", async (e) => {
            e.preventDefault();
            const response = await fetch("PHP/logout.php", {
                method: "POST"
            });

            const text = await response.text();
            if (text.trim() === "LOGOUT_OK") {
                sessionStorage.clear(); // Limpia el estado de la sesión
                window.location.href = "index.html"; // Redirige al inicio
            } else {
                alert("Error al cerrar sesión.");
            }
        });
    }

    // Función para mostrar el formulario de login
    function mostrarLogin() {
        const form = document.getElementById("loginForm");
        if (!form) return;

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const usuario = document.getElementById("usuario").value;
            const contrasena = document.getElementById("contrasena").value;

            const formData = new FormData();
            formData.append("usuario", usuario);
            formData.append("contrasena", contrasena);

            // Enviar los datos del formulario al archivo PHP para hacer el login
            const response = await fetch("PHP/login.php", {
                method: "POST",
                body: formData
            });

            const resultado = await response.json();

            if (resultado.status === "success") {
                sessionStorage.setItem("logado", "true");
                sessionStorage.setItem("usuario", usuario);
                window.location.href = "index.html"; // Redirige al inicio tras iniciar sesión correctamente
            } else {
                alert(resultado.message); // Si el login falla, muestra el mensaje de error
            }
        });
    }
});
