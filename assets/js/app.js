// Menú de navegación en pantallas pequeñas
const botonMenu = document.querySelector("#boton-menu");
const menu = document.querySelector(".menu");

if (botonMenu !== null && menu !== null) {
  botonMenu.addEventListener("click", function () {
    menu.classList.toggle("abierto");
    const abierto = menu.classList.contains("abierto");
    botonMenu.setAttribute("aria-expanded", abierto);
  });
}

// Tarjetas de productos generadas desde el arreglo
function mostrarProductos() {
  const lista = document.querySelector("#producto-lista");
  if (lista === null) {
    return;
  }

  // En la home solo se muestran los primeros 8 como destacados
  const esHome = location.pathname.endsWith("index.html") || location.pathname.endsWith("/");
  const productosGuardados = localStorage.getItem("productosFerreteria");
  const catalogo = productosGuardados !== null ? JSON.parse(productosGuardados) : productos;
  const destacados = esHome ? catalogo.slice(0, 8) : catalogo;

  lista.innerHTML = "";

  for (const producto of destacados) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("producto-tarjeta");

    const media = document.createElement("div");
    media.classList.add("producto-media");

    const foto = document.createElement("img");
    foto.src = producto.imagen;
    foto.alt = producto.nombre;
    media.appendChild(foto);
    tarjeta.appendChild(media);

    const cuerpo = document.createElement("div");
    cuerpo.classList.add("producto-cuerpo");

    const nombre = document.createElement("a");
    nombre.classList.add("producto-nombre");
    nombre.href = "producto.html?id=" + producto.codigo;
    nombre.textContent = producto.nombre;
    cuerpo.appendChild(nombre);

    const fila = document.createElement("div");
    fila.classList.add("producto-fila");

    const precio = document.createElement("span");
    precio.classList.add("producto-precio");
    precio.textContent = "$ " + producto.precio.toLocaleString("es-CL");
    fila.appendChild(precio);

    const stock = document.createElement("span");
    stock.classList.add("producto-stock");
    stock.textContent = producto.stock + " disponibles";
    if (producto.stock <= producto.stockCritico) {
      stock.classList.add("stock-bajo");
      stock.textContent = "Solo quedan " + producto.stock;
    }
    fila.appendChild(stock);

    cuerpo.appendChild(fila);

    const boton = document.createElement("button");
    boton.classList.add("producto-btn");
    boton.textContent = "Añadir";
    cuerpo.appendChild(boton);

    tarjeta.appendChild(cuerpo);
    lista.appendChild(tarjeta);
  }
}

mostrarProductos();
