import { textoStock } from "./stock";

describe("textoStock", () => {
  it("muestra Sin stock cuando el stock es 0", () => {
    const producto = { stock: 0, stockCritico: 5 };

    expect(textoStock(producto)).toBe("Sin stock");
  });
});
