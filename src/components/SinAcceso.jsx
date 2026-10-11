import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function SinAcceso() {
  return (
    <Container className="py-4">
      <h1>No tienes acceso</h1>
      <p>Esta vista es solo para vendedores y administradores.</p>
      <Link to="/login">Iniciar sesión</Link>
    </Container>
  );
}

export default SinAcceso;
