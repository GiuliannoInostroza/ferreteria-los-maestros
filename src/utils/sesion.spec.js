import { esAdministrador, puedeAdministrar } from "./sesion";

describe("roles de la administración", () => {
  it("el Cliente no administra, el Vendedor sí y solo el Administrador gestiona usuarios", () => {
    const cliente = { nombre: "Luis Vega", rol: "Cliente" };
    const vendedor = { nombre: "Pedro Soto", rol: "Vendedor" };
    const administrador = { nombre: "Marta Rojas", rol: "Administrador" };

    expect(puedeAdministrar(cliente)).toBe(false);
    expect(puedeAdministrar(vendedor)).toBe(true);
    expect(esAdministrador(vendedor)).toBe(false);
    expect(esAdministrador(administrador)).toBe(true);
  });
});
