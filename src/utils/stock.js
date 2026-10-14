export function textoStock(producto) {
  if (producto.stock === 0) return "Sin stock";
  if (producto.stock <= producto.stockCritico) {
    return `Solo quedan ${producto.stock}`;
  }
  return `${producto.stock} disponibles`;
}

export function claseStock(producto) {
  if (producto.stock === 0) return "text-danger";
  if (producto.stock <= producto.stockCritico) return "text-warning";
  return "text-success";
}
