import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { mensajeAgregado } from "../utils/mensajes";
import { leerProductos } from "../utils/persistencia";
import { formatearPrecio } from "../utils/precio";

function DetalleProducto({ onAgregar }) {
  const { codigo } = useParams();
  const [mensaje, setMensaje] = useState("");

  const producto = leerProductos().find((item) => item.codigo === codigo);

  if (!producto) {
    return (
      <Container className="py-4">
        <p>El producto solicitado no existe.</p>
        <Link to="/productos">Volver a productos</Link>
      </Container>
    );
  }

  function agregar() {
    onAgregar(producto);
    setMensaje(mensajeAgregado(producto));
  }

  return (
    <Container className="py-4">
      <article className="card">
        <div className="card-body">
          <p className="text-secondary">{producto.categoria}</p>
          <h1>{producto.nombre}</h1>
          <p>{producto.descripcion}</p>
          <p>
            <strong>Marca:</strong> {producto.marca}
          </p>
          <p>
            <strong>Stock:</strong> {producto.stock}
          </p>
          <h2>{formatearPrecio(producto.precio)}</h2>

          {producto.stock === 0 && (
            <p className="text-danger fw-bold">Sin stock</p>
          )}
          {producto.stock > 0 && producto.stock <= producto.stockCritico && (
            <p className="text-warning fw-bold">¡Últimas unidades!</p>
          )}

          <button
            className="btn btn-warning me-2"
            onClick={agregar}
            disabled={producto.stock <= 0}
          >
            Añadir al carrito
          </button>

          <Link className="btn btn-outline-light" to="/productos">
            Volver
          </Link>

          {mensaje && <p className="text-success fw-bold mt-3">{mensaje}</p>}
        </div>
      </article>
    </Container>
  );
}

export default DetalleProducto;
