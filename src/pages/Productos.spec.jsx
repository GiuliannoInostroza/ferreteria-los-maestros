import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import * as persistencia from "../utils/persistencia";
import Productos from "./Productos";

describe("Productos", () => {
  const pintura = {
    codigo: "PT001",
    nombre: "Pintura látex",
    marca: "Sipa",
    categoria: "Pinturas",
    precio: 9990,
    stock: 30,
    stockCritico: 5,
  };
  const pala = {
    codigo: "JA004",
    nombre: "Pala punta redonda",
    marca: "Corona",
    categoria: "Jardín",
    precio: 10990,
    stock: 8,
    stockCritico: 2,
  };

  it("filtra por categoría y muestra solo los productos de esa categoría", async () => {
    const espia = vi
      .spyOn(persistencia, "leerProductos")
      .mockReturnValue([pintura, pala]);
    const usuario = userEvent.setup();
    render(
      <BrowserRouter>
        <Productos onAgregar={vi.fn()} />
      </BrowserRouter>
    );

    await usuario.selectOptions(
      screen.getByLabelText("Filtrar por categoría"),
      "Pinturas"
    );

    expect(screen.getByText("Pintura látex")).toBeInTheDocument();
    expect(screen.queryByText("Pala punta redonda")).not.toBeInTheDocument();

    espia.mockRestore();
  });

  it("muestra el aviso de producto agregado al presionar Añadir", async () => {
    const espia = vi.spyOn(persistencia, "leerProductos").mockReturnValue([pintura]);
    const usuario = userEvent.setup();
    const onAgregar = vi.fn();
    render(
      <BrowserRouter>
        <Productos onAgregar={onAgregar} />
      </BrowserRouter>
    );

    await usuario.click(screen.getByRole("button", { name: "Añadir" }));

    expect(onAgregar).toHaveBeenCalledWith(pintura);
    expect(screen.getByText("Pintura látex agregado al carrito")).toBeInTheDocument();

    espia.mockRestore();
  });
});
