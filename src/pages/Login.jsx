import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { correoConDominioPermitido } from "../utils/correo";

import { usuarios } from "../data/usuarios";

const inicial = { correo: "", contrasena: "" };

function Login({ usuario, onIngresar, onSalir }) {
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState({});

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = {};

    const correo = datos.correo.trim().toLowerCase();

    const guardados = localStorage.getItem("usuariosAdmin");
    const registrados = guardados ? JSON.parse(guardados) : usuarios;

    const encontrado = registrados.find((item) => item.correo === correo);

    if (!correo) {
      nuevosErrores.correo = "Correo obligatorio";
    } else if (!correoConDominioPermitido(correo)) {
      nuevosErrores.correo =
        "Solo se acepta @duocuc.cl, @duoc.cl, @profesor.duoc.cl o @gmail.com";
    } else if (!encontrado) {
      nuevosErrores.correo = "No existe una cuenta con ese correo";
    } else if (!encontrado.activo) {
      nuevosErrores.correo = "La cuenta está desactivada";
    }
    if (datos.contrasena.length < 4 || datos.contrasena.length > 10) {
      nuevosErrores.contrasena =
        "La contraseña debe tener entre 4 y 10 caracteres";
    }

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    onIngresar(encontrado);
    setDatos(inicial);
  }

  if (usuario) {
    return (
      <Container className="py-4">
        <h1>Sesión iniciada</h1>
        <p>
          Hola, {usuario.nombre}. Tu rol es <strong>{usuario.rol}</strong>.
        </p>

        <div className="d-flex flex-wrap gap-2">
          <Link className="btn btn-warning" to="/productos">
            Ver productos
          </Link>

          {usuario.rol !== "Cliente" && (
            <Link className="btn btn-outline-light" to="/admin/productos">
              Ir a administración
            </Link>
          )}

          <button className="btn btn-outline-light" onClick={onSalir}>
            Cerrar sesión
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="resumen mx-auto formulario-login">
        <h1 className="h3 mb-4">Iniciar sesión</h1>

        <Form onSubmit={enviar} noValidate>
          <Form.Group className="mb-3" controlId="correo">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              name="correo"
              value={datos.correo}
              onChange={cambiar}
              isInvalid={Boolean(errores.correo)}
            />
            <Form.Control.Feedback type="invalid">
              {errores.correo}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="contrasena">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="contrasena"
              value={datos.contrasena}
              onChange={cambiar}
              isInvalid={Boolean(errores.contrasena)}
            />
            <Form.Control.Feedback type="invalid">
              {errores.contrasena}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit">Ingresar</Button>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
