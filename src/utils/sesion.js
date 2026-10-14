export function puedeAdministrar(usuario) {
  return Boolean(usuario) && usuario.rol !== "Cliente";
}

export function esAdministrador(usuario) {
  return Boolean(usuario) && usuario.rol === "Administrador";
}
