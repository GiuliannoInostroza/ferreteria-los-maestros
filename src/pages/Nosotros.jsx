import { Col, Container, Row } from "react-bootstrap";

function Nosotros() {
  return (
    <Container className="py-4">
      <header className="mb-4">
        <h1>Sobre Ferretería Los Maestros</h1>
        <p>
          Más de dos décadas acompañando proyectos de construcción, reparación y
          mejoramiento del hogar en La Serena.
        </p>
      </header>

      <section className="mb-4">
        <h2>Nuestra historia</h2>
        <p>
          Ferretería Los Maestros nació como un negocio familiar en La Serena,
          orientado a entregar productos y herramientas para construcción,
          reparación y mantenimiento.
        </p>
        <p>
          Con más de 22 años de experiencia, ha acompañado a clientes
          particulares y trabajadores del rubro manteniendo un trato cercano.
        </p>
      </section>

      <section className="mb-4">
        <h2>Nuestra misión</h2>
        <p>
          Ofrecer materiales, herramientas y productos de ferretería confiables,
          junto con una atención cercana para ayudar a cada cliente.
        </p>
      </section>

      <section>
        <h2>Nuestros valores</h2>
        <Row className="g-3">
          <Col xs={12} md={4}>
            <div className="border rounded p-3 h-100">
              <h3>Cercanía</h3>
              <p>Atención personalizada para nuestros vecinos.</p>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="border rounded p-3 h-100">
              <h3>Confianza</h3>
              <p>Orientación según las necesidades de cada proyecto.</p>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="border rounded p-3 h-100">
              <h3>Experiencia</h3>
              <p>Más de dos décadas trabajando en el rubro.</p>
            </div>
          </Col>
        </Row>
      </section>
    </Container>
  );
}

export default Nosotros;
