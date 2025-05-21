const selector = document.getElementById('selector-mundo');
const mapaImagen = document.getElementById('mapa-imagen');
const contenedor = document.querySelector('.mapas');
const mundos = {
    traverse: {
        mapa: 'imagenes/mapa_traverse.jpg',
        trios: [
            {
                tipo: 'azul',
                top: '91%',
                left: '8%',
                icono: 'imagenes/trio_azul.png',
                imagen: 'imagenes/trio_azul_1.png'
            },{
                tipo: 'azul',
                top: '80%',
                left: '12%',
                icono: 'imagenes/trio_azul.png',
                imagen: 'imagenes/trio_azul_2.png'
            },{
                tipo: 'azul',
                top: '97%',
                left: '52%',
                icono: 'imagenes/trio_azul.png',
                imagen: 'imagenes/trio_azul_3.png'
            },{
                tipo: 'azul',
                top: '60%',
                left: '93%',
                icono: 'imagenes/trio_azul.png',
                imagen: 'imagenes/trio_azul_4.png'
            },
            {
                tipo: 'rojo',
                top: '26%',
                left: '42%',
                icono: 'imagenes/trio_rojo.png',
                imagen: 'imagenes/trio_rojo_1.png'
            },
            {
                tipo: 'rojo',
                top: '45%',
                left: '58%',
                icono: 'imagenes/trio_rojo.png',
                imagen: 'imagenes/trio_rojo_2.png'
            },
            {
                tipo: 'rojo',
                top: '68%',
                left: '17%',
                icono: 'imagenes/trio_rojo.png',
                imagen: 'imagenes/trio_rojo_3.png'
            },
            {
                tipo: 'verde',
                top: '86%',
                left: '30%',
                icono: 'imagenes/trio_verde.png',
                imagen: 'imagenes/trio_verde_1.png'
            },
            {
                tipo: 'amarillo',
                top: '75%',
                left: '90%',
                icono: 'imagenes/trio_amarillo.png',
                imagen: 'imagenes/trio_amarillo_1.png'
            },
            {
                tipo: 'blanco',
                top: '12%',
                left: '45%',
                icono: 'imagenes/trio_blanco.png',
                imagen: 'imagenes/trio_blanco_1.png'
            }
        ]
    },
    hollow: {
        mapa: 'imagenes/mapa_hollow.jpg',
    },
}

selector.addEventListener('change', () => {
  cargarMundo(selector.value);
});

function cargarMundo(nombreMundo) {
  const mundo = mundos[nombreMundo];
  mapaImagen.src = mundo.mapa;

  // Elimina iconos anteriores
  document.querySelectorAll('.icono-trio').forEach(el => el.remove());

  // Añade nuevos
  mundo.trios.forEach(trio => {
    const icon = document.createElement('img');
    icon.src = trio.icono;
    icon.className = 'icono-trio';
    icon.style.top = trio.top;
    icon.style.left = trio.left;
    icon.onclick = () => mostrarPopup(trio.imagen);
    console.log(trio);
    contenedor.appendChild(icon);
  });
}

function mostrarPopup(imagenSrc) {
  document.getElementById('popup-imagen').src = imagenSrc;
  document.getElementById('popup').style.display = 'flex';
}

function cerrarPopup() {
  document.getElementById('popup').style.display = 'none';
}

// Cargar el mundo inicial
cargarMundo('traverse');

// Obtener parámetros de la URL
const params = new URLSearchParams(window.location.search);
const mundoParam = params.get('mundo');

if (mundoParam) {
  const valorSelect = `${mundoParam}`;

  // Establecer el valor en el <select>
  selector.value = valorSelect;

  // Cargar el mapa correspondiente
  cargarMundo(valorSelect);

  // Hacer scroll hasta la sección
  const seccion = document.getElementById(mundoParam);
  if (seccion) {
    seccion.scrollIntoView({ behavior: 'smooth' });
  }
}