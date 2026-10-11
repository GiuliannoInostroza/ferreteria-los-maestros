// src/utils/precio.spec.jsx
import { formatearPrecio } from "./precio";

describe("formatearPrecio", () => {
  // Prueba 10 (función): un precio positivo se muestra con separador de miles chileno
  it("formatea un valor positivo", () => {
    expect(formatearPrecio(15000)).toContain("15.000");
  });
});
