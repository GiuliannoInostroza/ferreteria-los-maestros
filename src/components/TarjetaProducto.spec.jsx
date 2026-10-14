import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import TarjetaProducto from "./TarjetaProducto";

describe("TarjetaProducto", () => {
  const producto = {
    codigo: "MC001",
    nombre: "Cemento",
    marca: "Polpaico",
    categoria: "Materiales de Construcción",
    precio: 5990,
    stock: 80,
    stockCritico: 20,
  };

  it("muestra Sin stock y deshabilita el botón cuando el stock es 0", () => {
    render(
      <BrowserRouter>
        <TarjetaProducto producto={{ ...producto, stock: 0 }} onAgregar={vi.fn()} />
      </BrowserRouter>
    );

    expect(screen.getByText("Sin stock")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Añadir" })).toBeDisabled();
  });

  it("avisa cuando quedan pocas unidades y ejecuta onAgregar con el producto", async () => {
    const usuario = userEvent.setup();
    const onAgregar = vi.fn();
    const pocas = { ...producto, stock: 10 };
    render(
      <BrowserRouter>
        <TarjetaProducto producto={pocas} onAgregar={onAgregar} />
      </BrowserRouter>
    );

    await usuario.click(screen.getByRole("button", { name: "Añadir" }));

    expect(screen.getByText("Solo quedan 10")).toBeInTheDocument();
    expect(onAgregar).toHaveBeenCalledWith(pocas);
  });
});
