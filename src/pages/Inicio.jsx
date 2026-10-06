import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import TarjetaProducto from "../components/TarjetaProducto";
import { productos } from "../data/productos";

function Inicio() {
  const destacados = productos.slice(0, 3);

  return (
    <Container className="py-5">
      <p className="text-secondary mb-2">La Serena</p>

      <h1>Materiales confiables para cada obra</h1>

      <p className="lead">
        Consulta productos, disponibilidad y encuentra materiales para tus
        proyectos.
      </p>

      <div className="d-flex gap-2 flex-wrap mb-5">
        <Button as={Link} to="/productos" variant="warning">
          Explorar catálogo
        </Button>

        <Button as={Link} to="/contacto" variant="outline-light">
          Solicitar asesoría
        </Button>
      </div>

      <h2 className="mb-4">Productos destacados</h2>

      <Row className="g-4">
        {destacados.map((producto) => (
          <Col xs={12} md={6} lg={4} key={producto.codigo}>
            <TarjetaProducto producto={producto} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Inicio;
