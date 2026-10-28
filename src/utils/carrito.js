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

export function agregarProducto(carrito, producto) {
  const yaExiste = carrito.some((item) => item.codigo === producto.codigo);

  if (yaExiste) {
    return carrito.map((item) =>
      item.codigo === producto.codigo
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    );
  }

  return [...carrito, { ...producto, cantidad: 1 }];
}

export function modificarCantidad(carrito, codigo, cambio) {
  const actualizado = carrito.map((item) =>
    item.codigo === codigo
      ? { ...item, cantidad: item.cantidad + cambio }
      : item
  );

  return actualizado.filter((item) => item.cantidad > 0);
}

export function quitarProducto(carrito, codigo) {
  return carrito.filter((item) => item.codigo !== codigo);
}

export function hayProductoSinStock(carrito) {
  return carrito.some((item) => item.cantidad > item.stock);
}

export function actualizarConCatalogo(carrito, productos) {
  return carrito.map((item) => {
    const producto = productos.find((actual) => actual.codigo === item.codigo);

    return producto
      ? { ...producto, cantidad: item.cantidad }
      : { ...item, stock: 0 };
  });
}
