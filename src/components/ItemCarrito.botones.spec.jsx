import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import ItemCarrito from "./ItemCarrito";

describe("ItemCarrito - botones", () => {
  const item = {
    codigo: "MC001",
    nombre: "Cemento",
    precio: 5990,
    stock: 80,
    cantidad: 2,
  };

  it("ejecuta onCambiarCantidad con -1 al presionar el botón -", async () => {
    const usuario = userEvent.setup();
    const onCambiarCantidad = vi.fn();
    render(<ItemCarrito item={item} onCambiarCantidad={onCambiarCantidad} />);

    await usuario.click(screen.getByRole("button", { name: "-" }));

    expect(onCambiarCantidad).toHaveBeenCalledWith("MC001", -1);
  });

  it("ejecuta onQuitar con el código al presionar Quitar", async () => {
    const usuario = userEvent.setup();
    const onQuitar = vi.fn();
    render(<ItemCarrito item={item} onQuitar={onQuitar} />);

    await usuario.click(screen.getByRole("button", { name: /quitar/i }));

    expect(onQuitar).toHaveBeenCalledWith("MC001");
  });
});
