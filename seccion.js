/* ================================================================
   MEXX — seccion.js
   Lógica específica de las páginas de sección:
   - Ordenar productos (precio, nombre)
================================================================ */


/* ── ORDENAMIENTO DE PRODUCTOS ───────────────────────────────────
   Cuando el usuario cambia el select de "Ordenar por",
   reordenamos las cards dentro del grid sin recargar la página.
------------------------------------------------------------------ */

const filtroOrden  = document.getElementById('filtroOrden');
const productGrid  = document.getElementById('productGrid');
const sinResultados = document.getElementById('sinResultados');

// Solo ejecutamos si estos elementos existen en la página
if (filtroOrden && productGrid) {

    filtroOrden.addEventListener('change', function() {

        // 1. Obtenemos todas las cards actuales como un array
        //    Array.from convierte la NodeList en un array real
        const cards = Array.from(productGrid.querySelectorAll('.product-card'));

        // Si no hay cards, no hacemos nada
        if (cards.length === 0) return;

        // 2. Ordenamos el array según la opción elegida
        const criterio = filtroOrden.value;

        cards.sort(function(a, b) {

            if (criterio === 'precio-asc') {
                // Menor precio primero
                // data-precio es un atributo que pusimos en el HTML
                return parseInt(a.dataset.precio) - parseInt(b.dataset.precio);
            }

            if (criterio === 'precio-desc') {
                // Mayor precio primero
                return parseInt(b.dataset.precio) - parseInt(a.dataset.precio);
            }

            if (criterio === 'nombre') {
                // Orden alfabético A-Z
                // localeCompare maneja tildes y ñ correctamente
                return a.dataset.nombre.localeCompare(b.dataset.nombre, 'es');
            }

            // 'default' → no cambiamos el orden
            return 0;
        });

        // 3. Re-insertamos las cards en el nuevo orden
        //    appendChild mueve el elemento si ya existe en el DOM
        cards.forEach(function(card) {
            productGrid.appendChild(card);
        });

        // 4. Re-inicializamos los íconos de Lucide
        //    (algunos pueden haberse "perdido" al mover elementos)
        lucide.createIcons();
    });
}
