import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import FormularioUsuario from "./FormularioUsuario";

describe("FormularioUsuario", () => {
  const usuarios = [
    {
      id: 1,
      nombre: "Marta Rojas",
      correo: "admin@duoc.cl",
      rol: "Administrador",
      activo: true,
    },
  ];

  function mostrarFormulario(onGuardar = vi.fn()) {
    render(
      <FormularioUsuario
        usuarios={usuarios}
        onGuardar={onGuardar}
        onCancelar={vi.fn()}
      />
    );
  }

  it("muestra los campos de nombre, correo y rol", () => {
    mostrarFormulario();

    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Correo")).toBeInTheDocument();
    expect(screen.getByLabelText("Rol")).toBeInTheDocument();
  });

  it("muestra errores al guardar los campos vacíos", async () => {
    const usuario = userEvent.setup();
    mostrarFormulario();

    await usuario.click(screen.getByRole("button", { name: /^guardar$/i }));

    expect(screen.getByText("Nombre obligatorio")).toBeInTheDocument();
    expect(screen.getByText("Correo obligatorio")).toBeInTheDocument();
    expect(screen.getAllByText("Selecciona un rol")).toHaveLength(2);
  });

  it("no permite repetir el correo de otro usuario", async () => {
    const usuario = userEvent.setup();
    mostrarFormulario();

    await usuario.type(screen.getByLabelText("Correo"), "admin@duoc.cl");
    await usuario.click(screen.getByRole("button", { name: /^guardar$/i }));

    expect(
      screen.getByText("Ya existe un usuario con ese correo")
    ).toBeInTheDocument();
  });

  it("entrega un usuario activo con el rol seleccionado", async () => {
    const usuario = userEvent.setup();
    const onGuardar = vi.fn();
    mostrarFormulario(onGuardar);

    await usuario.type(screen.getByLabelText("Nombre"), "Ana Silva");
    await usuario.type(screen.getByLabelText("Correo"), "ana@gmail.com");
    await usuario.selectOptions(screen.getByLabelText("Rol"), "Cliente");
    await usuario.click(screen.getByRole("button", { name: /^guardar$/i }));

    expect(onGuardar).toHaveBeenCalledWith({
      nombre: "Ana Silva",
      correo: "ana@gmail.com",
      rol: "Cliente",
      activo: true,
    });
  });
});
