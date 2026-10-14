import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navegacion from "./components/Navegacion";
import PiePagina from "./components/PiePagina";
import SinAcceso from "./components/SinAcceso";

import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
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
} from "./utils/persistencia";
import { esAdministrador, puedeAdministrar } from "./utils/sesion";

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

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navegacion unidades={contarUnidades(carrito)} usuario={usuario} />

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
                usuario={usuario}
                onVaciar={vaciarCarrito}
              />
            }
          />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route
            path="/login"
            element={
              <Login
                usuario={usuario}
                onIngresar={setUsuario}
                onSalir={() => setUsuario(null)}
              />
            }
          />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/admin/productos"
            element={
              puedeAdministrar(usuario) ? <AdminProductos /> : <SinAcceso />
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              esAdministrador(usuario) ? <AdminUsuarios /> : <SinAcceso />
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
