import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Checkout from "./Checkout";

describe("Checkout", () => {
  const carrito = [
    { codigo: "MC001", nombre: "Cemento", precio: 5990, stock: 80, cantidad: 2 },
  ];

  it("vacía el carrito y muestra compra exitosa con datos válidos", async () => {
    const usuario = userEvent.setup();
    const onVaciar = vi.fn();
    render(
      <BrowserRouter>
        <Checkout carrito={carrito} onVaciar={onVaciar} />
      </BrowserRouter>
    );

    await usuario.type(screen.getByLabelText("Nombre"), "Giulianno");
    await usuario.type(screen.getByLabelText("Correo"), "giu@duocuc.cl");
    await usuario.click(screen.getByRole("button", { name: /confirmar/i }));

    expect(onVaciar).toHaveBeenCalled();
    expect(
      screen.getByRole("heading", { name: /compra exitosa/i })
    ).toBeInTheDocument();
  });
});
