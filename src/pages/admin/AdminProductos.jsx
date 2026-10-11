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

  useEffect(() => {
    localStorage.setItem("productosAdmin", JSON.stringify(productos));
  }, [productos]);

  function guardar(producto) {
    setProductos([...productos, producto]);
    setMostrarFormulario(false);
  }

  return (
    <Container className="py-4">
      <h1>Administración de productos</h1>

      {!mostrarFormulario && (
        <Button className="mb-4" onClick={() => setMostrarFormulario(true)}>
          Agregar producto
        </Button>
      )}

      {mostrarFormulario && (
        <FormularioProducto
          productos={productos}
          onGuardar={guardar}
          onCancelar={() => setMostrarFormulario(false)}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default AdminProductos;
