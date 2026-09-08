function cargarProductosAdmin() {
  const productosGuardados = localStorage.getItem("productosFerreteria");
  if (productosGuardados === null) {
    localStorage.setItem("productosFerreteria", JSON.stringify(productos));
    return productos;
  }
  return JSON.parse(productosGuardados);
}

function guardarProductosAdmin(lista) {
  localStorage.setItem("productosFerreteria", JSON.stringify(lista));
}

function crearFilaProducto(producto) {
  const fila = document.createElement("tr");

  const celdaCodigo = document.createElement("td");
  celdaCodigo.textContent = producto.codigo;
  fila.appendChild(celdaCodigo);

  const celdaNombre = document.createElement("td");
  celdaNombre.textContent = producto.nombre;
  fila.appendChild(celdaNombre);

  const celdaCategoria = document.createElement("td");
  celdaCategoria.textContent = producto.categoria;
  fila.appendChild(celdaCategoria);

  const celdaPrecio = document.createElement("td");
  celdaPrecio.textContent = "$ " + producto.precio.toLocaleString("es-CL");
  fila.appendChild(celdaPrecio);

  const celdaStock = document.createElement("td");
  celdaStock.textContent = producto.stock;
  fila.appendChild(celdaStock);

  const celdaAcciones = document.createElement("td");
  const contenedorAcciones = document.createElement("div");
  contenedorAcciones.classList.add("tabla-acciones");

  const botonEditar = document.createElement("a");
  botonEditar.href = "admin-producto-form.html?codigo=" + producto.codigo;
  botonEditar.classList.add("btn", "btn-soft", "btn-pequeno");
  botonEditar.textContent = "Editar";
  contenedorAcciones.appendChild(botonEditar);

  const botonEliminar = document.createElement("button");
  botonEliminar.type = "button";
  botonEliminar.classList.add("btn", "btn-eliminar", "btn-pequeno");
  botonEliminar.textContent = "Eliminar";
  botonEliminar.addEventListener("click", function () {
    eliminarProducto(producto.codigo);
  });
  contenedorAcciones.appendChild(botonEliminar);

  celdaAcciones.appendChild(contenedorAcciones);
  fila.appendChild(celdaAcciones);

  return fila;
}

function mostrarTablaProductos() {
  const cuerpoTabla = document.querySelector("#cuerpo-tabla-productos");
  const listaProductos = cargarProductosAdmin();

  cuerpoTabla.replaceChildren();
  for (const producto of listaProductos) {
    cuerpoTabla.appendChild(crearFilaProducto(producto));
  }
}

function eliminarProducto(codigo) {
  const listaProductos = cargarProductosAdmin();
  const listaFiltrada = [];
  for (const producto of listaProductos) {
    if (producto.codigo !== codigo) {
      listaFiltrada.push(producto);
    }
  }
  guardarProductosAdmin(listaFiltrada);
  mostrarTablaProductos();
}

mostrarTablaProductos();