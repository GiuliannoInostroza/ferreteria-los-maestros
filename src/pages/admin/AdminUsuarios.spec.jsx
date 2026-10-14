import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import AdminUsuarios from "./AdminUsuarios";
import { usuarios } from "../../data/usuarios";

describe("AdminUsuarios", () => {
  it("guarda los usuarios en localStorage", () => {
    const espia = vi.spyOn(Storage.prototype, "setItem");

    render(<AdminUsuarios />);

    expect(espia).toHaveBeenCalledWith(
      "usuariosAdmin",
      JSON.stringify(usuarios)
    );

    espia.mockRestore();
  });

  it("agrega un usuario con el rol Vendedor", async () => {
    localStorage.setItem("usuariosAdmin", JSON.stringify([]));
    const usuario = userEvent.setup();
    render(<AdminUsuarios />);

    await usuario.click(screen.getByRole("button", { name: /agregar usuario/i }));
    await usuario.type(screen.getByLabelText("Nombre"), "Ana Silva");
    await usuario.type(screen.getByLabelText("Correo"), "ana@duoc.cl");
    await usuario.selectOptions(screen.getByLabelText("Rol"), "Vendedor");
    await usuario.click(screen.getByRole("button", { name: /guardar/i }));

    expect(screen.getByText("Ana Silva")).toBeInTheDocument();
    expect(screen.getByText("Vendedor")).toBeInTheDocument();
  });

  it("permite desactivar un usuario", async () => {
    localStorage.setItem(
      "usuariosAdmin",
      JSON.stringify([
        {
          id: 2,
          nombre: "Pedro Soto",
          correo: "vendedor@duoc.cl",
          rol: "Vendedor",
          activo: true,
        },
      ])
    );
    const usuario = userEvent.setup();
    render(<AdminUsuarios />);

    await usuario.click(screen.getByRole("button", { name: /desactivar/i }));

    expect(screen.getByText("Inactivo")).toBeInTheDocument();
  });

  it("elimina un usuario de la tabla", async () => {
    localStorage.setItem(
      "usuariosAdmin",
      JSON.stringify([
        {
          id: 2,
          nombre: "Pedro Soto",
          correo: "vendedor@duoc.cl",
          rol: "Vendedor",
          activo: true,
        },
      ])
    );
    const usuario = userEvent.setup();
    render(<AdminUsuarios />);

    await usuario.click(screen.getByRole("button", { name: /eliminar/i }));

    expect(screen.queryByText("Pedro Soto")).not.toBeInTheDocument();
  });

  it("avisa si hay cambios sin guardar al editar otro usuario", async () => {
    localStorage.setItem(
      "usuariosAdmin",
      JSON.stringify([
        {
          id: 2,
          nombre: "Pedro Soto",
          correo: "vendedor@duoc.cl",
          rol: "Vendedor",
          activo: true,
        },
      ])
    );
    const usuario = userEvent.setup();
    render(<AdminUsuarios />);

    await usuario.click(screen.getByRole("button", { name: /editar/i }));
    await usuario.type(screen.getByLabelText("Nombre"), " Rojas");
    await usuario.click(screen.getByRole("button", { name: /editar/i }));

    expect(screen.getByText(/cambios sin guardar/i)).toBeInTheDocument();
  });
});
