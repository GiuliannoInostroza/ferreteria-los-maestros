import { vi } from "vitest";
import { obtenerNombres } from "./productos";

it("obtiene los nombres entregados por el servicio", async () => {
  const servicio = {
    listar: vi.fn().mockResolvedValue([
      { codigo: "MC001", nombre: "Cemento", stock: 80 },
    ]),
  };

  const nombres = await obtenerNombres(servicio);

  expect(servicio.listar).toHaveBeenCalled();
  expect(nombres).toEqual(["Cemento"]);
});
