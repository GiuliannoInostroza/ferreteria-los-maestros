import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatearPrecio } from "../utils/precio";

function TarjetaProducto({ producto, onAgregar }) {
  const stockBajo = producto.stock <= producto.stockCritico;

  return (
    <Card className="h-100 bg-body-tertiary border-secondary">
      <Card.Img
        variant="top"
        src={`/assets/img/productos/${producto.codigo}.jpg`}
        alt={producto.nombre}
        className="producto-img"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Text className="text-secondary mb-1">
          {producto.categoria}
        </Card.Text>

        <Card.Title>{producto.nombre}</Card.Title>

        <Card.Text>{producto.marca}</Card.Text>

        <Card.Text className={stockBajo ? "text-warning" : "text-success"}>
          {stockBajo
            ? `Solo quedan ${producto.stock}`
            : `${producto.stock} disponibles`}
        </Card.Text>

        <strong className="mb-3">{formatearPrecio(producto.precio)}</strong>

        <div className="mt-auto d-flex gap-2">
          <Button
            as={Link}
            to={`/productos/${producto.codigo}`}
            variant="outline-light"
            className="flex-fill"
          >
            Ver detalle
          </Button>

          {onAgregar && (
            <Button
              variant="warning"
              className="flex-fill"
              onClick={() => onAgregar(producto)}
            >
              Añadir
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default TarjetaProducto;
