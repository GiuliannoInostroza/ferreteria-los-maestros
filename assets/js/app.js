const lista = document.querySelector("#producto-lista");

function mostrarProductos() {
  for (const producto of productos) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("producto-tarjeta");

    const imagen = document.createElement("span");
    imagen.classList.add("producto-imagen");
    imagen.textContent = producto.imagen;
    tarjeta.appendChild(imagen);

    const nombre = document.createElement("h3");
    nombre.classList.add("producto-nombre");
    nombre.textContent = producto.nombre;
    tarjeta.appendChild(nombre);

    const marca = document.createElement("p");
    marca.classList.add("producto-marca");
    marca.textContent = producto.marca;
    tarjeta.appendChild(marca);

    const precio = document.createElement("p");
    precio.classList.add("producto-precio");
    precio.textContent = "$ " + producto.precio.toLocaleString("es-CL");
    tarjeta.appendChild(precio);

    const boton = document.createElement("button");
    boton.classList.add("btn-anadir");
    boton.textContent = "Añadir al carrito";
    tarjeta.appendChild(boton);

    lista.appendChild(tarjeta);
  }
}

mostrarProductos();