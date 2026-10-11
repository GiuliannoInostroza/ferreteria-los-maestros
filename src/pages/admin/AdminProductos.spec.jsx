// src/pages/admin/AdminProductos.spec.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import AdminProductos from "./AdminProductos";
import { productos as productosIniciales } from "../../data/productos";

describe("AdminProductos", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Prueba 7 (estado): el botón Agregar producto muestra el formulario
  it("muestra el formulario al presionar Agregar producto", async () => {
    const usuario = userEvent.setup();
    render(<AdminProductos />);

    expect(screen.queryByLabelText("Código")).not.toBeInTheDocument();

    await usuario.click(screen.getByRole("button", { name: /agregar producto/i }));

    expect(screen.getByLabelText("Código")).toBeInTheDocument();
  });

  // Prueba 8 (estado): guardar un producto válido lo agrega al listado
  it("agrega el producto nuevo a la tabla al guardar", async () => {
    const usuario = userEvent.setup();
    render(<AdminProductos />);

    await usuario.click(screen.getByRole("button", { name: /agregar producto/i }));
    await usuario.type(screen.getByLabelText("Código"), "TL001");
    await usuario.type(screen.getByLabelText("Nombre"), "Taladro de prueba");
    await usuario.type(screen.getByLabelText("Marca"), "Bosch");
    await usuario.type(screen.getByLabelText("Categoría"), "Herramientas");
    await usuario.type(screen.getByLabelText("Precio"), "1500");
    await usuario.type(screen.getByLabelText("Stock"), "10");
    await usuario.type(screen.getByLabelText("Stock crítico"), "3");
    await usuario.click(screen.getByRole("button", { name: /guardar/i }));

    expect(screen.getByText("Taladro de prueba")).toBeInTheDocument();
  });

  // Prueba 9 (persistencia + espía): la lista de productos se guarda en localStorage
  it("guarda los productos en localStorage", () => {
    const espia = vi.spyOn(Storage.prototype, "setItem");

    render(<AdminProductos />);

    expect(espia).toHaveBeenCalledWith(
      "productosAdmin",
      JSON.stringify(productosIniciales)
    );

    espia.mockRestore();
  });
});
