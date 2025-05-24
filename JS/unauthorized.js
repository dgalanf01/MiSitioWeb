document.addEventListener("DOMContentLoaded", () => {
    const estadoSesion = sessionStorage.getItem("logado");

    if (estadoSesion !== "true") {
        document.body.innerHTML = "<h2>No tienes permiso para acceder a esta página.</h2>";
        // O redirige:
        // window.location.href = "index.html";
    }
});
