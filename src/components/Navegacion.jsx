import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Navegacion({ unidades, usuario }) {
  return (
    <Navbar
      expand="lg"
      className="bg-dark-subtle border-bottom border-secondary"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Ferretería Los Maestros
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal" />

        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/productos">
              Productos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">
              Nosotros
            </Nav.Link>
            <Nav.Link as={NavLink} to="/blogs">
              Blogs
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">
              Contacto
            </Nav.Link>
            <NavLink className="nav-link" to="/carrito">
              Carrito ({unidades})
            </NavLink>
            {usuario && usuario.rol !== "Cliente" && (
              <NavLink className="nav-link" to="/admin/productos">
                Productos admin
              </NavLink>
            )}
            {usuario && usuario.rol === "Administrador" && (
              <NavLink className="nav-link" to="/admin/usuarios">
                Usuarios admin
              </NavLink>
            )}
            <NavLink className="nav-link" to="/login">
              {usuario ? usuario.nombre : "Ingresar"}
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegacion;
