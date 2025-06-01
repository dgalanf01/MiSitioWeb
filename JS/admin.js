document.addEventListener("DOMContentLoaded", () => {
  const loginDiv = document.getElementById("login");
  const sugerenciasLink = document.getElementById("linkSugerencias");

  fetch("PHP/check_session.php")
    .then(res => res.json())
    .then(data => {
      if (data.logado) {
        const rolSesion = data.rol || "user"; // obtener rol, por defecto 'user'
        sessionStorage.setItem("logado", "true");
        sessionStorage.setItem("usuario", data.usuario);
        sessionStorage.setItem("rol", rolSesion);

        mostrarLogout(data.usuario);

        // Mostrar link de sugerencias solo para admin
        if (rolSesion === "admin") {
          sugerenciasLink.style.display = "flex";
          activarPanelAdmin();
          cargarSugerenciasAdmin();
        } else {
          sugerenciasLink.style.display = "none";
        }

      } else {
        sugerenciasLink.style.display = "none";
        mostrarBotones();
      }
    })
    .catch(error => {
      console.error("Error al verificar sesión:", error);
      mostrarBotones();
    });

  function mostrarBotones() {
    loginDiv.innerHTML = `
      <div class="buttons">
        <button id="btnIniciar">Iniciar sesión</button>
        <button id="btnRegistro">Registrarse</button>
      </div>
    `;
    document.getElementById('btnIniciar').addEventListener("click", () => abrirModal("login"));
    document.getElementById('btnRegistro').addEventListener("click", () => abrirModal("registro"));
    configurarFormularioLogin();
    configurarFormularioRegistro();
  }

  function abrirModal(tipo) {
    const modal = document.getElementById(tipo === "login" ? "modalLogin" : "modalRegistro");
    modal.style.display = "block";

    window.onclick = (event) => {
      if (event.target === modal) modal.style.display = "none";
    };

    modal.querySelector(".close").onclick = () => modal.style.display = "none";
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

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

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
      const response = await fetch("PHP/logout.php", { method: "POST" });
      const text = await response.text();
      if (text.trim() === "LOGOUT_OK") {
        sessionStorage.clear();
        window.location.href = "index.html";
      } else {
        alert("Error al cerrar sesión.");
      }
    });
  }

  // Funciones para admin

  function activarPanelAdmin() {
    // Mostrar el contenedor del listado de sugerencias, oculto por defecto en HTML/CSS
    const contenedor = document.getElementById("listadoSugerencias");
    if (contenedor) contenedor.style.display = "block";
  }

  function cargarSugerenciasAdmin() {
  const contenedor = document.getElementById("listadoSugerencias");
  const lista = document.getElementById("listaSugerencias");
  if (!contenedor || !lista) return;

  contenedor.style.display = "block";
  lista.innerHTML = ""; // vaciar

  fetch("PHP/get_sugerencias.php")
    .then(res => {
      if (!res.ok) throw new Error("No autorizado o error al cargar");
      return res.json();
    })
    .then(data => {
      if (data.length === 0) {
        lista.innerHTML = "<li>No hay sugerencias.</li>";
        return;
      }

      data.forEach(sug => {
        // Crear un div contenedor para cada sugerencia
        const sugerenciaDiv = document.createElement("div");
        sugerenciaDiv.classList.add("sugerencia-item");

        // Crear y agregar el nombre de usuario
        const usuarioElem = document.createElement("strong");
        usuarioElem.textContent = sug.usuario;
        sugerenciaDiv.appendChild(usuarioElem);

        // Crear y agregar el mensaje
        const mensajeElem = document.createElement("p");
        mensajeElem.textContent = sug.contenido;
        sugerenciaDiv.appendChild(mensajeElem);

        // Crear y agregar la fecha (en un span o pequeño)
        const fechaElem = document.createElement("small");
        fechaElem.textContent = sug.fecha;
        sugerenciaDiv.appendChild(fechaElem);

        // Botón borrar
        const btnBorrar = document.createElement("button");
        btnBorrar.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#aa2222">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
        </svg>
        `;
        btnBorrar.addEventListener("click", () => borrarSugerencia(sug.id));
        sugerenciaDiv.appendChild(btnBorrar);

        // Añadir este div a la lista
        lista.appendChild(sugerenciaDiv);
      });
    })
    .catch(err => {
      console.error(err);
      lista.innerHTML = "<li>Error al cargar sugerencias.</li>";
    });
}

  function borrarSugerencia(id) {
    if (!confirm("¿Seguro que quieres borrar esta sugerencia?")) return;

    const formData = new FormData();
    formData.append("id", id);

    fetch("PHP/borrar_sugerencia.php", {
      method: "POST",
      body: formData
    })
    .then(res => res.text())
    .then(text => {
      if (text.trim() === "OK") {
        alert("Sugerencia borrada.");
        cargarSugerenciasAdmin();
      } else {
        alert("Error al borrar: " + text);
      }
    })
    .catch(() => alert("Error al borrar la sugerencia."));
  }
});
