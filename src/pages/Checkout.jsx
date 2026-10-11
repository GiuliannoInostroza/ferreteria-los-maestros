import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import CompraExitosa from "../components/CompraExitosa";
import CompraFallida from "../components/CompraFallida";
import { calcularTotal } from "../utils/carrito";
import { formatearPrecio } from "../utils/precio";

const inicial = {
  nombre: "",
  correo: "",
  entrega: "Retiro en tienda",
  direccion: "",
};

function Checkout({ carrito, onVaciar }) {
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState({});
  const [resultado, setResultado] = useState("");
  const [pedido, setPedido] = useState(null);

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = {};

    if (!datos.nombre.trim()) nuevosErrores.nombre = "Nombre obligatorio";
    if (!datos.correo.trim()) nuevosErrores.correo = "Correo obligatorio";
    if (datos.entrega === "Despacho a domicilio" && !datos.direccion.trim()) {
      nuevosErrores.direccion = "Dirección obligatoria";
    }

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const sinStock = carrito.some((item) => item.cantidad > item.stock);

    if (sinStock) {
      setResultado("fallida");
      return;
    }

    setPedido({
      ...datos,
      productos: carrito,
      total: calcularTotal(carrito),
    });
    setResultado("exitosa");
    onVaciar();
  }

  if (resultado === "exitosa") {
    return <CompraExitosa pedido={pedido} />;
  }

  if (resultado === "fallida") {
    return <CompraFallida onReintentar={() => setResultado("")} />;
  }

  if (carrito.length === 0) {
    return (
      <Container className="py-4">
        <h1>Finalizar compra</h1>
        <p className="text-secondary">No hay productos en tu carrito.</p>
        <Link to="/productos">Ver productos</Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Finalizar compra</h1>

      <Row className="g-4">
        <Col xs={12} lg={7}>
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

            <Form.Group className="mb-3" controlId="entrega">
              <Form.Label>Entrega</Form.Label>
              <select
                className="form-select"
                id="entrega"
                name="entrega"
                value={datos.entrega}
                onChange={cambiar}
              >
                <option>Retiro en tienda</option>
                <option>Despacho a domicilio</option>
              </select>
            </Form.Group>

            {datos.entrega === "Despacho a domicilio" && (
              <Form.Group className="mb-3" controlId="direccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  name="direccion"
                  value={datos.direccion}
                  onChange={cambiar}
                  isInvalid={Boolean(errores.direccion)}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.direccion}
                </Form.Control.Feedback>
              </Form.Group>
            )}

            <button type="submit" className="btn btn-warning">
              Confirmar compra
            </button>
          </Form>
        </Col>

        <Col xs={12} lg={5}>
          <aside className="resumen">
            <h2 className="h4">Tu pedido</h2>

            {carrito.map((item) => (
              <p
                className="d-flex justify-content-between text-secondary"
                key={item.codigo}
              >
                <span>
                  {item.cantidad} x {item.nombre}
                </span>
                <span>{formatearPrecio(item.precio * item.cantidad)}</span>
              </p>
            ))}

            <p className="resumen-total mb-0">
              Total: {formatearPrecio(calcularTotal(carrito))}
            </p>
          </aside>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
