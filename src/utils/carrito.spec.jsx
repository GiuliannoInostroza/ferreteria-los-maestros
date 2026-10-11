import { calcularTotal, contarUnidades } from "./carrito";

describe("carrito", () => {
  const carrito = [
    { codigo: "MC001", precio: 5990, cantidad: 2 },
    { codigo: "MC007", precio: 380, cantidad: 10 },
  ];

  it("calcula el total multiplicando precio por cantidad", () => {
    expect(calcularTotal(carrito)).toBe(15780);
  });

  it("cuenta cero unidades cuando el carrito está vacío", () => {
    expect(contarUnidades([])).toBe(0);
  });
});
