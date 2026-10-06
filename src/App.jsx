import { Route, Routes } from "react-router-dom";

import Navegacion from "./components/Navegacion";
import PiePagina from "./components/PiePagina";

import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Nosotros from "./pages/Nosotros";
import Blogs from "./pages/Blogs";
import BlogDetalle from "./pages/BlogDetalle";
import Contacto from "./pages/Contacto";
import AdminProductos from "./pages/admin/AdminProductos";
import NoEncontrada from "./pages/NoEncontrada";

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navegacion />

      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:codigo" element={<DetalleProducto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/admin/productos" element={<AdminProductos />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </div>

      <PiePagina />
    </div>
  );
}

export default App;
