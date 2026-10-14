import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

import { productos as productosIniciales } from "../../data/productos";
import { formatearPrecio } from "../../utils/precio";
import FormularioProducto from "./FormularioProducto";

function AdminProductos() {
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem("productosAdmin");
    return guardados ? JSON.parse(guardados) : productosIniciales;
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  useEffect(() => {
    localStorage.setItem("productosAdmin", JSON.stringify(productos));
  }, [productos]);

  function guardar(producto) {
    if (productoEditando) {
      setProductos(
        productos.map((item) =>
          item.codigo === producto.codigo ? producto : item
        )
      );
    } else {
      setProductos([...productos, producto]);
    }

    setProductoEditando(null);
    setMostrarFormulario(false);
  }

  function agregar() {
    setProductoEditando(null);
    setMostrarFormulario(true);
  }

  function editar(producto) {
    setProductoEditando(producto);
    setMostrarFormulario(true);
  }

  function cancelar() {
    setProductoEditando(null);
    setMostrarFormulario(false);
  }

  function eliminar(codigo) {
    setProductos(productos.filter((item) => item.codigo !== codigo));

    if (productoEditando && productoEditando.codigo === codigo) {
      cancelar();
    }
  }

  return (
    <Container className="py-4">
      <h1>Administración de productos</h1>

      {!mostrarFormulario && (
        <Button className="mb-4" onClick={agregar}>
          Agregar producto
        </Button>
      )}

      {mostrarFormulario && (
        <FormularioProducto
          productos={productos}
          producto={productoEditando}
          onGuardar={guardar}
          onCancelar={cancelar}
        />
      )}

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Stock crítico</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.codigo}>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>{producto.marca}</td>
                <td>{producto.categoria}</td>
                <td>{formatearPrecio(producto.precio)}</td>
                <td>{producto.stock}</td>
                <td>{producto.stockCritico}</td>
                <td>
                  <Button size="sm" onClick={() => editar(producto)}>
                    Editar
                  </Button>{" "}
                  <Button size="sm" onClick={() => eliminar(producto.codigo)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default AdminProductos;
