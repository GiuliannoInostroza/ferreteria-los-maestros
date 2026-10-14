import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import AdminUsuarios from "./AdminUsuarios";
import { usuarios as usuariosIniciales } from "../../data/usuarios";

describe("AdminUsuarios", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("agrega un usuario con el rol Vendedor", async () => {
    const usuario = userEvent.setup();
    render(<AdminUsuarios />);

    await usuario.click(screen.getByRole("button", { name: /agregar usuario/i }));
    await usuario.type(screen.getByLabelText("Nombre"), "Ana Silva");
    await usuario.type(screen.getByLabelText("Correo"), "ana@duoc.cl");
    await usuario.selectOptions(screen.getByLabelText("Rol"), "Vendedor");
    await usuario.click(screen.getByRole("button", { name: /^guardar$/i }));

    const fila = screen.getByText("Ana Silva").closest("tr");
    expect(within(fila).getByText("Vendedor")).toBeInTheDocument();
  });

  it("permite desactivar un usuario", async () => {
    const usuario = userEvent.setup();
    render(<AdminUsuarios />);

    const fila = screen.getByText("Pedro Soto").closest("tr");
    await usuario.click(
      within(fila).getByRole("button", { name: /desactivar/i })
    );

    expect(within(fila).getByText("Inactivo")).toBeInTheDocument();
  });

  it("guarda los usuarios en localStorage", () => {
    const espia = vi.spyOn(Storage.prototype, "setItem");

    render(<AdminUsuarios />);

    expect(espia).toHaveBeenCalledWith(
      "usuariosAdmin",
      JSON.stringify(usuariosIniciales)
    );

    espia.mockRestore();
  });

  it("elimina un usuario de la tabla", async () => {
    const usuario = userEvent.setup();
    render(<AdminUsuarios />);

    const fila = screen.getByText("Luis Vega").closest("tr");
    await usuario.click(within(fila).getByRole("button", { name: /eliminar/i }));

    expect(screen.queryByText("Luis Vega")).not.toBeInTheDocument();
  });

  it("cambia el formulario al editar otro usuario sin cancelar", async () => {
    const usuario = userEvent.setup();
    render(<AdminUsuarios />);

    const primera = screen.getByText("Marta Rojas").closest("tr");
    await usuario.click(within(primera).getByRole("button", { name: /editar/i }));
    expect(screen.getByLabelText("Nombre").value).toBe("Marta Rojas");

    const segunda = screen.getByText("Pedro Soto").closest("tr");
    await usuario.click(within(segunda).getByRole("button", { name: /editar/i }));

    expect(screen.getByLabelText("Nombre").value).toBe("Pedro Soto");
  });
});
