import { esAdministrador, puedeAdministrar, usuarioVigente } from "./sesion";

describe("roles de la administración", () => {
  it("aplica los permisos de cada rol y actualiza la sesión con el rol y el estado actuales", () => {
    const cliente = { nombre: "Luis Vega", rol: "Cliente" };
    const vendedor = { nombre: "Pedro Soto", rol: "Vendedor" };
    const administrador = { nombre: "Marta Rojas", rol: "Administrador" };

    expect(puedeAdministrar(cliente)).toBe(false);
    expect(puedeAdministrar(vendedor)).toBe(true);
    expect(esAdministrador(vendedor)).toBe(false);
    expect(esAdministrador(administrador)).toBe(true);
    expect(puedeAdministrar({ nombre: "Sin rol", rol: "Otro" })).toBe(false);

    const sesion = { id: 2, nombre: "Pedro Soto", rol: "Vendedor", activo: true };
    const usuarios = [
      { id: 2, nombre: "Pedro Soto", rol: "Cliente", activo: true },
      { id: 3, nombre: "Luis Vega", rol: "Cliente", activo: false },
    ];

    expect(usuarioVigente(sesion, usuarios).rol).toBe("Cliente");
    expect(usuarioVigente({ ...sesion, id: 3 }, usuarios)).toBe(null);
    expect(usuarioVigente({ ...sesion, id: 9 }, usuarios)).toBe(null);
  });
});
