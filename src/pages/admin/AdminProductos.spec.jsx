import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import * as persistencia from "../../utils/persistencia";
import AdminProductos from "./AdminProductos";

describe("AdminProductos", () => {
  const cemento = {
    codigo: "MC001",
    nombre: "Cemento Polpaico",
    marca: "Polpaico",
    categoria: "Materiales de Construcción",
    precio: 5990,
    stock: 80,
    stockCritico: 20,
    descripcion: "Cemento gris",
  };

  it("muestra errores al guardar vacío y luego agrega el producto a la tabla con un aviso", async () => {
    const espiaLeer = vi.spyOn(persistencia, "leerProductos").mockReturnValue([]);
    const espiaGuardar = vi
      .spyOn(persistencia, "guardarProductos")
      .mockImplementation(() => {});
    const usuario = userEvent.setup();
    render(<AdminProductos />);

    await usuario.click(screen.getByRole("button", { name: /agregar producto/i }));
    await usuario.click(screen.getByRole("button", { name: "Guardar" }));
    expect(screen.getByText("Código obligatorio")).toBeInTheDocument();

    await usuario.type(screen.getByLabelText("Código"), "TL001");
    await usuario.type(screen.getByLabelText("Nombre"), "Taladro de prueba");
    await usuario.type(screen.getByLabelText("Marca"), "Bosch");
    await usuario.selectOptions(screen.getByLabelText("Categoría"), "Herramientas Eléctricas");
    await usuario.type(screen.getByLabelText("Precio"), "1500");
    await usuario.type(screen.getByLabelText("Stock"), "10");
    await usuario.type(screen.getByLabelText("Stock crítico"), "3");
    await usuario.click(screen.getByRole("button", { name: "Guardar" }));

    expect(screen.getByText("Taladro de prueba")).toBeInTheDocument();
    expect(screen.getByText("Producto agregado correctamente")).toBeInTheDocument();
    expect(espiaGuardar).toHaveBeenCalled();

    espiaLeer.mockRestore();
    espiaGuardar.mockRestore();
  });

  it("edita el stock de un producto y luego lo elimina avisando en cada paso", async () => {
    const espiaLeer = vi.spyOn(persistencia, "leerProductos").mockReturnValue([cemento]);
    const espiaGuardar = vi
      .spyOn(persistencia, "guardarProductos")
      .mockImplementation(() => {});
    const usuario = userEvent.setup();
    render(<AdminProductos />);

    await usuario.click(screen.getByRole("button", { name: "Editar" }));
    await usuario.clear(screen.getByLabelText("Stock"));
    await usuario.type(screen.getByLabelText("Stock"), "120");
    await usuario.click(screen.getByRole("button", { name: "Guardar cambios" }));
    expect(screen.getByText("120")).toBeInTheDocument();
    expect(screen.getByText("Producto actualizado correctamente")).toBeInTheDocument();

    await usuario.click(screen.getByRole("button", { name: "Eliminar" }));
    expect(screen.queryByText("Cemento Polpaico")).not.toBeInTheDocument();
    expect(screen.getByText("Producto eliminado correctamente")).toBeInTheDocument();

    espiaLeer.mockRestore();
    espiaGuardar.mockRestore();
  });
});
