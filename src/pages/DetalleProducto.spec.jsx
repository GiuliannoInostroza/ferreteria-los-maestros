import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import DetalleProducto from "./DetalleProducto";

describe("DetalleProducto", () => {
  it("muestra un mensaje cuando el código del producto no existe", () => {
    window.history.pushState({}, "", "/productos/XX999");
    render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/productos/:codigo"
            element={<DetalleProducto onAgregar={vi.fn()} />}
          />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText("El producto solicitado no existe.")).toBeInTheDocument();
  });
});
