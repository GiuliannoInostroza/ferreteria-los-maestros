function cargarUsuariosAdmin() {
  const usuariosGuardados = localStorage.getItem("usuariosFerreteria");
  if (usuariosGuardados === null) {
    return [];
  }
  return JSON.parse(usuariosGuardados);
}

function guardarUsuariosAdmin(lista) {
  localStorage.setItem("usuariosFerreteria", JSON.stringify(lista));
}

function crearFilaUsuario(usuario) {
  const fila = document.createElement("tr");

  const celdaNombre = document.createElement("td");
  celdaNombre.textContent = usuario.nombre;
  fila.appendChild(celdaNombre);

  const celdaRut = document.createElement("td");
  celdaRut.textContent = usuario.rut;
  fila.appendChild(celdaRut);

  const celdaCorreo = document.createElement("td");
  celdaCorreo.textContent = usuario.correo;
  fila.appendChild(celdaCorreo);

  const celdaTelefono = document.createElement("td");
  celdaTelefono.textContent = usuario.telefono;
  fila.appendChild(celdaTelefono);

  const celdaTipoCliente = document.createElement("td");
  celdaTipoCliente.textContent = usuario.tipoCliente;
  fila.appendChild(celdaTipoCliente);

  const celdaAcciones = document.createElement("td");
  const contenedorAcciones = document.createElement("div");
  contenedorAcciones.classList.add("tabla-acciones");

  const botonEditar = document.createElement("button");
  botonEditar.type = "button";
  botonEditar.classList.add("btn", "btn-soft", "btn-pequeno");
  botonEditar.textContent = "Editar";
  botonEditar.addEventListener("click", function () {
    localStorage.setItem("usuarioEnEdicion", usuario.rut);
    window.location.href = "admin-usuario-form.html";
  });
  contenedorAcciones.appendChild(botonEditar);

  const botonEliminar = document.createElement("button");
  botonEliminar.type = "button";
  botonEliminar.classList.add("btn", "btn-eliminar", "btn-pequeno");
  botonEliminar.textContent = "Eliminar";
  botonEliminar.addEventListener("click", function () {
    eliminarUsuario(usuario.rut);
  });
  contenedorAcciones.appendChild(botonEliminar);

  celdaAcciones.appendChild(contenedorAcciones);
  fila.appendChild(celdaAcciones);

  return fila;
}

function mostrarTablaUsuarios() {
  const cuerpoTabla = document.querySelector("#cuerpo-tabla-usuarios");
  const listaUsuarios = cargarUsuariosAdmin();

  cuerpoTabla.replaceChildren();
  for (const usuario of listaUsuarios) {
    cuerpoTabla.appendChild(crearFilaUsuario(usuario));
  }
}

function eliminarUsuario(rut) {
  const listaUsuarios = cargarUsuariosAdmin();
  const listaFiltrada = [];
  for (const usuario of listaUsuarios) {
    if (usuario.rut !== rut) {
      listaFiltrada.push(usuario);
    }
  }
  guardarUsuariosAdmin(listaFiltrada);
  mostrarTablaUsuarios();
}

mostrarTablaUsuarios();