// ================= MENU =================
const data = {
    name: "Menu",
    children: [
        {
            name: "PCs Armadas",
            children: [
                { name: "Hogar y Oficina", link: "hogar-oficina.html" },
                { name: "Gamers", link: "gamers.html" }
            ]
        },
        {
            name: "Componentes",
            children: [
                { name: "Procesadores", link: "#" },
                { name: "RAM", link: "#" },
                { name: "Placas de Video", link: "#" },
                { name: "Almacenamiento", link: "#" }
            ]
        },
        {
            name: "Periféricos",
            children: [
                { name: "Monitores", link: "#" },
                { name: "Teclados", link: "#" },
                { name: "Mouses", link: "#" },
                { name: "Auriculares", link: "#" }
            ]
        },
        {
            name: "Notebooks",
            children: [
                { name: "Notebooks", link: "#" },
                { name: "Mini PC", link: "#" }
            ]
        }
    ]
};

function crearNodo(nodo) {
    const cont = document.createElement("div");
    const btn = document.createElement("div");

    btn.className = "menu-btn";
    btn.textContent = nodo.name;
    cont.appendChild(btn);

    if(nodo.children){
        const hijos = document.createElement("div");
        hijos.className = "ml-4 hidden";

        nodo.children.forEach(h => hijos.appendChild(crearNodo(h)));

        btn.onclick = () => hijos.classList.toggle("hidden");
        cont.appendChild(hijos);
    }

    if(nodo.link){
        btn.onclick = () => location.href = nodo.link;
    }

    return cont;
}

document.getElementById("tree").appendChild(crearNodo(data));

// ================= SECCION =================
document.getElementById("titulo").textContent = seccion.titulo;
document.getElementById("descripcion").textContent = seccion.descripcion;

const contenedor = document.getElementById("productos");

seccion.productos.forEach(p => {
    const card = document.createElement("div");
    card.className = "card bg-zinc-800 rounded-3xl overflow-hidden";

    card.innerHTML = `
        <img src="${p.img}" class="w-full h-56 object-cover">
        <div class="p-4">
            <h3 class="font-semibold">${p.nombre}</h3>
            <p class="text-sm text-zinc-400">${p.specs}</p>
            <span class="text-orange-400 font-bold block mt-2">$${p.precio.toLocaleString()}</span>
        </div>
    `;

    card.onclick = () => abrirModal(p);
    contenedor.appendChild(card);
});

// ================= MODAL =================
function abrirModal(p){
    const modal = document.getElementById("modal");
    const contenido = document.getElementById("modalContenido");

    contenido.innerHTML = `
        <img src="${p.img}" class="w-full h-80 object-cover rounded-xl">
        <div>
            <h2 class="text-2xl font-bold mb-2">${p.nombre}</h2>
            <p class="text-zinc-400 mb-4">${p.specs}</p>
            <p class="mb-6">${p.desc}</p>
            <span class="text-3xl text-orange-400 font-bold">$${p.precio.toLocaleString()}</span>
            <button class="mt-6 w-full bg-orange-500 py-3 rounded-xl hover:bg-orange-600 transition">
                Agregar al carrito 🛒
            </button>
        </div>
    `;

    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function cerrarModal(){
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
}

lucide.createIcons();
