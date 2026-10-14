import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

import { productos } from "../../data/productos";
import { formatearPrecio } from "../../utils/precio";
import FormularioProducto from "./FormularioProducto";

function AdminProductos() {
  const [listaProductos, setListaProductos] = useState(() => {
    const guardados = localStorage.getItem("productosAdmin");
    return guardados ? JSON.parse(guardados) : productos;
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [hayCambios, setHayCambios] = useState(false);
  const [pendiente, setPendiente] = useState(null);

  useEffect(() => {
    localStorage.setItem("productosAdmin", JSON.stringify(listaProductos));
  }, [listaProductos]);

  function guardar(producto) {
    setListaProductos(
      productoEditando
        ? listaProductos.map((item) =>
            item.codigo === producto.codigo ? producto : item
          )
        : [...listaProductos, producto]
    );

    setHayCambios(false);

    if (pendiente) {
      setProductoEditando(pendiente);
      setPendiente(null);
      return;
    }

    setProductoEditando(null);
    setMostrarFormulario(false);
  }

  function agregar() {
    setProductoEditando(null);
    setHayCambios(false);
    setMostrarFormulario(true);
    window.scrollTo(0, 0);
  }

  function editar(producto) {
    window.scrollTo(0, 0);

    if (mostrarFormulario && hayCambios) {
      setPendiente(producto);
      return;
    }

    setProductoEditando(producto);
    setMostrarFormulario(true);
  }

  function descartar() {
    setProductoEditando(pendiente);
    setPendiente(null);
    setHayCambios(false);
  }

  function cancelar() {
    setProductoEditando(null);
    setPendiente(null);
    setHayCambios(false);
    setMostrarFormulario(false);
  }

  function eliminar(codigo) {
    setListaProductos(listaProductos.filter((item) => item.codigo !== codigo));

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
        <section className="bg-body-tertiary rounded p-4 mb-5">
          <h2 className="h4 mb-4">
            {productoEditando ? "Editar producto" : "Agregar producto"}
          </h2>

          {pendiente && (
            <div className="bg-body rounded p-3 mb-4">
              <p className="text-warning mb-2">
                Tienes cambios sin guardar. Presiona Guardar cambios para
                guardarlos o descártalos para editar {pendiente.nombre}.
              </p>
              <Button className="btn-sm" onClick={descartar}>
                Descartar cambios
              </Button>
            </div>
          )}

          <FormularioProducto
            productos={listaProductos}
            producto={productoEditando}
            onGuardar={guardar}
            onCancelar={cancelar}
            onModificar={() => setHayCambios(true)}
          />
        </section>
      )}

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th className="d-none d-md-table-cell">Código</th>
              <th>Nombre</th>
              <th className="d-none d-lg-table-cell">Marca</th>
              <th className="d-none d-lg-table-cell">Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th className="d-none d-lg-table-cell">Stock crítico</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {listaProductos.map((producto) => (
              <tr key={producto.codigo}>
                <td className="d-none d-md-table-cell">{producto.codigo}</td>
                <td>
                  <div>{producto.nombre}</div>
                  <div className="text-secondary small d-lg-none">
                    {producto.marca} - {producto.categoria}
                  </div>
                </td>
                <td className="d-none d-lg-table-cell">{producto.marca}</td>
                <td className="d-none d-lg-table-cell">{producto.categoria}</td>
                <td>{formatearPrecio(producto.precio)}</td>
                <td>{producto.stock}</td>
                <td className="d-none d-lg-table-cell">{producto.stockCritico}</td>
                <td>
                  <div className="d-grid gap-2 d-md-flex">
                    <Button className="btn-sm" onClick={() => editar(producto)}>
                      Editar
                    </Button>
                    <Button
                      className="btn-sm"
                      onClick={() => eliminar(producto.codigo)}
                    >
                      Eliminar
                    </Button>
                  </div>
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
