import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import { blogs } from "../data/blogs";

function Blogs() {
  return (
    <Container className="py-4">
      <header className="mb-4">
        <p className="text-secondary mb-2">Consejos y novedades</p>
        <h1>Blog de Ferretería Los Maestros</h1>
        <p>
          Consejos prácticos sobre herramientas, construcción, reparación y
          mantenimiento.
        </p>
      </header>

      <Row className="g-4">
        {blogs.map((blog) => (
          <Col xs={12} md={6} key={blog.id}>
            <Card className="h-100 bg-dark border-secondary">
              <Card.Body>
                <Card.Text className="text-secondary">{blog.fecha}</Card.Text>
                <Card.Title>{blog.titulo}</Card.Title>
                <Card.Text>{blog.resumen}</Card.Text>
                <Link to={`/blogs/${blog.id}`}>Leer artículo</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Blogs;
