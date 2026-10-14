import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { hayErrores, validarUsuario } from "../../utils/validaciones";

const inicial = {
  nombre: "",
  correo: "",
  rol: "",
};

function FormularioUsuario({
  usuarios,
  usuario,
  onGuardar,
  onCancelar,
  onModificar,
}) {
  const [datos, setDatos] = useState(usuario ? usuario : inicial);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    setDatos(usuario ? usuario : inicial);
    setErrores({});
  }, [usuario]);

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
    if (onModificar) onModificar();
  }

  function enviar(evento) {
    evento.preventDefault();
    const correo = datos.correo.trim().toLowerCase();
    const idActual = usuario ? usuario.id : 0;
    const nuevosErrores = validarUsuario(datos, usuarios, idActual);

    setErrores(nuevosErrores);
    if (hayErrores(nuevosErrores)) return;

    onGuardar({
      ...usuario,
      nombre: datos.nombre.trim(),
      correo,
      rol: datos.rol,
      activo: usuario ? usuario.activo : true,
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
        <select
          id="rolUsuario"
          className={errores.rol ? "form-select is-invalid" : "form-select"}
          name="rol"
          value={datos.rol}
          onChange={cambiar}
        >
          <option value="">Selecciona un rol</option>
          <option value="Administrador">Administrador</option>
          <option value="Vendedor">Vendedor</option>
          <option value="Cliente">Cliente</option>
        </select>
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
