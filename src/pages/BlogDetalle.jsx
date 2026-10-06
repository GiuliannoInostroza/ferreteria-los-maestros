import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { blogs } from "../data/blogs";

function BlogDetalle() {
  const { id } = useParams();

  const blog = blogs.find(
    (item) => item.id === Number(id)
  );

  if (!blog) {
    return (
      <Container className="py-4">
        <p>El artículo solicitado no existe.</p>
        <Link to="/blogs">Volver al blog</Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <article className="mx-auto contenido-blog">
        <p className="text-secondary">{blog.categoria}</p>
        <h1>{blog.titulo}</h1>
        <p className="text-secondary">{blog.fecha}</p>

        {blog.contenido.map((parrafo, indice) => (
          <p key={indice}>{parrafo}</p>
        ))}

        <Link to="/blogs">Volver al blog</Link>
      </article>
    </Container>
  );
}

export default BlogDetalle;
