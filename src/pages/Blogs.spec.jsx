import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Blogs from "./Blogs";

describe("Blogs", () => {
  it("muestra los dos artículos del blog", () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>,
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
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole("img")).toHaveLength(2);
  });
});
