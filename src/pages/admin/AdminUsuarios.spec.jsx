import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import * as persistencia from "../../utils/persistencia";
import AdminUsuarios from "./AdminUsuarios";

describe("AdminUsuarios", () => {
  it("desactiva, activa y edita un usuario y agrega otro nuevo avisando en cada paso", async () => {
    const espiaLeer = vi.spyOn(persistencia, "leerUsuarios").mockReturnValue([
      {
        id: 3,
        nombre: "Luis Vega",
        correo: "cliente@gmail.com",
        rol: "Cliente",
        activo: true,
      },
    ]);
    const espiaGuardar = vi
      .spyOn(persistencia, "guardarUsuarios")
      .mockImplementation(() => {});
    const usuario = userEvent.setup();
    render(<AdminUsuarios />);

    await usuario.click(screen.getByRole("button", { name: "Desactivar" }));
    expect(screen.getByText("Inactivo")).toBeInTheDocument();
    expect(screen.getByText("Usuario Luis Vega desactivado")).toBeInTheDocument();

    await usuario.click(screen.getByRole("button", { name: "Activar" }));
    expect(screen.getByText("Activo")).toBeInTheDocument();
    expect(screen.getByText("Usuario Luis Vega activado")).toBeInTheDocument();

    await usuario.click(screen.getByRole("button", { name: "Editar" }));
    await usuario.type(screen.getByLabelText("Nombre"), " Jr");
    await usuario.click(screen.getByRole("button", { name: "Guardar cambios" }));
    expect(screen.getByText("Luis Vega Jr")).toBeInTheDocument();
    expect(screen.getByText("Usuario actualizado correctamente")).toBeInTheDocument();

    await usuario.click(screen.getByRole("button", { name: "Agregar usuario" }));
    await usuario.type(screen.getByLabelText("Nombre"), "Ana Soto");
    await usuario.type(screen.getByLabelText("Correo"), "ana@duoc.cl");
    await usuario.selectOptions(screen.getByLabelText("Rol"), "Vendedor");
    await usuario.click(screen.getByRole("button", { name: "Guardar" }));
    expect(screen.getByText("Ana Soto")).toBeInTheDocument();
    expect(screen.getByText("Usuario agregado correctamente")).toBeInTheDocument();

    espiaLeer.mockRestore();
    espiaGuardar.mockRestore();
  });
});
