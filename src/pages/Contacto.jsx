import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

import { hayErrores, validarContacto } from "../utils/validaciones";

const inicial = {
  nombre: "",
  email: "",
  asunto: "",
  mensaje: "",
};

function Contacto() {
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState("");

  function cambiar(evento) {
    const { name, value } = evento.target;

    setDatos({
      ...datos,
      [name]: value,
    });
  }

  function enviar(evento) {
    evento.preventDefault();

    const nuevosErrores = validarContacto(datos);

    setErrores(nuevosErrores);

    if (hayErrores(nuevosErrores)) {
      setMensajeExito("");
      return;
    }

    setMensajeExito("Mensaje enviado correctamente");
    setDatos(inicial);
  }

  return (
    <Container className="py-4">
      <h1>Contacto</h1>
      <p>
        Escríbenos si necesitas ayuda con productos, pedidos o cotizaciones.
      </p>

      <Row className="g-4">
        <Col xs={12} lg={5}>
          <section className="bg-body-tertiary rounded p-4 h-100">
            <h2>Información de contacto</h2>
            <p>
              <strong>Dirección:</strong> Av. Francisco de Aguirre 1234, La
              Serena
            </p>
            <p>
              <strong>Teléfono:</strong> +56 9 1234 5678
            </p>
            <p>
              <strong>Correo:</strong> contacto@losmaestros.cl
            </p>
            <p>
              <strong>Horario:</strong> Lunes a sábado - 8:30 a 19:00
            </p>
          </section>
        </Col>

        <Col xs={12} lg={7}>
          <Form
            className="bg-body-tertiary rounded p-4"
            onSubmit={enviar}
            noValidate
          >
            <Form.Group className="mb-3" controlId="contacto-nombre">
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

            <Form.Group className="mb-3" controlId="contacto-email">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={datos.email}
                onChange={cambiar}
                isInvalid={Boolean(errores.email)}
              />
              <Form.Control.Feedback type="invalid">
                {errores.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="contacto-asunto">
              <Form.Label>Motivo de contacto</Form.Label>
              <select
                id="contacto-asunto"
                className={errores.asunto ? "form-select is-invalid" : "form-select"}
                name="asunto"
                value={datos.asunto}
                onChange={cambiar}
              >
                <option value="">Selecciona una opción</option>
                <option value="productos">Consulta sobre productos</option>
                <option value="pedido">Consulta sobre un pedido</option>
                <option value="cotizacion">Solicitar cotización</option>
                <option value="otro">Otro</option>
              </select>
              <Form.Control.Feedback type="invalid">
                {errores.asunto}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="contacto-mensaje">
              <Form.Label>Mensaje</Form.Label>
              <textarea
                className={
                  errores.mensaje ? "form-control is-invalid" : "form-control"
                }
                id="contacto-mensaje"
                rows="6"
                name="mensaje"
                value={datos.mensaje}
                onChange={cambiar}
              />
              <Form.Control.Feedback type="invalid">
                {errores.mensaje}
              </Form.Control.Feedback>
            </Form.Group>

            <button type="submit" className="btn btn-warning">
              Enviar mensaje
            </button>

            {mensajeExito && (
              <p className="text-success mt-3">
                {mensajeExito}
              </p>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Contacto;
