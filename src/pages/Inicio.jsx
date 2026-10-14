import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import TarjetaProducto from "../components/TarjetaProducto";
import { leerProductos } from "../utils/persistencia";

function Inicio() {
  const destacados = leerProductos().filter((producto) => producto.destacado);

  return (
    <Container className="py-5">
      <Row className="g-4 align-items-center mb-5">
        <Col xs={12} lg={6}>
          <p className="text-secondary mb-2">La Serena</p>

          <h1>Materiales confiables para cada obra</h1>

          <p className="lead">
            Consulta productos, disponibilidad y encuentra materiales para tus
            proyectos.
          </p>

          <Row className="g-3 mb-4">
            <Col xs={12} md={4}>
              <div className="bg-body-tertiary rounded p-3 h-100">
                <strong className="d-block fs-5">22 años</strong>
                <span className="text-secondary small">
                  de trayectoria en La Serena
                </span>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="bg-body-tertiary rounded p-3 h-100">
                <strong className="d-block fs-5">+800</strong>
                <span className="text-secondary small">
                  referencias en catálogo
                </span>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="bg-body-tertiary rounded p-3 h-100">
                <strong className="d-block fs-5">Stock real</strong>
                <span className="text-secondary small">
                  consulta antes de venir
                </span>
              </div>
            </Col>
          </Row>

          <div className="d-flex gap-2 flex-wrap">
            <Link className="btn btn-warning" to="/productos">
              Explorar catálogo
            </Link>

            <Link className="btn btn-outline-light" to="/contacto">
              Solicitar asesoría
            </Link>
          </div>
        </Col>

        <Col xs={12} lg={6}>
          <img
            className="img-fluid rounded hero-img"
            src="/assets/img/productos/hero.jpg"
            alt="Pared de herramientas de la ferretería"
          />
        </Col>
      </Row>

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
