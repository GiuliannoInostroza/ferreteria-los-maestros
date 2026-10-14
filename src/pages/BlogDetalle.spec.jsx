import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Blogs from "./Blogs";
import BlogDetalle from "./BlogDetalle";

describe("BlogDetalle", () => {
  it("muestra el artículo elegido desde la lista de blogs", async () => {
    const usuario = userEvent.setup();

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetalle />} />
        </Routes>
      </BrowserRouter>,
    );

    await usuario.click(
      screen.getByRole("link", {
        name: "5 herramientas básicas que todo hogar debería tener",
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: "5 herramientas básicas que todo hogar debería tener",
      }),
    ).toBeInTheDocument();
  });

  it("muestra un mensaje cuando el artículo no existe", () => {
    render(
      <BrowserRouter>
        <BlogDetalle />
      </BrowserRouter>,
    );

    expect(
      screen.getByText("El artículo solicitado no existe."),
    ).toBeInTheDocument();
  });
});
