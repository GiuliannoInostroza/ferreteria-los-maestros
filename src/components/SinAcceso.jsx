import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function SinAcceso() {
  return (
    <Container className="py-4">
      <h1>No tienes acceso</h1>
      <p>Tu rol no tiene permiso para ver esta vista.</p>
      <Link to="/login">Iniciar sesión</Link>
    </Container>
  );
}

export default SinAcceso;
