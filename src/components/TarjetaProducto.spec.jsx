import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import TarjetaProducto from "./TarjetaProducto";

describe("TarjetaProducto", () => {
  it("llama onAgregar con el producto al presionar Añadir", async () => {
    const usuario = userEvent.setup();
    const onAgregar = vi.fn();

    const producto = {
      codigo: "HE001",
      nombre: "Taladro de prueba",
      marca: "Bosch",
      categoria: "Herramientas",
      precio: 29990,
      stock: 10,
      stockCritico: 3,
    };

    render(
      <BrowserRouter>
        <TarjetaProducto producto={producto} onAgregar={onAgregar} />
      </BrowserRouter>,
    );

    await usuario.click(screen.getByRole("button", { name: /añadir/i }));

    expect(onAgregar).toHaveBeenCalledWith(producto);
  });
});
