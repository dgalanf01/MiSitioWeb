document.addEventListener("DOMContentLoaded", () => {
    const loginDiv = document.getElementById("login");

    // Verificar sesión activa
    fetch("check_session.php")
        .then(res => res.json())
        .then(data => {
            if (data.logado) {
                loginDiv.innerHTML = `
                    <p>Hola, <strong>${data.usuario}</strong></p>
                    <form action="logout.php" method="post">
                        <button type="submit">Cerrar sesión</button>
                    </form>
                `;
            } else {
                loginDiv.innerHTML = `
                    <form id="formLogin">
                        <div class="inputs">
                            <label for="usuario">Usuario:</label>
                            <input type="text" name="usuario" id="usuario" placeholder="Usuario" required>
                            <label for="contrasena">Contraseña:</label>
                            <input type="password" name="contrasena" id="contrasena" placeholder="Contraseña" required>
                        </div>
                        <div class="buttons">
                            <button type="button" id="iniciar">Iniciar sesión</button>
                            <a href="registro.php"><button type="button">Registrarse</button></a>
                        </div>
                    </form>
                `;

                // Reasignar el evento al botón
                document.getElementById("iniciar").addEventListener("click", async () => {
                    const usuario = document.getElementById("usuario").value;
                    const contrasena = document.getElementById("contrasena").value;

                    const formData = new FormData();
                    formData.append("usuario", usuario);
                    formData.append("contrasena", contrasena);

                    const response = await fetch("login.php", {
                        method: "POST",
                        body: formData
                    });

                    const resultado = await response.text();

                    if (resultado.trim() === "OK") {
                        alert("Inicio de sesión exitoso");
                        location.reload(); // recarga para mostrar el estado logado
                    } else {
                        alert(resultado);
                    }
                });
            }
        });
});