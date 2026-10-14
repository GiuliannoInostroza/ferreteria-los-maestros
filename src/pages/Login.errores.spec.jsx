import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Login from "./Login";

describe("Login - validaciones y sesión", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  function mostrarLogin(props = {}) {
    render(
      <BrowserRouter>
        <Login onIngresar={vi.fn()} onSalir={vi.fn()} {...props} />
      </BrowserRouter>
    );
  }

  async function intentarIngresar(correo, contrasena) {
    const usuario = userEvent.setup();
    await usuario.type(screen.getByLabelText("Correo"), correo);
    await usuario.type(screen.getByLabelText("Contraseña"), contrasena);
    await usuario.click(screen.getByRole("button", { name: /ingresar/i }));
  }

  it("muestra error si el dominio del correo no está permitido", async () => {
    mostrarLogin();

    await intentarIngresar("persona@hotmail.com", "1234");

    expect(screen.getByText(/solo se acepta/i)).toBeInTheDocument();
  });

  it("muestra error si no existe una cuenta con ese correo", async () => {
    mostrarLogin();

    await intentarIngresar("nadie@gmail.com", "1234");

    expect(
      screen.getByText("No existe una cuenta con ese correo")
    ).toBeInTheDocument();
  });

  it("muestra error si la cuenta está desactivada", async () => {
    localStorage.setItem(
      "usuariosAdmin",
      JSON.stringify([
        {
          id: 9,
          nombre: "Cuenta Inactiva",
          correo: "inactiva@duoc.cl",
          rol: "Cliente",
          activo: false,
        },
      ])
    );
    mostrarLogin();

    await intentarIngresar("inactiva@duoc.cl", "1234");

    expect(screen.getByText("La cuenta está desactivada")).toBeInTheDocument();
  });

  it("muestra error si la contraseña es demasiado corta", async () => {
    mostrarLogin();

    await intentarIngresar("admin@duoc.cl", "12");

    expect(
      screen.getByText("La contraseña debe tener entre 4 y 10 caracteres")
    ).toBeInTheDocument();
  });

  it("llama onIngresar cuando el correo y la contraseña son válidos", async () => {
    const onIngresar = vi.fn();
    mostrarLogin({ onIngresar });

    await intentarIngresar("admin@duoc.cl", "1234");

    expect(onIngresar).toHaveBeenCalled();
  });

  it("no ofrece la administración a un Cliente con sesión iniciada", () => {
    mostrarLogin({ usuario: { nombre: "Luis Vega", rol: "Cliente" } });

    expect(screen.getByText(/hola, luis vega/i)).toBeInTheDocument();
    expect(screen.queryByText("Ir a administración")).toBeNull();
  });

  it("ofrece la administración y permite cerrar sesión a un Administrador", async () => {
    const usuario = userEvent.setup();
    const onSalir = vi.fn();
    mostrarLogin({
      usuario: { nombre: "Marta Rojas", rol: "Administrador" },
      onSalir,
    });

    expect(screen.getByText("Ir a administración")).toBeInTheDocument();

    await usuario.click(screen.getByRole("button", { name: /cerrar sesión/i }));

    expect(onSalir).toHaveBeenCalled();
  });
});
