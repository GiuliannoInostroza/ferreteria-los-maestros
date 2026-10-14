import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Contacto from "./Contacto";

describe("Contacto", () => {
  it("muestra el formulario de contacto", () => {
    render(<Contacto />);

    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("Mensaje")).toBeInTheDocument();
  });

  it("muestra error cuando el dominio del correo no está permitido", async () => {
    const usuario = userEvent.setup();
    render(<Contacto />);

    await usuario.type(screen.getByLabelText("Nombre"), "Agustín");
    await usuario.type(
      screen.getByLabelText("Correo electrónico"),
      "agustin@hotmail.com",
    );
    await usuario.selectOptions(
      screen.getByLabelText("Motivo de contacto"),
      "productos",
    );
    await usuario.type(
      screen.getByLabelText("Mensaje"),
      "Necesito información sobre uno de sus productos.",
    );
    await usuario.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    expect(screen.getByText(/usa un correo/i)).toBeInTheDocument();
  });

  it("confirma el envío cuando los datos son válidos", async () => {
    const usuario = userEvent.setup();
    render(<Contacto />);

    await usuario.type(screen.getByLabelText("Nombre"), "Agustín Pérez");
    await usuario.type(
      screen.getByLabelText("Correo electrónico"),
      "agustin@gmail.com",
    );
    await usuario.selectOptions(
      screen.getByLabelText("Motivo de contacto"),
      "cotizacion",
    );
    await usuario.type(
      screen.getByLabelText("Mensaje"),
      "Quisiera solicitar una cotización para mi proyecto.",
    );
    await usuario.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    expect(
      screen.getByText("Mensaje enviado correctamente"),
    ).toBeInTheDocument();
  });
});
