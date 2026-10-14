import { productos } from "../data/productos";
import { usuarios } from "../data/usuarios";

export function guardarCarrito(datos) {
  localStorage.setItem(
    "carrito",
    JSON.stringify(datos)
  );
}

export function leerCarrito() {
  const guardado = localStorage.getItem("carrito");
  return guardado ? JSON.parse(guardado) : [];
}

export function guardarSesion(usuario) {
  localStorage.setItem(
    "sesion",
    JSON.stringify(usuario)
  );
}

export function leerSesion() {
  const guardada = localStorage.getItem("sesion");
  return guardada ? JSON.parse(guardada) : null;
}

export function guardarProductos(lista) {
  localStorage.setItem(
    "productosAdmin",
    JSON.stringify(lista)
  );
}

export function leerProductos() {
  const guardados = localStorage.getItem("productosAdmin");
  return guardados ? JSON.parse(guardados) : productos;
}

export function guardarUsuarios(lista) {
  localStorage.setItem(
    "usuariosAdmin",
    JSON.stringify(lista)
  );
}

export function leerUsuarios() {
  const guardados = localStorage.getItem("usuariosAdmin");
  return guardados ? JSON.parse(guardados) : usuarios;
}
