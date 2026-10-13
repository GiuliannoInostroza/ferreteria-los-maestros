import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import Contacto from "./Contacto";

describe("Contacto", () => {
  it("muestra el formulario de contacto", () => {
    render(<Contacto />);

    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("Mensaje")).toBeInTheDocument();
  });

  it("muestra error cuando el dominio del correo no está permitido", () => {
    render(<Contacto />);

    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Agustín" },
    });

    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "agustin@hotmail.com" },
    });

    fireEvent.change(screen.getByLabelText("Motivo de contacto"), {
      target: { value: "productos" },
    });

    fireEvent.change(screen.getByLabelText("Mensaje"), {
      target: {
        value: "Necesito información sobre uno de sus productos.",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    expect(screen.getByText(/usa un correo/i)).toBeInTheDocument();
  });

  it("confirma el envío cuando los datos son válidos", () => {
    render(<Contacto />);

    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Agustín Pérez" },
    });

    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "agustin@gmail.com" },
    });

    fireEvent.change(screen.getByLabelText("Motivo de contacto"), {
      target: { value: "cotizacion" },
    });

    fireEvent.change(screen.getByLabelText("Mensaje"), {
      target: {
        value: "Quisiera solicitar una cotización para mi proyecto.",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    expect(
      screen.getByText("Mensaje enviado correctamente"),
    ).toBeInTheDocument();
  });
});
