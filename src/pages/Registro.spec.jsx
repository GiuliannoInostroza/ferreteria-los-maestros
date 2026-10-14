import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import * as persistencia from "../utils/persistencia";
import Registro from "./Registro";

describe("Registro", () => {
  it("muestra errores del formulario vacío y luego crea la cuenta como Cliente", async () => {
    const espiaLeer = vi.spyOn(persistencia, "leerUsuarios").mockReturnValue([]);
    const espiaGuardar = vi
      .spyOn(persistencia, "guardarUsuarios")
      .mockImplementation(() => {});
    const usuario = userEvent.setup();
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );

    await usuario.click(screen.getByRole("button", { name: "Crear cuenta" }));
    expect(screen.getByText("Nombre obligatorio")).toBeInTheDocument();
    expect(espiaGuardar).not.toHaveBeenCalled();

    await usuario.type(screen.getByLabelText("Nombre"), "Ana Soto");
    await usuario.type(screen.getByLabelText("Correo"), "ana@gmail.com");
    await usuario.type(screen.getByLabelText("Contraseña"), "1234");
    await usuario.click(screen.getByRole("button", { name: "Crear cuenta" }));

    expect(espiaGuardar).toHaveBeenCalledWith([
      { id: 1, nombre: "Ana Soto", correo: "ana@gmail.com", rol: "Cliente", activo: true },
    ]);
    expect(screen.getByRole("heading", { name: "Cuenta creada" })).toBeInTheDocument();

    espiaLeer.mockRestore();
    espiaGuardar.mockRestore();
  });

  it("rechaza un correo que ya tiene una cuenta", async () => {
    const usuario = userEvent.setup();
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );

    await usuario.type(screen.getByLabelText("Nombre"), "Otra Persona");
    await usuario.type(screen.getByLabelText("Correo"), "admin@duoc.cl");
    await usuario.type(screen.getByLabelText("Contraseña"), "1234");
    await usuario.click(screen.getByRole("button", { name: "Crear cuenta" }));

    expect(screen.getByText("Ya existe una cuenta con ese correo")).toBeInTheDocument();
  });
});
