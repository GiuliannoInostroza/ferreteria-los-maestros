import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { usuarios as usuariosIniciales } from "../data/usuarios";
import { correoConDominioPermitido } from "../utils/correo";

const inicial = { nombre: "", correo: "", contrasena: "" };

function Registro() {
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState({});
  const [creada, setCreada] = useState(false);

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = {};

    const correo = datos.correo.trim().toLowerCase();

    const guardados = localStorage.getItem("usuariosAdmin");
    const registrados = guardados ? JSON.parse(guardados) : usuariosIniciales;

    if (!datos.nombre.trim()) nuevosErrores.nombre = "Nombre obligatorio";
    const existe = registrados.some((item) => item.correo === correo);

    if (!correo) nuevosErrores.correo = "Correo obligatorio";
    if (correo && !correoConDominioPermitido(correo)) {
      nuevosErrores.correo =
        "Solo se acepta @duocuc.cl, @duoc.cl, @profesor.duoc.cl o @gmail.com";
    }
    if (correo && correoConDominioPermitido(correo) && existe) {
      nuevosErrores.correo = "Ya existe una cuenta con ese correo";
    }
    if (datos.contrasena.length < 4) {
      nuevosErrores.contrasena =
        "La contraseña debe tener entre 4 y 10 caracteres";
    }
    if (datos.contrasena.length > 10) {
      nuevosErrores.contrasena =
        "La contraseña debe tener entre 4 y 10 caracteres";
    }

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const ultimo = registrados[registrados.length - 1];
    const nuevoUsuario = {
      id: ultimo ? ultimo.id + 1 : 1,
      nombre: datos.nombre.trim(),
      correo,
      rol: "Cliente",
      activo: true,
    };

    localStorage.setItem(
      "usuariosAdmin",
      JSON.stringify([...registrados, nuevoUsuario])
    );
    setDatos(inicial);
    setCreada(true);
  }

  if (creada) {
    return (
      <Container className="py-4">
        <h1>Cuenta creada</h1>
        <p>Tu cuenta quedó registrada como Cliente. Ya puedes iniciar sesión.</p>
        <Link className="btn btn-warning" to="/login">
          Ir a iniciar sesión
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="resumen mx-auto formulario-login">
        <h1 className="h3 mb-4">Crear cuenta</h1>

        <Form onSubmit={enviar} noValidate>
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre"
              value={datos.nombre}
              onChange={cambiar}
              isInvalid={Boolean(errores.nombre)}
            />
            <Form.Control.Feedback type="invalid">
              {errores.nombre}
            </Form.Control.Feedback>
          </Form.Group>

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

          <Button type="submit">Crear cuenta</Button>
        </Form>
      </div>
    </Container>
  );
}

export default Registro;
