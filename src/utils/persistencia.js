export function guardarCarrito(datos) {
  localStorage.setItem(
    "carrito",
    JSON.stringify(datos)
  );
}

export function guardarSesion(usuario) {
  localStorage.setItem(
    "sesion",
    JSON.stringify(usuario)
  );
}
