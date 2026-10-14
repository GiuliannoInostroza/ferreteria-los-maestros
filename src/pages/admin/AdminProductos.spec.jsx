import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AdminProductos from "./AdminProductos";

describe("AdminProductos", () => {
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
    localStorage.setItem(
      "productosAdmin",
      JSON.stringify([
        {
          codigo: "MC001",
          nombre: "Cemento Polpaico gris 25 kg",
          marca: "Polpaico",
          categoria: "Materiales de Construcción",
          precio: 5990,
          stock: 80,
          stockCritico: 20,
          descripcion: "Cemento gris de uso general para hormigones y morteros.",
        },
      ]),
    );
    const usuario = userEvent.setup();

    render(<AdminProductos />);

    await usuario.click(screen.getByRole("button", { name: /editar/i }));
    await usuario.type(screen.getByLabelText("Stock"), "5");
    await usuario.click(
      screen.getByRole("button", { name: /guardar cambios/i }),
    );

    expect(screen.getByText("805")).toBeInTheDocument();
  });

  it("elimina un producto de la tabla", async () => {
    localStorage.setItem(
      "productosAdmin",
      JSON.stringify([
        {
          codigo: "MC001",
          nombre: "Cemento Polpaico gris 25 kg",
          marca: "Polpaico",
          categoria: "Materiales de Construcción",
          precio: 5990,
          stock: 80,
          stockCritico: 20,
          descripcion: "Cemento gris de uso general para hormigones y morteros.",
        },
      ]),
    );
    const usuario = userEvent.setup();

    render(<AdminProductos />);

    await usuario.click(screen.getByRole("button", { name: /eliminar/i }));

    expect(
      screen.queryByText("Cemento Polpaico gris 25 kg"),
    ).not.toBeInTheDocument();
  });

  it("avisa si hay cambios sin guardar al editar otro producto", async () => {
    localStorage.setItem(
      "productosAdmin",
      JSON.stringify([
        {
          codigo: "MC001",
          nombre: "Cemento Polpaico gris 25 kg",
          marca: "Polpaico",
          categoria: "Materiales de Construcción",
          precio: 5990,
          stock: 80,
          stockCritico: 20,
          descripcion: "Cemento gris de uso general para hormigones y morteros.",
        },
      ]),
    );
    const usuario = userEvent.setup();

    render(<AdminProductos />);

    await usuario.click(screen.getByRole("button", { name: /editar/i }));
    await usuario.type(screen.getByLabelText("Stock"), "5");
    await usuario.click(screen.getByRole("button", { name: /editar/i }));

    expect(screen.getByText(/cambios sin guardar/i)).toBeInTheDocument();
  });
});
