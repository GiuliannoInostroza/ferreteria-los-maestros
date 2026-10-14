import { formatearPrecio } from "./precio";

describe("formatearPrecio - precio cero", () => {
  it("muestra Gratis cuando el valor es cero", () => {
    expect(formatearPrecio(0)).toBe("Gratis");
  });
});
