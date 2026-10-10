import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

import TarjetaProducto from "../components/TarjetaProducto";
import { productos } from "../data/productos";

function Productos({ onAgregar }) {
  const [categoria, setCategoria] = useState("Todas");

  const categorias = [
    "Todas",
    ...new Set(productos.map((producto) => producto.categoria)),
  ];

  const visibles =
    categoria === "Todas"
      ? productos
      : productos.filter((producto) => producto.categoria === categoria);

  return (
    <Container className="py-4">
      <h1>Nuestros productos</h1>

      <Form.Group className="my-4" controlId="filtro-categoria">
        <Form.Label>Filtrar por categoría</Form.Label>
        <Form.Select
          value={categoria}
          onChange={(evento) => setCategoria(evento.target.value)}
        >
          {categorias.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </Form.Select>
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
