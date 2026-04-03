const data = {
    name: "Menu",
    icon: "gamepad-2",
    children: [
        {
            name: "PCs Armadas",
            icon: "monitor",
            children: [
                { name: "Hogar y Oficina", link: "hogaryoficina.html" },
                { name: "Entretenimiento", link: "#" },
                { name: "Gamers", link: "#" }
            ]
        },
        {
            name: "Componentes",
            icon: "cpu",
            children: [
                { name: "Procesadores", link: "#" },
                { name: "RAM", link: "#" },
                { name: "Placas de Video", link: "#" },
                { name: "Almacenamiento", link: "#" }
            ]
        },
        {
            name: "Periféricos",
            icon: "mouse",
            children: [
                { name: "Monitores", link: "#" },
                { name: "Teclados", link: "#" },
                { name: "Mouses", link: "#" },
                { name: "Auriculares", link: "#" }
            ]
        },
        {
            name: "Notebooks",
            icon: "laptop",
            children: [
                { name: "Notebooks", link: "#" },
                { name: "Mini PC", link: "#" }
            ]
        }
    ]
};

function crearNodo(nodo, root = false) {

    const contenedor = document.createElement("div");
    contenedor.className = "ml-6 mt-4";

    const tarjeta = document.createElement("div");
    tarjeta.className = "flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded cursor-pointer hover:bg-orange-500 transition";

    if(root){
        tarjeta.className = "flex items-center gap-2 bg-orange-600 px-6 py-3 rounded text-xl font-bold";
    }

    // icono
    if(nodo.icon){
        const icon = document.createElement("i");
        icon.setAttribute("data-lucide", nodo.icon);
        icon.className = "w-5 h-5";
        tarjeta.appendChild(icon);
    }

    // texto
    const texto = document.createElement("span");
    texto.textContent = nodo.name;
    tarjeta.appendChild(texto);

    contenedor.appendChild(tarjeta);

    // hijos
    let hijos = null;

    if(nodo.children){
        hijos = document.createElement("div");
        hijos.className = "ml-6 border-l border-orange-500 pl-4 animate-fade-in";
        hijos.style.display = "none";

        nodo.children.forEach(h => {
            hijos.appendChild(crearNodo(h));
        });

        contenedor.appendChild(hijos);
    }

    // CLICK (funciona para TODOS)
    tarjeta.onclick = () => {

        // si tiene link → navega
        if(nodo.link){
            location.href = nodo.link;
            return;
        }

        // si tiene hijos → despliega
        if(hijos){
            hijos.style.display = hijos.style.display === "none" ? "block" : "none";
        }
    };
    return contenedor;
}

// render
document.getElementById("tree").appendChild(crearNodo(data, true));
lucide.createIcons();
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("tree").appendChild(crearNodo(data, true));
});
