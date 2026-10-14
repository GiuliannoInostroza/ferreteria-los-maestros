const dominiosPermitidos = [
  "@duocuc.cl",
  "@duoc.cl",
  "@profesor.duoc.cl",
  "@gmail.com",
];

export function correoConDominioPermitido(correo) {
  const valor = correo.trim().toLowerCase();

  return dominiosPermitidos.some((dominio) => valor.endsWith(dominio));
}
