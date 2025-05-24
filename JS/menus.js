document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('menu-toggle');
  const panelDerecha = document.querySelector('.panel-derecha');

  toggleBtn.addEventListener('click', () => {
    const isActive = panelDerecha.classList.contains('active');
    panelDerecha.classList.toggle('active', !isActive);
    document.body.classList.toggle('menu-open', !isActive);
  });

  // Opcional: cerrar al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (panelDerecha.classList.contains('active') && !panelDerecha.contains(e.target) && e.target !== toggleBtn) {
      panelDerecha.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('menu-sidebar');
  const nav = document.getElementById('navegacion');
  const body = document.body;

  btn.addEventListener('click', () => {
    nav.classList.toggle('active');
    nav.classList.toggle('menu-abierto');
  });

  body.addEventListener('click', (e) => {
    if (body.classList.contains('menu-abierto') && !nav.contains(e.target) && e.target !== btn) {
      nav.classList.remove('active');
      nav.classList.remove('menu-abierto');
    }
  });
});

