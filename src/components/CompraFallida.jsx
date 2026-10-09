import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function CompraFallida({ onReintentar }) {
  return (
    <Container className="py-4">
      <h1>No se pudo realizar el pago</h1>
      <p className="text-danger fw-bold">
        Uno o más productos superan el stock disponible.
      </p>
      <p>Ajusta las cantidades en tu carrito y vuelve a intentarlo.</p>

      <div className="d-flex flex-wrap gap-2">
        <Link className="btn btn-warning" to="/carrito">
          Volver al carrito
        </Link>

        <Button variant="outline-light" onClick={onReintentar}>
          Volver a intentar
        </Button>
      </div>
    </Container>
  );
}

export default CompraFallida;
