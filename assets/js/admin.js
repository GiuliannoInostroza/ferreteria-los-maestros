const contadorProductos = document.querySelector("#contador-productos");
const contadorUsuarios = document.querySelector("#contador-usuarios");

if (contadorProductos !== null) {
  contadorProductos.textContent = `${productos.length} productos en el catálogo`;
}

if (contadorUsuarios !== null) {
  const usuariosGuardados = localStorage.getItem("usuariosFerreteria");
  const listaUsuarios = usuariosGuardados !== null ? JSON.parse(usuariosGuardados) : [];
  contadorUsuarios.textContent = `${listaUsuarios.length} usuarios registrados`;
}