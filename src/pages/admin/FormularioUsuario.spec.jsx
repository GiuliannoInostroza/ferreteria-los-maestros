import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import FormularioUsuario from "./FormularioUsuario";

describe("FormularioUsuario", () => {
  it("exige elegir un rol y no llama a onGuardar", async () => {
    const usuario = userEvent.setup();
    const onGuardar = vi.fn();
    render(
      <FormularioUsuario
        usuarios={[]}
        usuario={null}
        onGuardar={onGuardar}
        onCancelar={vi.fn()}
      />
    );

    await usuario.type(screen.getByLabelText("Nombre"), "Ana Soto");
    await usuario.type(screen.getByLabelText("Correo"), "ana@duoc.cl");
    await usuario.click(screen.getByRole("button", { name: "Guardar" }));

    expect(screen.getByText("Rol obligatorio")).toBeInTheDocument();
    expect(onGuardar).not.toHaveBeenCalled();
  });
});
