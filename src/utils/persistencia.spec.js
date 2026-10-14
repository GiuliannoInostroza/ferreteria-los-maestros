import { vi } from "vitest";
import {
  guardarCarrito,
  guardarSesion,
  leerCarrito,
  leerSesion,
} from "./persistencia";

describe("guardarCarrito", () => {
  it("guarda el carrito y la sesión serializados y los vuelve a leer", () => {
    const espia = vi.spyOn(Storage.prototype, "setItem");
    const datos = [{ codigo: "MC001", nombre: "Cemento", cantidad: 1 }];
    const sesion = { nombre: "Marta Rojas", rol: "Administrador" };

    expect(leerCarrito()).toEqual([]);
    expect(leerSesion()).toBeNull();

    guardarCarrito(datos);
    guardarSesion(sesion);

    expect(espia).toHaveBeenCalledWith("carrito", JSON.stringify(datos));
    expect(espia).toHaveBeenCalledWith("sesion", JSON.stringify(sesion));
    expect(leerCarrito()).toEqual(datos);
    expect(leerSesion()).toEqual(sesion);

    espia.mockRestore();
  });
});
