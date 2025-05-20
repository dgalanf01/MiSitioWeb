document.addEventListener("DOMContentLoaded", function () {
  const encabezados = document.querySelectorAll("#listas li.lista1 > h3");

  encabezados.forEach(function(h3) {
    h3.style.cursor = "pointer";

    h3.addEventListener("click", function() {
      const siguienteUL = h3.nextElementSibling;

      if (siguienteUL && siguienteUL.tagName.toLowerCase() === "ul") {
        const isVisible = window.getComputedStyle(siguienteUL).display !== "none";
        siguienteUL.style.display = isVisible ? "none" : "block";

        // Alternar clase que rota el ícono
        h3.classList.toggle("abierto", !isVisible);
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const lista2items = document.querySelectorAll("#listas li.lista2");

  lista2items.forEach(function(li) {
    const titulo = li.querySelector('p');
    if (!titulo) return;

    titulo.style.cursor = "pointer";

    titulo.addEventListener("click", function(e) {
      // Evitar que al hacer click en enlaces dentro no se active el toggle
      if(e.target.tagName.toLowerCase() === 'a') return;

      const ulHijo = li.querySelector("ul");
      if (ulHijo) {
        const isVisible = window.getComputedStyle(ulHijo).display !== "none";
        ulHijo.style.display = isVisible ? "none" : "block";

        li.classList.toggle("abierto", !isVisible);
      }
    });
  });
});

