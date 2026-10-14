import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminUsuarios from "./AdminUsuarios";

describe("AdminUsuarios - formulario y edición", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("cierra el formulario al presionar Cancelar", async () => {
    const usuario = userEvent.setup();
    render(<AdminUsuarios />);

    await usuario.click(screen.getByRole("button", { name: /agregar usuario/i }));
    await usuario.click(screen.getByRole("button", { name: /cancelar/i }));

    expect(screen.queryByLabelText("Rol")).toBeNull();
  });

  it("guarda los cambios al editar un usuario", async () => {
    const usuario = userEvent.setup();
    render(<AdminUsuarios />);

    const fila = screen.getByText("Pedro Soto").closest("tr");
    await usuario.click(within(fila).getByRole("button", { name: /editar/i }));

    const nombre = screen.getByLabelText("Nombre");
    await usuario.clear(nombre);
    await usuario.type(nombre, "Pedro Soto Editado");
    await usuario.click(screen.getByRole("button", { name: /guardar cambios/i }));

    expect(screen.getByText("Pedro Soto Editado")).toBeInTheDocument();
  });

  it("cierra el formulario si se elimina el usuario que se edita", async () => {
    const usuario = userEvent.setup();
    render(<AdminUsuarios />);

    const fila = screen.getByText("Luis Vega").closest("tr");
    await usuario.click(within(fila).getByRole("button", { name: /editar/i }));
    expect(screen.getByLabelText("Rol")).toBeInTheDocument();

    await usuario.click(
      within(fila).getByRole("button", { name: /eliminar/i })
    );

    expect(screen.queryByLabelText("Rol")).toBeNull();
  });

  it("vuelve a activar una cuenta desactivada", async () => {
    const usuario = userEvent.setup();
    render(<AdminUsuarios />);

    const fila = screen.getByText("Pedro Soto").closest("tr");
    await usuario.click(
      within(fila).getByRole("button", { name: /desactivar/i })
    );
    await usuario.click(within(fila).getByRole("button", { name: /^activar$/i }));

    expect(within(fila).getByText("Activo")).toBeInTheDocument();
  });
});
