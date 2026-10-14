import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import AdminProductos from "./AdminProductos";
import { productos as productosIniciales } from "../../data/productos";

describe("AdminProductos - listado y formulario", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("muestra el formulario al presionar Agregar producto", async () => {
    const usuario = userEvent.setup();
    render(<AdminProductos />);

    expect(screen.queryByLabelText("Código")).toBeNull();

    await usuario.click(
      screen.getByRole("button", { name: /agregar producto/i })
    );

    expect(screen.getByLabelText("Código")).toBeInTheDocument();
  });

  it("guarda los productos en localStorage", () => {
    const espia = vi.spyOn(Storage.prototype, "setItem");

    render(<AdminProductos />);

    expect(espia).toHaveBeenCalledWith(
      "productosAdmin",
      JSON.stringify(productosIniciales)
    );

    espia.mockRestore();
  });

  it("cierra el formulario al presionar Cancelar", async () => {
    const usuario = userEvent.setup();
    render(<AdminProductos />);

    await usuario.click(
      screen.getByRole("button", { name: /agregar producto/i })
    );
    await usuario.click(screen.getByRole("button", { name: /cancelar/i }));

    expect(screen.queryByLabelText("Código")).toBeNull();
  });

  it("cierra el formulario si se elimina el producto que se edita", async () => {
    const usuario = userEvent.setup();
    render(<AdminProductos />);

    const fila = screen.getByText("Cemento Polpaico gris 25 kg").closest("tr");
    await usuario.click(within(fila).getByRole("button", { name: /editar/i }));
    expect(screen.getByLabelText("Código")).toBeInTheDocument();

    await usuario.click(
      within(fila).getByRole("button", { name: /eliminar/i })
    );

    expect(screen.queryByLabelText("Código")).toBeNull();
  });
});
