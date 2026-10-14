import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Checkout from "./Checkout";

describe("Checkout - validaciones y resultados", () => {
  const carrito = [
    {
      codigo: "MC001",
      nombre: "Cemento",
      precio: 5990,
      stock: 80,
      cantidad: 2,
    },
  ];

  function mostrarCheckout(props = {}) {
    render(
      <BrowserRouter>
        <Checkout carrito={carrito} onVaciar={vi.fn()} {...props} />
      </BrowserRouter>
    );
  }

  async function llenarDatosBasicos(usuario) {
    await usuario.type(screen.getByLabelText("Nombre"), "Giulianno");
    await usuario.type(screen.getByLabelText("Correo"), "giu@duocuc.cl");
  }

  it("avisa que no hay productos cuando el carrito está vacío", () => {
    mostrarCheckout({ carrito: [] });

    expect(
      screen.getByText("No hay productos en tu carrito.")
    ).toBeInTheDocument();
  });

  it("muestra errores obligatorios al confirmar sin datos", async () => {
    const usuario = userEvent.setup();
    mostrarCheckout();

    await usuario.click(screen.getByRole("button", { name: /confirmar/i }));

    expect(screen.getByText("Nombre obligatorio")).toBeInTheDocument();
    expect(screen.getByText("Correo obligatorio")).toBeInTheDocument();
  });

  it("muestra error si el dominio del correo no está permitido", async () => {
    const usuario = userEvent.setup();
    mostrarCheckout();

    await usuario.type(screen.getByLabelText("Nombre"), "Giulianno");
    await usuario.type(screen.getByLabelText("Correo"), "giu@hotmail.com");
    await usuario.click(screen.getByRole("button", { name: /confirmar/i }));

    expect(screen.getByText(/usa un correo/i)).toBeInTheDocument();
  });

  it("completa nombre y correo con los datos de la sesión", () => {
    mostrarCheckout({
      usuario: { nombre: "Luis Vega", correo: "cliente@gmail.com" },
    });

    expect(screen.getByLabelText("Nombre").value).toBe("Luis Vega");
    expect(screen.getByLabelText("Correo").value).toBe("cliente@gmail.com");
  });

  it("pide la dirección cuando la entrega es a domicilio", async () => {
    const usuario = userEvent.setup();
    mostrarCheckout();

    expect(screen.queryByLabelText("Dirección")).toBeNull();

    await usuario.selectOptions(
      screen.getByLabelText("Entrega"),
      "Despacho a domicilio"
    );

    expect(screen.getByLabelText("Dirección")).toBeInTheDocument();
  });

  it("muestra error si falta la dirección en un despacho", async () => {
    const usuario = userEvent.setup();
    mostrarCheckout();

    await llenarDatosBasicos(usuario);
    await usuario.selectOptions(
      screen.getByLabelText("Entrega"),
      "Despacho a domicilio"
    );
    await usuario.click(screen.getByRole("button", { name: /confirmar/i }));

    expect(screen.getByText("Dirección obligatoria")).toBeInTheDocument();
  });

  it("muestra error si la dirección es demasiado corta", async () => {
    const usuario = userEvent.setup();
    mostrarCheckout();

    await llenarDatosBasicos(usuario);
    await usuario.selectOptions(
      screen.getByLabelText("Entrega"),
      "Despacho a domicilio"
    );
    await usuario.type(screen.getByLabelText("Dirección"), "abc");
    await usuario.click(screen.getByRole("button", { name: /confirmar/i }));

    expect(screen.getByText("Ingresa una dirección válida")).toBeInTheDocument();
  });

  it("muestra la dirección en el resumen de un despacho exitoso", async () => {
    const usuario = userEvent.setup();
    mostrarCheckout();

    await llenarDatosBasicos(usuario);
    await usuario.selectOptions(
      screen.getByLabelText("Entrega"),
      "Despacho a domicilio"
    );
    await usuario.type(screen.getByLabelText("Dirección"), "Calle Larga 123");
    await usuario.click(screen.getByRole("button", { name: /confirmar/i }));

    expect(screen.getByText(/Calle Larga 123/)).toBeInTheDocument();
  });

  it("muestra la compra fallida si la cantidad supera el stock", async () => {
    const usuario = userEvent.setup();
    mostrarCheckout({ carrito: [{ ...carrito[0], cantidad: 81 }] });

    await llenarDatosBasicos(usuario);
    await usuario.click(screen.getByRole("button", { name: /confirmar/i }));

    expect(
      screen.getByRole("heading", { name: /no se pudo realizar el pago/i })
    ).toBeInTheDocument();
  });

  it("vuelve al formulario al presionar Volver a intentar", async () => {
    const usuario = userEvent.setup();
    mostrarCheckout({ carrito: [{ ...carrito[0], cantidad: 81 }] });

    await llenarDatosBasicos(usuario);
    await usuario.click(screen.getByRole("button", { name: /confirmar/i }));
    await usuario.click(
      screen.getByRole("button", { name: /volver a intentar/i })
    );

    expect(
      screen.getByRole("heading", { name: /finalizar compra/i })
    ).toBeInTheDocument();
  });
});
