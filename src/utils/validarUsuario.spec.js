import { vi } from "vitest";
import * as correo from "./correo";
import { validarUsuario } from "./validaciones";

describe("validarUsuario", () => {
  it("pide nombre, correo y rol, y rechaza un correo que ya usa otro usuario", () => {
    const espia = vi.spyOn(correo, "correoConDominioPermitido").mockReturnValue(true);
    const usuarios = [{ id: 1, correo: "ana@duoc.cl" }];
    const vacio = { nombre: "", correo: "", rol: "" };
    const repetido = { nombre: "Luis Vega", correo: "ana@duoc.cl", rol: "Cliente" };

    const erroresVacio = validarUsuario(vacio, usuarios, 0);
    const erroresRepetido = validarUsuario(repetido, usuarios, 0);

    expect(erroresVacio.nombre).toBe("Nombre obligatorio");
    expect(erroresVacio.rol).toBe("Rol obligatorio");
    expect(erroresRepetido.correo).toBe("Ya existe un usuario con ese correo");
    expect(validarUsuario(repetido, usuarios, 1).correo).toBeUndefined();

    espia.mockRestore();
  });
});
