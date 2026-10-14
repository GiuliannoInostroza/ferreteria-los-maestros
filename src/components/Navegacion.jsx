import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { esAdministrador, puedeAdministrar } from "../utils/sesion";

function Navegacion({ unidades, usuario }) {
  return (
    <Navbar
      expand="xl"
      className="bg-dark-subtle"
      data-bs-theme="dark"
    >
      <Container>
        <NavLink className="navbar-brand" to="/">
          <img src="/assets/img/logo.png" alt="Logo de la ferretería" />
          Ferretería Los Maestros
        </NavLink>

        <Navbar.Toggle aria-controls="menu-principal" />

        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto">
            <NavLink className="nav-link" to="/">
              Inicio
            </NavLink>
            <NavLink className="nav-link" to="/productos">
              Productos
            </NavLink>
            <NavLink className="nav-link" to="/nosotros">
              Nosotros
            </NavLink>
            <NavLink className="nav-link" to="/blogs">
              Blogs
            </NavLink>
            <NavLink className="nav-link" to="/contacto">
              Contacto
            </NavLink>
            <NavLink className="nav-link" to="/carrito">
              Carrito ({unidades})
            </NavLink>
            {puedeAdministrar(usuario) && (
              <NavLink className="nav-link" to="/admin/productos">
                Productos admin
              </NavLink>
            )}
            {esAdministrador(usuario) && (
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
