/* ================================================================
   Mamani`s — main.js
   toda la lógica e interactividad del sitio.
   Se carga al final del body.
================================================================ */


/* ── 1. DATOS DEL MENÚ ───────────────────────────────────────────
   Un array de objetos que representa las categorías y subcategorías.
   agregar una categoría nueva ---> solo tocamos este array.
------------------------------------------------------------------ */
const menuData = [
    {
        name: "PCs Armadas",
        icon: "monitor",
        children: [
            { name: "Hogar y Oficina",  link: "seccion-hogar-y-oficina.html" },
            { name: "Entretenimiento",  link: "seccion-entretenimiento.html" },
            { name: "Gamers",           link: "seccion-gamers.html" }
        ]
    },
    {
        name: "Componentes",
        icon: "cpu",
        children: [
            { name: "Procesadores",     link: "seccion-procesadores.html" },
            { name: "RAM",              link: "ram.html" },
            { name: "Placas de Video",  link: "placas-de-video.html" },
            { name: "Almacenamiento",   link: "almacenamiento,html" }
        ]
    },
    {
        name: "Periféricos",
        icon: "mouse",
        children: [
            { name: "Monitores",        link: "monitores.html" },
            { name: "Teclados",         link: "teclados.html" },
            { name: "Mouses",           link: "mouses.html" },
            { name: "Auriculares",      link: "auriculares.html" }
        ]
    },
    {
        name: "Notebooks",
        icon: "laptop",
        children: [
            { name: "Notebooks",        link: "notebooks.html" },
            { name: "Mini PC",          link: "mini-pcs.html" }
        ]
    }
];


/* ── 2. CONSTRUCCIÓN DEL MENÚ ────────────────────────────────────
   Recorremos el array menuData y creamos los elementos HTML
   dinámicamente con JavaScript.
------------------------------------------------------------------ */

// Agarramos el contenedor del menú del HTML
const treeContainer = document.getElementById('tree-menu');

// Recorremos cada categoría del array
menuData.forEach(function(categoria) {

    // Creamos el div que va a contener toda la categoría
    const wrap = document.createElement('div');
    wrap.className = 'tree-category';

    // Creamos el encabezado clickeable de la categoría
    const header = document.createElement('div');
    header.className = 'tree-category-header';
    header.innerHTML = `
        <div class="tree-category-left">
            <i data-lucide="${categoria.icon}" style="width:15px;height:15px"></i>
            <span>${categoria.name}</span>
        </div>
        <i data-lucide="chevron-right" class="tree-chevron" style="width:14px;height:14px"></i>
    `;

    // Creamos el contenedor de los hijos (empieza cerrado)
    const childrenWrap = document.createElement('div');
    childrenWrap.className = 'tree-children';

    // Creamos la lista interior con los links
    const inner = document.createElement('div');
    inner.className = 'tree-children-inner';

    // Recorremos los hijos de esta categoría
    categoria.children.forEach(function(hijo) {
        const link = document.createElement('a');
        link.className = 'tree-link';
        link.href = hijo.link;
        link.textContent = hijo.name;
        inner.appendChild(link);
    });

    childrenWrap.appendChild(inner);

    // ── EVENTO CLICK ──
    // Cuando el usuario hace clic en una categoría, la abre o cierra.
    // Si había otra abierta, la cerramos primero (acordeón).
    header.addEventListener('click', function() {

        // ¿Esta categoría ya estaba abierta?
        const yaEstabaAbierta = header.classList.contains('open');

        // Cerramos TODAS las categorías abiertas
        document.querySelectorAll('.tree-category-header.open').forEach(function(h) {
            h.classList.remove('open');
        });
        document.querySelectorAll('.tree-children.open').forEach(function(c) {
            c.classList.remove('open');
        });

        // Si NO estaba abierta, la abrimos
        if (!yaEstabaAbierta) {
            header.classList.add('open');
            childrenWrap.classList.add('open');
        }
        // Si ya estaba abierta, el paso anterior la cerró (efecto toggle)
    });

    // Armamos la estructura: header + hijos dentro del wrap
    wrap.appendChild(header);
    wrap.appendChild(childrenWrap);

    // Insertamos la categoría en el HTML
    treeContainer.appendChild(wrap);
});


/* ── 3. CARRITO ──────────────────────────────────────────────────
   Manejamos el contador del carrito y la notificación (toast)
   cuando el usuario hace clic en "Agregar".
------------------------------------------------------------------ */

// Variable que guarda cuántos productos hay en el carrito
let cantidadCarrito = 0;

// Referencias a los elementos del HTML
const cartCountEl = document.getElementById('cartCount');
const toast       = document.getElementById('toast');

// Variable para controlar el temporizador del toast
let toastTimer;

// Escuchamos clicks en TODA la página (event delegation)
// Es más eficiente que poner un listener en cada botón
document.addEventListener('click', function(evento) {

    // closest() busca si el elemento clickeado (o algún padre suyo)
    // tiene la clase 'agregar-carrito'
    if (evento.target.closest('.agregar-carrito')) {

        // Sumamos al contador
        cantidadCarrito++;

        // Actualizamos el número visible en el header
        cartCountEl.textContent = cantidadCarrito;

        // Mostramos el toast
        // Primero cancelamos el timer anterior para evitar que desaparezca
        // si el usuario hace clic varias veces seguidas
        clearTimeout(toastTimer);
        toast.classList.add('show');

        // Ocultamos el toast después de 2.2 segundos
        toastTimer = setTimeout(function() {
            toast.classList.remove('show');
        }, 2200);
    }
});


/* ── 4. INICIALIZAR ÍCONOS ───────────────────────────────────────
   Lucide requiere que llamemos a createIcons() después de
   insertar todos los elementos con data-lucide en el DOM.
   Sin esta línea los íconos no aparecen.
------------------------------------------------------------------ */
lucide.createIcons();
