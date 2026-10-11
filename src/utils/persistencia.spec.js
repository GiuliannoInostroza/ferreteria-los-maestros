import { vi } from "vitest";
import { guardarCarrito, guardarSesion } from "./persistencia";

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

describe("guardarSesion", () => {
  it("guarda el usuario de la sesión serializado", () => {
    const espia = vi.spyOn(Storage.prototype, "setItem");
    const usuario = { id: 2, nombre: "Pedro Soto", rol: "Vendedor" };

    guardarSesion(usuario);

    expect(espia).toHaveBeenCalledWith(
      "sesion",
      JSON.stringify(usuario)
    );

    espia.mockRestore();
  });
});
