function mostrarDetalle() {
  const contenedor = document.querySelector("#detalle-producto");
  if (contenedor === null) {
    return;
  }

  const parametros = new URLSearchParams(window.location.search);
  const codigo = parametros.get("id");

  const productosGuardados = localStorage.getItem("productosFerreteria");
  const catalogo = productosGuardados !== null ? JSON.parse(productosGuardados) : productos;

  let producto = null;
  for (const item of catalogo) {
    if (item.codigo === codigo) {
      producto = item;
    }
  }

  if (producto === null) {
    contenedor.innerHTML = "<p class='carrito-vacio'>Producto no encontrado.</p>";
    return;
  }

  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta-detalle");

  const media = document.createElement("div");
  media.classList.add("detalle-media");

  const foto = document.createElement("img");
  foto.src = producto.imagen;
  foto.alt = producto.nombre;
  media.appendChild(foto);
  tarjeta.appendChild(media);

  const cuerpo = document.createElement("div");
  cuerpo.classList.add("detalle-cuerpo");

  const categoria = document.createElement("p");
  categoria.classList.add("detalle-categoria");
  categoria.textContent = producto.categoria + " · " + producto.marca;
  cuerpo.appendChild(categoria);

  const titulo = document.createElement("h1");
  titulo.textContent = producto.nombre;
  cuerpo.appendChild(titulo);

  const descripcion = document.createElement("p");
  descripcion.classList.add("detalle-descripcion");
  descripcion.textContent = producto.descripcion;
  cuerpo.appendChild(descripcion);

  const stock = document.createElement("p");
  stock.classList.add("detalle-descripcion");
  stock.textContent = producto.stock + " unidades disponibles";
  cuerpo.appendChild(stock);

  const precio = document.createElement("p");
  precio.classList.add("detalle-precio");
  precio.textContent = "$ " + producto.precio.toLocaleString("es-CL");
  cuerpo.appendChild(precio);

  const boton = document.createElement("button");
  boton.classList.add("btn");
  boton.textContent = "Añadir al carrito";
  boton.addEventListener("click", function () {
    agregarAlCarrito(producto.codigo);
  });
  cuerpo.appendChild(boton);

  tarjeta.appendChild(cuerpo);
  contenedor.appendChild(tarjeta);
}

mostrarDetalle();
