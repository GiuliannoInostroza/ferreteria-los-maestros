import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import * as persistencia from "../utils/persistencia";
import Login from "./Login";

describe("Login", () => {
  it("muestra los errores del formulario y luego ingresa entregando el usuario a onIngresar", async () => {
    const vendedor = {
      id: 2,
      nombre: "Pedro Soto",
      correo: "pedro@gmail.com",
      rol: "Vendedor",
      activo: true,
    };
    const espia = vi.spyOn(persistencia, "leerUsuarios").mockReturnValue([vendedor]);
    const usuario = userEvent.setup();
    const onIngresar = vi.fn();
    render(
      <BrowserRouter>
        <Login onIngresar={onIngresar} />
      </BrowserRouter>
    );

    await usuario.click(screen.getByRole("button", { name: "Ingresar" }));
    expect(screen.getByText("Correo obligatorio")).toBeInTheDocument();
    expect(onIngresar).not.toHaveBeenCalled();

    await usuario.type(screen.getByLabelText("Correo"), "pedro");
    await usuario.type(screen.getByLabelText("Contraseña"), "12");
    await usuario.click(screen.getByRole("button", { name: "Ingresar" }));
    expect(screen.getByText(/solo se acepta @duocuc.cl/i)).toBeInTheDocument();

    await usuario.type(screen.getByLabelText("Correo"), "@gmail.com");
    await usuario.type(screen.getByLabelText("Contraseña"), "34");
    await usuario.click(screen.getByRole("button", { name: "Ingresar" }));
    expect(onIngresar).toHaveBeenCalledWith(vendedor);

    espia.mockRestore();
  });
});
