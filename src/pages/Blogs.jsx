import { Col, Container, Row } from "react-bootstrap";
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
            <article className="card h-100">
              <img
                src={blog.imagen}
                alt={blog.titulo}
                className="card-img-top blog-img"
              />
              <div className="card-body">
                <p className="text-secondary">{blog.fecha}</p>
                <h2 className="h5">
                  <Link to={`/blogs/${blog.id}`}>{blog.titulo}</Link>
                </h2>
                <p>{blog.resumen}</p>
                <Link to={`/blogs/${blog.id}`}>Leer artículo</Link>
              </div>
            </article>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Blogs;
