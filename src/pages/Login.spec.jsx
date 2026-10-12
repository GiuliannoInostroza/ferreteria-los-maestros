import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Login from "./Login";

describe("Login", () => {
  const vendedor = {
    id: 2,
    nombre: "Pedro Soto",
    correo: "vendedor@duoc.cl",
    rol: "Vendedor",
  };

  it("muestra error cuando el correo está vacío", async () => {
    const usuario = userEvent.setup();
    render(
      <BrowserRouter>
        <Login onIngresar={vi.fn()} />
      </BrowserRouter>
    );

    await usuario.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(screen.getByText("Correo obligatorio")).toBeInTheDocument();
  });

  it("muestra error cuando el dominio del correo no es válido", async () => {
    const usuario = userEvent.setup();
    render(
      <BrowserRouter>
        <Login onIngresar={vi.fn()} />
      </BrowserRouter>
    );

    await usuario.type(screen.getByLabelText("Correo"), "pedro@hotmail.com");
    await usuario.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(screen.getByText(/solo se acepta/i)).toBeInTheDocument();
  });

  it("muestra error cuando el correo no está registrado", async () => {
    const usuario = userEvent.setup();
    render(
      <BrowserRouter>
        <Login onIngresar={vi.fn()} />
      </BrowserRouter>
    );

    await usuario.type(screen.getByLabelText("Correo"), "nadie@duoc.cl");
    await usuario.type(screen.getByLabelText("Contraseña"), "12345");
    await usuario.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(
      screen.getByText("No existe una cuenta con ese correo")
    ).toBeInTheDocument();
  });

  it("ejecuta onIngresar con el usuario encontrado", async () => {
    const usuario = userEvent.setup();
    const onIngresar = vi.fn();
    render(
      <BrowserRouter>
        <Login onIngresar={onIngresar} />
      </BrowserRouter>
    );

    await usuario.type(screen.getByLabelText("Correo"), "vendedor@duoc.cl");
    await usuario.type(screen.getByLabelText("Contraseña"), "12345");
    await usuario.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(onIngresar).toHaveBeenCalledWith(vendedor);
  });

  it("muestra el rol cuando ya hay una sesión iniciada", () => {
    render(
      <BrowserRouter>
        <Login usuario={vendedor} />
      </BrowserRouter>
    );

    expect(screen.getByText("Vendedor")).toBeInTheDocument();
  });
});
