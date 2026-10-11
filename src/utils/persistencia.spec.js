import { vi } from "vitest";
import { guardarCarrito } from "./persistencia";

describe("guardarCarrito", () => {
  it("guarda el carrito serializado", () => {
    const espia = vi.spyOn(Storage.prototype, "setItem");
    const datos = [{ codigo: "MC001", nombre: "Cemento", cantidad: 1 }];

    guardarCarrito(datos);

    expect(espia).toHaveBeenCalledWith(
      "carrito",
      JSON.stringify(datos)
    );

    espia.mockRestore();
  });
});
