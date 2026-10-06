import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Inicio() {
  return (
    <Container className="py-5">
      <p className="text-secondary mb-2">La Serena</p>
      <h1>Materiales confiables para cada obra</h1>

      <p className="lead">
        Consulta productos, disponibilidad y encuentra materiales para tus
        proyectos.
      </p>

      <div className="d-flex gap-2 flex-wrap">
        <Button as={Link} to="/productos" variant="warning">
          Explorar catálogo
        </Button>

        <Button as={Link} to="/contacto" variant="outline-light">
          Solicitar asesoría
        </Button>
      </div>
    </Container>
  );
}

export default Inicio;
