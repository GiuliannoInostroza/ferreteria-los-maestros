
import { correoConDominioPermitido } from "./correo";

describe("correoConDominioPermitido", () => {
  it("acepta un dominio permitido y rechaza uno no permitido", () => {
    expect(correoConDominioPermitido("alumno@duocuc.cl")).toBe(true);

    expect(correoConDominioPermitido("alumno@hotmail.com")).toBe(false);
  });
});
