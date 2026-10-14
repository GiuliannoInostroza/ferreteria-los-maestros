import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import FormularioProducto from "./FormularioProducto";

describe("FormularioProducto - validaciones", () => {
  function mostrarFormulario(onGuardar = vi.fn()) {
    render(
      <FormularioProducto
        productos={[]}
        onGuardar={onGuardar}
        onCancelar={vi.fn()}
      />
    );
  }

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

  it("muestra errores obligatorios al guardar vacío", async () => {
    const usuario = userEvent.setup();
    mostrarFormulario();

    await usuario.click(screen.getByRole("button", { name: /guardar/i }));

    expect(screen.getByText("Código obligatorio")).toBeInTheDocument();
    expect(screen.getByText("Nombre obligatorio")).toBeInTheDocument();
  });

  it("muestra error si el precio es cero", async () => {
    const usuario = userEvent.setup();
    mostrarFormulario();

    await usuario.type(screen.getByLabelText("Precio"), "0");
    await usuario.click(screen.getByRole("button", { name: /guardar/i }));

    expect(
      screen.getByText("El precio debe ser mayor que 0")
    ).toBeInTheDocument();
  });

  it("muestra error si el stock es negativo", async () => {
    const usuario = userEvent.setup();
    mostrarFormulario();

    await usuario.type(screen.getByLabelText("Stock"), "-5");
    await usuario.click(screen.getByRole("button", { name: /guardar/i }));

    expect(
      screen.getByText("El stock no puede ser negativo")
    ).toBeInTheDocument();
  });

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
