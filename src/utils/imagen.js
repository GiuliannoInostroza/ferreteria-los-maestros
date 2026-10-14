import { productos } from "../data/productos";

export function rutaImagen(producto) {
  return productos.some((item) => item.codigo === producto.codigo)
    ? `/assets/img/productos/${producto.codigo}.jpg`
    : "/assets/img/productos/sin-imagen.svg";
}
