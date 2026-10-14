import { vi } from "vitest";
import { guardarSesion } from "./persistencia";

describe("guardarSesion", () => {
  it("guarda la sesión serializada en localStorage", () => {
    const espia = vi.spyOn(Storage.prototype, "setItem");
    const usuario = { id: 1, nombre: "Marta Rojas", rol: "Administrador" };

    guardarSesion(usuario);

    expect(espia).toHaveBeenCalledWith("sesion", JSON.stringify(usuario));

    espia.mockRestore();
  });
});
