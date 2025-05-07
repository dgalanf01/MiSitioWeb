document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.getElementById("iniciar");

    btnLogin.addEventListener("click", async () => {
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
            window.location.href = "index.html"; // O redirige a tu panel
        } else {
            alert(resultado);
        }
    });
});
