import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import FormularioProducto from "./FormularioProducto";

describe("FormularioProducto", () => {
  const productosExistentes = [
    {
      codigo: "MC001",
      nombre: "Cemento",
    },
  ];

  it("muestra error si el código ya existe", async () => {
    const usuario = userEvent.setup();

    render(
      <FormularioProducto
        productos={productosExistentes}
        onGuardar={vi.fn()}
        onCancelar={vi.fn()}
      />,
    );

    await usuario.type(screen.getByLabelText("Código"), "MC001");

    await usuario.click(screen.getByRole("button", { name: /guardar/i }));

    expect(
      screen.getByText("Ya existe un producto con ese código"),
    ).toBeInTheDocument();
  });
});
