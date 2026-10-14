export function buscarUsuario(usuarios, correo) {
  return usuarios.find((item) => item.correo === correo);
}

export function siguienteId(lista) {
  const ultimo = lista[lista.length - 1];
  return ultimo ? ultimo.id + 1 : 1;
}
