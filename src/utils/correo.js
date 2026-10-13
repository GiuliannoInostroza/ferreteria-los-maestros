export function correoConDominioPermitido(correo) {
  const valor = correo.trim().toLowerCase();

  return (
    valor.endsWith("@duocuc.cl") ||
    valor.endsWith("@duoc.cl") ||
    valor.endsWith("@profesor.duoc.cl") ||
    valor.endsWith("@gmail.com")
  );
}
