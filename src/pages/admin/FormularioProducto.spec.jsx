// src/pages/admin/FormularioProducto.spec.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import FormularioProducto from "./FormularioProducto";

describe("FormularioProducto", () => {
  const productosExistentes = [{ codigo: "MC001", nombre: "Cemento" }];

  function mostrarFormulario(onGuardar = vi.fn()) {
    render(
      <FormularioProducto
        productos={productosExistentes}
        onGuardar={onGuardar}
        onCancelar={vi.fn()}
      />
    );
  }

  // Prueba 1 (render): el formulario muestra los 7 campos pedidos
  it("muestra los siete campos del producto", () => {
    mostrarFormulario();

    expect(screen.getByLabelText("Código")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Marca")).toBeInTheDocument();
    expect(screen.getByLabelText("Categoría")).toBeInTheDocument();
    expect(screen.getByLabelText("Precio")).toBeInTheDocument();
    expect(screen.getByLabelText("Stock")).toBeInTheDocument();
    expect(screen.getByLabelText("Stock crítico")).toBeInTheDocument();
  });

  // Prueba 2 (validación): los campos obligatorios vacíos muestran error
  it("muestra errores obligatorios al guardar vacío", async () => {
    const usuario = userEvent.setup();
    mostrarFormulario();

    await usuario.click(screen.getByRole("button", { name: /guardar/i }));

    expect(screen.getByText("Código obligatorio")).toBeInTheDocument();
    expect(screen.getByText("Nombre obligatorio")).toBeInTheDocument();
  });

  // Prueba 3 (validación): el precio debe ser mayor que 0
  it("muestra error si el precio es cero", async () => {
    const usuario = userEvent.setup();
    mostrarFormulario();

    await usuario.type(screen.getByLabelText("Precio"), "0");
    await usuario.click(screen.getByRole("button", { name: /guardar/i }));

    expect(screen.getByText("El precio debe ser mayor que 0")).toBeInTheDocument();
  });

  // Prueba 4 (validación): el stock no puede ser negativo
  it("muestra error si el stock es negativo", async () => {
    const usuario = userEvent.setup();
    mostrarFormulario();

    await usuario.type(screen.getByLabelText("Stock"), "-5");
    await usuario.click(screen.getByRole("button", { name: /guardar/i }));

    expect(screen.getByText("El stock no puede ser negativo")).toBeInTheDocument();
  });

  // Prueba 5 (validación): no se permite repetir el código de un producto
  it("muestra error si el código ya existe", async () => {
    const usuario = userEvent.setup();
    mostrarFormulario();

    await usuario.type(screen.getByLabelText("Código"), "MC001");
    await usuario.click(screen.getByRole("button", { name: /guardar/i }));

    expect(
      screen.getByText("Ya existe un producto con ese código")
    ).toBeInTheDocument();
  });

  // Prueba 6 (evento + mock): con datos válidos se llama onGuardar con el producto
  it("llama onGuardar con el producto cuando los datos son válidos", async () => {
    const usuario = userEvent.setup();
    const onGuardar = vi.fn();
    mostrarFormulario(onGuardar);

    await usuario.type(screen.getByLabelText("Código"), "TL001");
    await usuario.type(screen.getByLabelText("Nombre"), "Taladro");
    await usuario.type(screen.getByLabelText("Marca"), "Bosch");
    await usuario.type(screen.getByLabelText("Categoría"), "Herramientas");
    await usuario.type(screen.getByLabelText("Precio"), "1500");
    await usuario.type(screen.getByLabelText("Stock"), "10");
    await usuario.type(screen.getByLabelText("Stock crítico"), "3");
    await usuario.click(screen.getByRole("button", { name: /guardar/i }));

    expect(onGuardar).toHaveBeenCalledWith({
      codigo: "TL001",
      nombre: "Taladro",
      marca: "Bosch",
      categoria: "Herramientas",
      precio: 1500,
      stock: 10,
      stockCritico: 3,
      descripcion: "",
    });
  });
});
