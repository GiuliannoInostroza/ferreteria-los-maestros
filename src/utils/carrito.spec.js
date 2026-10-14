import {
  agregarProducto,
  calcularTotal,
  contarUnidades,
  hayProductoSinStock,
  modificarCantidad,
  quitarProducto,
} from "./carrito";

describe("calcularTotal", () => {
  it("calcula el total y las unidades y detecta cantidades sobre el stock", () => {
    const carrito = [
      { codigo: "MC001", precio: 5990, stock: 80, cantidad: 2 },
      { codigo: "HM001", precio: 1000, stock: 2, cantidad: 3 },
    ];

    expect(calcularTotal(carrito)).toBe(14980);
    expect(contarUnidades(carrito)).toBe(5);
    expect(hayProductoSinStock(carrito)).toBe(true);
    expect(hayProductoSinStock([carrito[0]])).toBe(false);
  });
});

describe("agregarProducto", () => {
  it("agrega el producto nuevo o suma una unidad si ya está en el carrito", () => {
    const producto = { codigo: "MC001", nombre: "Cemento" };

    const nuevo = agregarProducto([], producto);
    const repetido = agregarProducto(nuevo, producto);

    expect(nuevo).toEqual([{ codigo: "MC001", nombre: "Cemento", cantidad: 1 }]);
    expect(repetido).toEqual([{ codigo: "MC001", nombre: "Cemento", cantidad: 2 }]);
  });
});

describe("modificarCantidad", () => {
  it("cambia la cantidad, elimina el producto al llegar a 0 y permite quitarlo", () => {
    const carrito = [
      { codigo: "MC001", cantidad: 2 },
      { codigo: "HM001", cantidad: 1 },
    ];

    const mas = modificarCantidad(carrito, "MC001", 1);
    const sinMartillo = modificarCantidad(carrito, "HM001", -1);

    expect(mas[0].cantidad).toBe(3);
    expect(sinMartillo).toEqual([{ codigo: "MC001", cantidad: 2 }]);
    expect(quitarProducto(carrito, "MC001")).toEqual([
      { codigo: "HM001", cantidad: 1 },
    ]);
  });
});
