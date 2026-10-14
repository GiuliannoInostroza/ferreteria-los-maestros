import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import ItemCarrito from "../components/ItemCarrito";
import { calcularTotal, contarUnidades } from "../utils/carrito";
import { mensajeQuitado } from "../utils/mensajes";
import { formatearPrecio } from "../utils/precio";

function Carrito({ carrito, onCambiarCantidad, onQuitar }) {
  const [mensaje, setMensaje] = useState("");

  function quitar(codigo) {
    onQuitar(codigo);
    setMensaje(mensajeQuitado());
  }

  if (carrito.length === 0) {
    return (
      <Container className="py-4">
        <h1>Tu carrito</h1>
        {mensaje && <p className="text-success fw-bold">{mensaje}</p>}
        <p className="text-secondary">Tu carrito está vacío.</p>
        <Link to="/productos">Ver productos</Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Tu carrito</h1>

      {mensaje && <p className="text-success fw-bold">{mensaje}</p>}

      <Row className="g-4">
        <Col xs={12} lg={8}>
          {carrito.map((item) => (
            <ItemCarrito
              key={item.codigo}
              item={item}
              onCambiarCantidad={onCambiarCantidad}
              onQuitar={quitar}
            />
          ))}
        </Col>

        <Col xs={12} lg={4}>
          <aside className="resumen">
            <h2 className="h4">Resumen</h2>

            <p className="d-flex justify-content-between text-secondary">
              <span>Productos</span>
              <span>{contarUnidades(carrito)} unidades</span>
            </p>

            <p className="resumen-total">
              Total: {formatearPrecio(calcularTotal(carrito))}
            </p>

            <Link className="btn btn-warning w-100" to="/checkout">
              Finalizar compra
            </Link>
          </aside>
        </Col>
      </Row>
    </Container>
  );
}

export default Carrito;
