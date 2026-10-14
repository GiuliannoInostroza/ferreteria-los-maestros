import { render, screen } from "@testing-library/react";

import Nosotros from "./Nosotros";

describe("Nosotros", () => {
  it("muestra la información principal de la ferretería", () => {
    render(<Nosotros />);

    expect(
      screen.getByRole("heading", {
        name: "Sobre Ferretería Los Maestros",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Nuestra misión",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Nuestros valores",
      }),
    ).toBeInTheDocument();
  });
});
