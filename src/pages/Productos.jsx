import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

import TarjetaProducto from "../components/TarjetaProducto";
import { categorias, productos } from "../data/productos";

function Productos({ onAgregar }) {
  const [categoria, setCategoria] = useState("Todas");

  const visibles =
    categoria === "Todas"
      ? productos
      : productos.filter((producto) => producto.categoria === categoria);

  return (
    <Container className="py-4">
      <h1>Nuestros productos</h1>

      <Form.Group className="my-4" controlId="filtro-categoria">
        <Form.Label>Filtrar por categoría</Form.Label>
        <select
          id="filtro-categoria"
          className="form-select"
          value={categoria}
          onChange={(evento) => setCategoria(evento.target.value)}
        >
          <option>Todas</option>
          {categorias.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </Form.Group>

      <Row className="g-4">
        {visibles.map((producto) => (
          <Col xs={12} md={6} lg={4} key={producto.codigo}>
            <TarjetaProducto producto={producto} onAgregar={onAgregar} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Productos;
