import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import CompraFallida from "./CompraFallida";

describe("CompraFallida", () => {
  it("muestra el aviso de que no se pudo realizar el pago", () => {
    render(
      <BrowserRouter>
        <CompraFallida onReintentar={vi.fn()} />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("heading", { name: /no se pudo realizar el pago/i })
    ).toBeInTheDocument();
  });

  it("ejecuta onReintentar al presionar Volver a intentar", async () => {
    const usuario = userEvent.setup();
    const onReintentar = vi.fn();
    render(
      <BrowserRouter>
        <CompraFallida onReintentar={onReintentar} />
      </BrowserRouter>
    );

    await usuario.click(
      screen.getByRole("button", { name: /volver a intentar/i })
    );

    expect(onReintentar).toHaveBeenCalled();
  });
});
