import { leerProductos } from "../utils/persistencia";

export const servicioProductos = {
  listar: async () => leerProductos(),
};

export async function obtenerNombres(servicio) {
  const productos = await servicio.listar();
  return productos.map((producto) => producto.nombre);
}
