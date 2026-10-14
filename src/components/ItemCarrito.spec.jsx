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
    cantidad: 81,
  };

  it("avisa que supera el stock y sus botones -, + y Quitar llaman a las funciones recibidas", async () => {
    const usuario = userEvent.setup();
    const onCambiarCantidad = vi.fn();
    const onQuitar = vi.fn();
    render(
      <ItemCarrito
        item={item}
        onCambiarCantidad={onCambiarCantidad}
        onQuitar={onQuitar}
      />
    );

    await usuario.click(screen.getByRole("button", { name: "-" }));
    await usuario.click(screen.getByRole("button", { name: "+" }));
    await usuario.click(screen.getByRole("button", { name: "Quitar" }));

    expect(screen.getByText(/supera el stock disponible/i)).toBeInTheDocument();
    expect(onCambiarCantidad).toHaveBeenCalledWith("MC001", -1);
    expect(onCambiarCantidad).toHaveBeenCalledWith("MC001", 1);
    expect(onQuitar).toHaveBeenCalledWith("MC001");
  });
});
