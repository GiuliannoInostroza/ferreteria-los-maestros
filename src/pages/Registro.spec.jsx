import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import Registro from "./Registro";

describe("Registro", () => {
  function mostrarRegistro() {
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );
  }

  it("muestra errores cuando el formulario está vacío", async () => {
    const usuario = userEvent.setup();
    mostrarRegistro();

    await usuario.click(screen.getByRole("button", { name: /crear cuenta/i }));

    expect(screen.getByText("Nombre obligatorio")).toBeInTheDocument();
    expect(screen.getByText("Correo obligatorio")).toBeInTheDocument();
  });

  it("muestra error si el correo ya tiene una cuenta", async () => {
    const usuario = userEvent.setup();
    mostrarRegistro();

    await usuario.type(screen.getByLabelText("Nombre"), "Otra Persona");
    await usuario.type(screen.getByLabelText("Correo"), "admin@duoc.cl");
    await usuario.type(screen.getByLabelText("Contraseña"), "1234");
    await usuario.click(screen.getByRole("button", { name: /crear cuenta/i }));

    expect(
      screen.getByText("Ya existe una cuenta con ese correo")
    ).toBeInTheDocument();
  });

  it("crea una cuenta de Cliente y la guarda", async () => {
    const usuario = userEvent.setup();
    mostrarRegistro();

    await usuario.type(screen.getByLabelText("Nombre"), "Ana Silva");
    await usuario.type(screen.getByLabelText("Correo"), "ana@duoc.cl");
    await usuario.type(screen.getByLabelText("Contraseña"), "1234");
    await usuario.click(screen.getByRole("button", { name: /crear cuenta/i }));

    expect(screen.getByText("Cuenta creada")).toBeInTheDocument();

    const guardados = JSON.parse(localStorage.getItem("usuariosAdmin"));
    const nueva = guardados.find((item) => item.correo === "ana@duoc.cl");
    expect(nueva.rol).toBe("Cliente");
  });
});
