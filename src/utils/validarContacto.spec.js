import { vi } from "vitest";
import * as correo from "./correo";
import { validarContacto } from "./validaciones";

describe("validarContacto", () => {
  it("rechaza un formulario vacío y un mensaje de menos de 20 caracteres", () => {
    const espia = vi.spyOn(correo, "correoConDominioPermitido").mockReturnValue(true);
    const vacio = { nombre: "", email: "", asunto: "", mensaje: "" };
    const corto = {
      nombre: "Ana Soto",
      email: "ana@gmail.com",
      asunto: "productos",
      mensaje: "Hola",
    };

    const erroresVacio = validarContacto(vacio);
    const erroresCorto = validarContacto(corto);

    expect(erroresVacio.nombre).toBe("Nombre obligatorio");
    expect(erroresVacio.email).toBe("Correo obligatorio");
    expect(erroresVacio.asunto).toBe("Selecciona un motivo");
    expect(erroresCorto.mensaje).toBe("El mensaje debe tener al menos 20 caracteres");
    expect(erroresCorto.email).toBeUndefined();
    expect(espia).toHaveBeenCalledWith("ana@gmail.com");

    espia.mockRestore();
  });
});
