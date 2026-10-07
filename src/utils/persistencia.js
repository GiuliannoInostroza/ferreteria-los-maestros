export function guardarCarrito(datos) {
  localStorage.setItem(
    "carrito",
    JSON.stringify(datos)
  );
}
