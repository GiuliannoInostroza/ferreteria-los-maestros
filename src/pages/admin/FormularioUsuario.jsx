import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { correoConDominioPermitido } from "../../utils/correo";

const inicial = {
  nombre: "",
  correo: "",
  rol: "",
};

function FormularioUsuario({ usuarios, usuario, onGuardar, onCancelar }) {
  const [datos, setDatos] = useState(usuario || inicial);
  const [errores, setErrores] = useState({});

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = {};
    const correo = datos.correo.trim().toLowerCase();

    if (!datos.nombre.trim()) nuevosErrores.nombre = "Nombre obligatorio";
    if (!correo) {
      nuevosErrores.correo = "Correo obligatorio";
    } else if (!correoConDominioPermitido(correo)) {
      nuevosErrores.correo =
        "Usa un correo @duocuc.cl, @duoc.cl, @profesor.duoc.cl o @gmail.com";
    } else if (
      usuarios.some((item) => item.correo === correo && item.id !== usuario?.id)
    ) {
      nuevosErrores.correo = "Ya existe un usuario con ese correo";
    }
    if (!datos.rol) nuevosErrores.rol = "Selecciona un rol";

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    onGuardar({
      ...usuario,
      nombre: datos.nombre.trim(),
      correo,
      rol: datos.rol,
      activo: usuario?.activo ?? true,
    });
  }

  return (
    <Form onSubmit={enviar} noValidate className="mb-4">
      <Form.Group className="mb-3" controlId="nombreUsuario">
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
      <Form.Group className="mb-3" controlId="correoUsuario">
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
      <Form.Group className="mb-3" controlId="rolUsuario">
        <Form.Label>Rol</Form.Label>
        <Form.Select
          name="rol"
          value={datos.rol}
          onChange={cambiar}
          isInvalid={Boolean(errores.rol)}
        >
          <option value="">Selecciona un rol</option>
          <option value="Administrador">Administrador</option>
          <option value="Vendedor">Vendedor</option>
          <option value="Cliente">Cliente</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errores.rol}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">{usuario ? "Guardar cambios" : "Guardar"}</Button>{" "}
      <Button type="button" onClick={onCancelar}>
        Cancelar
      </Button>
    </Form>
  );
}

export default FormularioUsuario;
