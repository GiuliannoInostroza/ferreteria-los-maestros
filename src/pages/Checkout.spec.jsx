import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Checkout from "./Checkout";

describe("Checkout", () => {
  const carrito = [
    { codigo: "MC001", nombre: "Cemento", precio: 5990, stock: 80, cantidad: 2 },
  ];

  it("muestra error cuando el nombre está vacío", async () => {
    const usuario = userEvent.setup();
    render(
      <BrowserRouter>
        <Checkout carrito={carrito} onVaciar={vi.fn()} />
      </BrowserRouter>
    );

    await usuario.click(screen.getByRole("button", { name: /confirmar/i }));

    expect(screen.getByText("Nombre obligatorio")).toBeInTheDocument();
  });

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
    await usuario.selectOptions(
      screen.getByLabelText("Entrega"),
      "Retiro en tienda"
    );
    await usuario.click(screen.getByRole("button", { name: /confirmar/i }));

    expect(onVaciar).toHaveBeenCalled();
    expect(
      screen.getByRole("heading", { name: /compra exitosa/i })
    ).toBeInTheDocument();
  });

  it("muestra pago fallido cuando la cantidad supera el stock", async () => {
    const usuario = userEvent.setup();
    const sinStock = [{ ...carrito[0], cantidad: 81 }];
    render(
      <BrowserRouter>
        <Checkout carrito={sinStock} onVaciar={vi.fn()} />
      </BrowserRouter>
    );

    await usuario.type(screen.getByLabelText("Nombre"), "Giulianno");
    await usuario.type(screen.getByLabelText("Correo"), "giu@duocuc.cl");
    await usuario.selectOptions(
      screen.getByLabelText("Entrega"),
      "Retiro en tienda"
    );
    await usuario.click(screen.getByRole("button", { name: /confirmar/i }));

    expect(
      screen.getByRole("heading", { name: /no se pudo realizar el pago/i })
    ).toBeInTheDocument();
  });
});
