import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contacto from "./Contacto";

describe("Contacto - campos obligatorios", () => {
  it("muestra los errores de cada campo al enviar vacío", async () => {
    const usuario = userEvent.setup();
    render(<Contacto />);

    await usuario.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    expect(screen.getByText("Nombre obligatorio")).toBeInTheDocument();
    expect(screen.getByText("Correo obligatorio")).toBeInTheDocument();
    expect(screen.getByText("Selecciona un motivo")).toBeInTheDocument();
    expect(
      screen.getByText("El mensaje debe tener al menos 20 caracteres")
    ).toBeInTheDocument();
  });
});
