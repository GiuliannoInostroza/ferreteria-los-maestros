import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import ItemCarrito from "./ItemCarrito";

describe("ItemCarrito", () => {
  const item = {
    codigo: "MC001",
    nombre: "Cemento",
    precio: 5990,
    stock: 80,
    cantidad: 2,
  };

  it("muestra el nombre recibido por props", () => {
    render(<ItemCarrito item={item} />);
    expect(screen.getByText("Cemento")).toBeInTheDocument();
  });

  it("muestra aviso solo cuando la cantidad supera el stock", () => {
    render(<ItemCarrito item={{ ...item, cantidad: 81 }} />);
    expect(screen.getByText(/supera el stock/i)).toBeInTheDocument();
  });

  it("no muestra aviso cuando hay stock suficiente", () => {
    render(<ItemCarrito item={item} />);
    expect(screen.queryByText(/supera el stock/i)).not.toBeInTheDocument();
  });

  it("ejecuta onCambiarCantidad al presionar el botón +", async () => {
    const usuario = userEvent.setup();
    const onCambiarCantidad = vi.fn();
    render(
      <ItemCarrito item={item} onCambiarCantidad={onCambiarCantidad} />
    );

    await usuario.click(screen.getByRole("button", { name: "+" }));

    expect(onCambiarCantidad).toHaveBeenCalledWith("MC001", 1);
  });
});
