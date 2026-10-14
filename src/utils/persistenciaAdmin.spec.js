import { vi } from "vitest";
import { productos } from "../data/productos";
import { guardarProductos, leerProductos } from "./persistencia";

describe("guardarProductos", () => {
  it("lee los productos iniciales, guarda la lista de la administración y la vuelve a leer", () => {
    const espia = vi.spyOn(Storage.prototype, "setItem");
    const lista = [{ codigo: "MC001", nombre: "Cemento", stock: 80 }];

    expect(leerProductos()).toEqual(productos);

    guardarProductos(lista);

    expect(espia).toHaveBeenCalledWith("productosAdmin", JSON.stringify(lista));
    expect(leerProductos()).toEqual(lista);

    espia.mockRestore();
  });
});
