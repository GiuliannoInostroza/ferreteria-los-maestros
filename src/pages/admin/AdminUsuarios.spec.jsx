import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { eliminarUsuario, listarUsuarios } from "../../services/usuarioService";
import AdminUsuarios from "./AdminUsuarios";

vi.mock("../../services/usuarioService", () => ({
  listarUsuarios: vi.fn(),
  eliminarUsuario: vi.fn(),
}));

const usuarios = [
  { id: 3, nombre: "Luis Vega", correo: "cliente@gmail.com", rol: "Cliente" },
  { id: 4, nombre: "Ana Soto", correo: "ana@duoc.cl", rol: "Vendedor" },
];

function mostrarPantalla() {
  render(
    <MemoryRouter>
      <AdminUsuarios />
    </MemoryRouter>
  );
}

describe("AdminUsuarios", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("muestra los usuarios que entrega la API con su enlace para editar", async () => {
    listarUsuarios.mockResolvedValue(usuarios);
    mostrarPantalla();

    expect(await screen.findByText("Luis Vega")).toBeInTheDocument();
    expect(screen.getByText("ana@duoc.cl")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Editar" })[0]).toHaveAttribute(
      "href",
      "/admin/usuarios/3/editar"
    );
  });

  it("elimina un usuario después de confirmar y lo quita de la tabla", async () => {
    listarUsuarios.mockResolvedValue(usuarios);
    eliminarUsuario.mockResolvedValue(null);
    vi.spyOn(window, "confirm").mockReturnValue(true);
    const usuario = userEvent.setup();
    mostrarPantalla();

    await screen.findByText("Luis Vega");
    await usuario.click(screen.getAllByRole("button", { name: "Eliminar" })[0]);

    expect(eliminarUsuario).toHaveBeenCalledWith(3);
    expect(screen.queryByText("Luis Vega")).not.toBeInTheDocument();
    expect(screen.getByText("Ana Soto")).toBeInTheDocument();
  });

  it("avisa el error cuando la API de usuarios no responde bien", async () => {
    listarUsuarios.mockRejectedValue(new Error("La API respondió 500"));
    mostrarPantalla();

    expect(await screen.findByText("La API respondió 500")).toBeInTheDocument();
  });
});
