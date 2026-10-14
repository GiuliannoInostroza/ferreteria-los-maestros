import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import BlogDetalle from "./BlogDetalle";

function renderizarBlog(ruta) {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/blogs/:id" element={<BlogDetalle />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("BlogDetalle", () => {
  it("muestra el artículo cuando el id existe", () => {
    renderizarBlog("/blogs/1");

    expect(
      screen.getByRole("heading", {
        name: "5 herramientas básicas que todo hogar debería tener",
      }),
    ).toBeInTheDocument();
  });

  it("muestra un mensaje cuando el artículo no existe", () => {
    renderizarBlog("/blogs/999");

    expect(
      screen.getByText("El artículo solicitado no existe."),
    ).toBeInTheDocument();
  });
});
