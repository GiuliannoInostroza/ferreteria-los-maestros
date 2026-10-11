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
import Nosotros from "./pages/Nosotros";
import Blogs from "./pages/Blogs";
import BlogDetalle from "./pages/BlogDetalle";
import Contacto from "./pages/Contacto";
import AdminProductos from "./pages/admin/AdminProductos";
import NoEncontrada from "./pages/NoEncontrada";

import { contarUnidades } from "./utils/carrito";
import { guardarCarrito, guardarSesion } from "./utils/persistencia";

function App() {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  const [usuario, setUsuario] = useState(() => {
    const guardada = localStorage.getItem("sesion");
    return guardada ? JSON.parse(guardada) : null;
  });

  const puedeAdministrar = usuario && usuario.rol !== "Cliente";

  useEffect(() => {
    guardarCarrito(carrito);
  }, [carrito]);

  useEffect(() => {
    guardarSesion(usuario);
  }, [usuario]);

  function agregarAlCarrito(producto) {
    const yaExiste = carrito.some((item) => item.codigo === producto.codigo);

    if (yaExiste) {
      cambiarCantidad(producto.codigo, 1);
      return;
    }

    setCarrito([...carrito, { ...producto, cantidad: 1 }]);
  }

  function cambiarCantidad(codigo, cambio) {
    const actualizado = carrito.map((item) =>
      item.codigo === codigo
        ? { ...item, cantidad: item.cantidad + cambio }
        : item
    );

    setCarrito(actualizado.filter((item) => item.cantidad > 0));
  }

  function quitarDelCarrito(codigo) {
    setCarrito(carrito.filter((item) => item.codigo !== codigo));
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
          <Route
            path="/admin/productos"
            element={puedeAdministrar ? <AdminProductos /> : <SinAcceso />}
          />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </div>

      <PiePagina />
    </div>
  );
}

export default App;
