export function productosDeCategoria(productos, categoria) {
  return productos.filter((producto) => producto.categoria === categoria);
}

export function productosEnOferta(productos) {
  return productos.filter((producto) => producto.oferta);
}
