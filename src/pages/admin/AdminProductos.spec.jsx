import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AdminProductos from "./AdminProductos";

describe("AdminProductos", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("agrega el producto nuevo a la tabla al guardar", async () => {
    const usuario = userEvent.setup();

    render(<AdminProductos />);

    await usuario.click(
      screen.getByRole("button", { name: /agregar producto/i }),
    );

    await usuario.type(screen.getByLabelText("Código"), "TL001");
    await usuario.type(screen.getByLabelText("Nombre"), "Taladro de prueba");
    await usuario.type(screen.getByLabelText("Marca"), "Bosch");
    await usuario.type(screen.getByLabelText("Categoría"), "Herramientas");
    await usuario.type(screen.getByLabelText("Precio"), "1500");
    await usuario.type(screen.getByLabelText("Stock"), "10");
    await usuario.type(screen.getByLabelText("Stock crítico"), "3");

    await usuario.click(screen.getByRole("button", { name: /guardar/i }));

    expect(screen.getByText("Taladro de prueba")).toBeInTheDocument();
  });

  it("permite editar el stock de un producto", async () => {
    const usuario = userEvent.setup();

    render(<AdminProductos />);

    const fila = screen.getByText("Cemento Polpaico gris 25 kg").closest("tr");

    await usuario.click(within(fila).getByRole("button", { name: /editar/i }));

    const stock = screen.getByLabelText("Stock");

    await usuario.clear(stock);
    await usuario.type(stock, "95");

    await usuario.click(
      screen.getByRole("button", { name: /guardar cambios/i }),
    );

    expect(screen.getByText("95")).toBeInTheDocument();
  });
});
