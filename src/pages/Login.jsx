import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { leerUsuarios } from "../utils/persistencia";
import { buscarUsuario } from "../utils/usuarios";
import { hayErrores, validarLogin } from "../utils/validaciones";

const inicial = { correo: "", contrasena: "" };

function Login({ usuario, onIngresar, onSalir }) {
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");

  function salir() {
    onSalir();
    setMensaje("Cerraste sesión correctamente");
  }

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
  }

  function enviar(evento) {
    evento.preventDefault();
    const correo = datos.correo.trim().toLowerCase();
    const encontrado = buscarUsuario(leerUsuarios(), correo);
    const nuevosErrores = validarLogin(datos, encontrado);

    setErrores(nuevosErrores);
    if (hayErrores(nuevosErrores)) return;

    onIngresar(encontrado);
    setMensaje("");
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

          <button className="btn btn-outline-light" onClick={salir}>
            Cerrar sesión
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="resumen mx-auto formulario-login">
        <img
          className="d-block mx-auto mb-3 logo-login"
          src="/assets/img/logo.png"
          alt="Logo de la ferretería"
        />
        <h1 className="h3 mb-4 text-center">Iniciar sesión</h1>

        {mensaje && <p className="text-success fw-bold">{mensaje}</p>}

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

        <p className="mt-3 mb-0">
          ¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link>
        </p>
      </div>
    </Container>
  );
}

export default Login;
