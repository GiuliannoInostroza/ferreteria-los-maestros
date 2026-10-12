import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Login from "./Login";

describe("Login", () => {
  it("muestra error cuando el correo está vacío", async () => {
    const usuario = userEvent.setup();
    render(
      <BrowserRouter>
        <Login onIngresar={vi.fn()} />
      </BrowserRouter>
    );

    await usuario.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(screen.getByText("Correo obligatorio")).toBeInTheDocument();
  });
});
