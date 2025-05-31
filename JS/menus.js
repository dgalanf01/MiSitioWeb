document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('menu-toggle');
  const panelDerecha = document.querySelector('.panel-derecha');

  toggleBtn.addEventListener('click', () => {
    const isActive = panelDerecha.classList.contains('active');
    panelDerecha.classList.toggle('active', !isActive);
    document.body.classList.toggle('menu-open', !isActive);

    // Ocultar botón cuando el menú está activo
    toggleBtn.classList.toggle('oculto', !isActive);
  });

  document.addEventListener('click', (e) => {
    if (panelDerecha.classList.contains('active') && !panelDerecha.contains(e.target) && e.target !== toggleBtn) {
      panelDerecha.classList.remove('active');
      document.body.classList.remove('menu-open');

      // Mostrar botón de nuevo
      toggleBtn.classList.remove('oculto');
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const sidebarBtn = document.getElementById('menu-sidebar');
  const nav = document.getElementById('navegacion');
  const body = document.body;

  sidebarBtn.addEventListener('click', () => {
    const isActive = nav.classList.contains('active');
    nav.classList.toggle('active', !isActive);
    body.classList.toggle('menu-abierto', !isActive);

    // Ocultar botón cuando el menú está activo
    sidebarBtn.classList.toggle('oculto', !isActive);
  });

  body.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && !nav.contains(e.target) && e.target !== sidebarBtn) {
      nav.classList.remove('active');
      body.classList.remove('menu-abierto');

      // Mostrar botón de nuevo
      sidebarBtn.classList.remove('oculto');
    }
  });
});
