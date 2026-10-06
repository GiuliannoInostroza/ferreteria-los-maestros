import { Button, Card, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { productos } from "../data/productos";
import { formatearPrecio } from "../utils/precio";

function DetalleProducto() {
  const { codigo } = useParams();

  const producto = productos.find((item) => item.codigo === codigo);

  if (!producto) {
    return (
      <Container className="py-4">
        <p>El producto solicitado no existe.</p>
        <Link to="/productos">Volver a productos</Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Card className="bg-body-tertiary border-secondary">
        <Card.Body>
          <p className="text-secondary">{producto.categoria}</p>
          <h1>{producto.nombre}</h1>
          <p>{producto.descripcion}</p>
          <p>
            <strong>Marca:</strong> {producto.marca}
          </p>
          <p>
            <strong>Stock:</strong> {producto.stock}
          </p>
          <h2>{formatearPrecio(producto.precio)}</h2>

          <Button as={Link} to="/productos" variant="outline-light">
            Volver
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DetalleProducto;
