import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import TarjetaProducto from "../components/TarjetaProducto";
import { productosEnOferta } from "../utils/catalogo";
import { mensajeAgregado } from "../utils/mensajes";
import { leerProductos } from "../utils/persistencia";

function Ofertas({ onAgregar }) {
  const [mensaje, setMensaje] = useState("");
  const ofertas = productosEnOferta(leerProductos());

  function agregar(producto) {
    onAgregar(producto);
    setMensaje(mensajeAgregado(producto));
  }

  return (
    <Container className="py-4">
      <h1>Ofertas</h1>

      {mensaje && <p className="text-success fw-bold">{mensaje}</p>}

      {ofertas.length === 0 && <p>Por ahora no hay productos en oferta.</p>}

      <Row className="g-4">
        {ofertas.map((producto) => (
          <Col xs={12} md={6} lg={4} key={producto.codigo}>
            <TarjetaProducto producto={producto} onAgregar={agregar} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Ofertas;
