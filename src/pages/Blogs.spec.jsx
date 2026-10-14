import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Blogs from "./Blogs";

describe("Blogs", () => {
  it("muestra los dos artículos del blog", () => {
    render(
      <BrowserRouter>
        <Blogs />
      </BrowserRouter>,
    );

    expect(
      screen.getByText("5 herramientas básicas que todo hogar debería tener"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Cómo elegir la broca correcta para cada material"),
    ).toBeInTheDocument();
  });

  it("muestra una imagen para cada artículo", () => {
    render(
      <BrowserRouter>
        <Blogs />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole("img", {
        name: "5 herramientas básicas que todo hogar debería tener",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: "Cómo elegir la broca correcta para cada material",
      }),
    ).toBeInTheDocument();
  });
});
