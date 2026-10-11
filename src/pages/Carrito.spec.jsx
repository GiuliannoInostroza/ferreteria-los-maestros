import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Carrito from "./Carrito";

describe("Carrito", () => {
  const carrito = [
    { codigo: "MC001", nombre: "Cemento", precio: 5990, stock: 80, cantidad: 1 },
    { codigo: "MC007", nombre: "Ladrillo", precio: 380, stock: 500, cantidad: 3 },
  ];

  it("muestra un mensaje cuando el carrito está vacío", () => {
    render(
      <BrowserRouter>
        <Carrito carrito={[]} />
      </BrowserRouter>
    );
    expect(screen.getByText(/carrito está vacío/i)).toBeInTheDocument();
  });

  it("muestra todos los productos del carrito", () => {
    render(
      <BrowserRouter>
        <Carrito carrito={carrito} />
      </BrowserRouter>
    );
    expect(screen.getByText("Cemento")).toBeInTheDocument();
    expect(screen.getByText("Ladrillo")).toBeInTheDocument();
  });
});
