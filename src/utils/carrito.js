export function calcularTotal(carrito) {
  let total = 0;

  for (const item of carrito) {
    total = total + item.precio * item.cantidad;
  }

  return total;
}

export function contarUnidades(carrito) {
  let unidades = 0;

  for (const item of carrito) {
    unidades = unidades + item.cantidad;
  }

  return unidades;
}
