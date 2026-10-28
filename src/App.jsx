import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navegacion from "./components/Navegacion";
import PiePagina from "./components/PiePagina";
import SinAcceso from "./components/SinAcceso";

import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Categorias from "./pages/Categorias";
import Ofertas from "./pages/Ofertas";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Nosotros from "./pages/Nosotros";
import Blogs from "./pages/Blogs";
import BlogDetalle from "./pages/BlogDetalle";
import Contacto from "./pages/Contacto";
import AdminProductos from "./pages/admin/AdminProductos";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import NoEncontrada from "./pages/NoEncontrada";

import {
  agregarProducto,
  contarUnidades,
  modificarCantidad,
  quitarProducto,
} from "./utils/carrito";
import {
  guardarCarrito,
  guardarSesion,
  leerCarrito,
  leerSesion,
  leerUsuarios,
} from "./utils/persistencia";
import {
  esAdministrador,
  puedeAdministrar,
  usuarioVigente,
} from "./utils/sesion";

function App() {
  const [carrito, setCarrito] = useState(() => leerCarrito());
  const [usuario, setUsuario] = useState(() => leerSesion());

  useEffect(() => {
    guardarCarrito(carrito);
  }, [carrito]);

  useEffect(() => {
    guardarSesion(usuario);
  }, [usuario]);

  function agregarAlCarrito(producto) {
    setCarrito(agregarProducto(carrito, producto));
  }

  function cambiarCantidad(codigo, cambio) {
    setCarrito(modificarCantidad(carrito, codigo, cambio));
  }

  function quitarDelCarrito(codigo) {
    setCarrito(quitarProducto(carrito, codigo));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  const sesionActual = usuarioVigente(usuario, leerUsuarios());

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navegacion unidades={contarUnidades(carrito)} usuario={sesionActual} />

      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/productos"
            element={<Productos onAgregar={agregarAlCarrito} />}
          />
          <Route
            path="/productos/:codigo"
            element={<DetalleProducto onAgregar={agregarAlCarrito} />}
          />
          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                onCambiarCantidad={cambiarCantidad}
                onQuitar={quitarDelCarrito}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                carrito={carrito}
                usuario={sesionActual}
                onVaciar={vaciarCarrito}
              />
            }
          />
          <Route
            path="/categorias"
            element={<Categorias onAgregar={agregarAlCarrito} />}
          />
          <Route
            path="/ofertas"
            element={<Ofertas onAgregar={agregarAlCarrito} />}
          />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route
            path="/login"
            element={
              <Login
                usuario={sesionActual}
                onIngresar={setUsuario}
                onSalir={() => setUsuario(null)}
              />
            }
          />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/admin/productos"
            element={
              puedeAdministrar(sesionActual) ? <AdminProductos /> : <SinAcceso />
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              esAdministrador(sesionActual) ? (
                <AdminUsuarios usuarioActual={sesionActual} />
              ) : (
                <SinAcceso />
              )
            }
          />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </div>

      <PiePagina />
    </div>
  );
}

export default App;
