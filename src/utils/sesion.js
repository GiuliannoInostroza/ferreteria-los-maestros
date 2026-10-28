const rolesAdministracion = ["Administrador", "Vendedor"];

export function usuarioVigente(usuario, usuarios) {
  if (!usuario) return null;

  const encontrado = usuarios.find((item) => item.id === usuario.id);

  return encontrado && encontrado.activo ? encontrado : null;
}

export function puedeAdministrar(usuario) {
  return Boolean(usuario) && rolesAdministracion.some((rol) => rol === usuario.rol);
}

export function esAdministrador(usuario) {
  return Boolean(usuario) && usuario.rol === "Administrador";
}
