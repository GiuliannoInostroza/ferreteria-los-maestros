import { formatearPrecio } from "./precio";

describe("formatearPrecio", () => {
  it("formatea un valor positivo", () => {
    expect(formatearPrecio(15000)).toContain("15.000");
  });
});
