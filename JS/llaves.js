document.addEventListener("DOMContentLoaded", function() {
    fetch("PHP/llaves.php")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();  // Intentamos parsear como JSON
    })
    .then(data => {
        if (!Array.isArray(data)) {
            console.warn("Respuesta inesperada:", data);
            return;
        }

        const tbody = document.querySelector("#tablaArmas tbody");
        tbody.innerHTML = "";  // Limpia antes de añadir

        data.forEach(fila => {
            const tr = document.createElement("tr");

            const tdImagen = document.createElement("td");
            const img = document.createElement("img");
            img.src = fila.arma_imagen;
            img.alt = fila.arma_nombre;
            img.style.maxWidth = "100%";
            tdImagen.appendChild(img);
            tr.appendChild(tdImagen);

            const tdJuego = document.createElement("td");
            tdJuego.textContent = fila.juego_nombre;
            tr.appendChild(tdJuego);

            const tdMundo = document.createElement("td");
            tdMundo.textContent = fila.mundo_nombre;
            tr.appendChild(tdMundo);

            const tdNombre = document.createElement("td");
            tdNombre.textContent = fila.arma_nombre;
            tr.appendChild(tdNombre);

            const tdFuerza = document.createElement("td");
            tdFuerza.textContent = fila.fuerza;
            tr.appendChild(tdFuerza);

            const tdMagia = document.createElement("td");
            tdMagia.textContent = fila.magia;
            tr.appendChild(tdMagia);

            const tdObtencion = document.createElement("td");
            tdObtencion.textContent = fila.obtencion;
            tr.appendChild(tdObtencion);

            tbody.appendChild(tr);
        });
    })
    .catch(error => console.error("Error al obtener las armas:", error));
});
