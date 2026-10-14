export function mensajeAgregado(producto) {
  return `${producto.nombre} agregado al carrito`;
}

export function mensajeQuitado() {
  return "Producto quitado del carrito";
}

export function mensajeGuardado(tipo, editando) {
  if (editando) return `${tipo} actualizado correctamente`;
  return `${tipo} agregado correctamente`;
}

export function mensajeEliminado(tipo) {
  return `${tipo} eliminado correctamente`;
}

export function mensajeEstado(usuario) {
  if (usuario.activo) return `Usuario ${usuario.nombre} desactivado`;
  return `Usuario ${usuario.nombre} activado`;
}
