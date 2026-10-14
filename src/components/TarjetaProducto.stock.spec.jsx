import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TarjetaProducto from "./TarjetaProducto";

describe("TarjetaProducto - stock", () => {
  const producto = {
    codigo: "HM001",
    nombre: "Taladro",
    marca: "Bosch",
    categoria: "Herramientas",
    precio: 25000,
    stock: 3,
    stockCritico: 5,
  };

  it("avisa cuántas unidades quedan cuando el stock es bajo", () => {
    render(
      <BrowserRouter>
        <TarjetaProducto producto={producto} />
      </BrowserRouter>
    );

    expect(screen.getByText("Solo quedan 3")).toBeInTheDocument();
  });

  it("no muestra el botón Añadir si no recibe onAgregar", () => {
    render(
      <BrowserRouter>
        <TarjetaProducto producto={producto} />
      </BrowserRouter>
    );

    expect(screen.queryByRole("button", { name: /añadir/i })).toBeNull();
  });
});
