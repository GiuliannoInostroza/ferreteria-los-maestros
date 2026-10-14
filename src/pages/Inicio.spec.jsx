import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import * as persistencia from "../utils/persistencia";
import Inicio from "./Inicio";

describe("Inicio", () => {
  it("muestra solo los productos destacados", () => {
    const espia = vi.spyOn(persistencia, "leerProductos").mockReturnValue([
      {
        codigo: "MC001",
        nombre: "Cemento destacado",
        marca: "Polpaico",
        categoria: "Materiales de Construcción",
        precio: 5990,
        stock: 80,
        stockCritico: 20,
        destacado: true,
      },
      {
        codigo: "PT001",
        nombre: "Pintura común",
        marca: "Sipa",
        categoria: "Pinturas",
        precio: 9990,
        stock: 30,
        stockCritico: 5,
      },
    ]);
    render(
      <BrowserRouter>
        <Inicio />
      </BrowserRouter>
    );

    expect(screen.getByText("Cemento destacado")).toBeInTheDocument();
    expect(screen.queryByText("Pintura común")).not.toBeInTheDocument();

    espia.mockRestore();
  });
});
