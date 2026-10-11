import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const inicial = {
  codigo: "",
  nombre: "",
  marca: "",
  categoria: "",
  precio: "",
  stock: "",
  stockCritico: "",
};

function FormularioProducto({ productos, onGuardar, onCancelar }) {
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState({});

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = {};

    if (!datos.codigo.trim()) {
      nuevosErrores.codigo = "Código obligatorio";
    } else if (productos.some((item) => item.codigo === datos.codigo.trim())) {
      nuevosErrores.codigo = "Ya existe un producto con ese código";
    }
    if (!datos.nombre.trim()) nuevosErrores.nombre = "Nombre obligatorio";
    if (!datos.marca.trim()) nuevosErrores.marca = "Marca obligatoria";
    if (!datos.categoria.trim()) nuevosErrores.categoria = "Categoría obligatoria";
    if (datos.precio === "" || Number(datos.precio) <= 0) {
      nuevosErrores.precio = "El precio debe ser mayor que 0";
    }
    if (datos.stock === "" || Number(datos.stock) < 0) {
      nuevosErrores.stock = "El stock no puede ser negativo";
    }
    if (datos.stockCritico === "" || Number(datos.stockCritico) < 0) {
      nuevosErrores.stockCritico = "El stock crítico no puede ser negativo";
    }

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    onGuardar({
      codigo: datos.codigo.trim(),
      nombre: datos.nombre.trim(),
      marca: datos.marca.trim(),
      categoria: datos.categoria.trim(),
      precio: Number(datos.precio),
      stock: Number(datos.stock),
      stockCritico: Number(datos.stockCritico),
      descripcion: "",
    });
    setDatos(inicial);
  }

  return (
    <Form onSubmit={enviar} noValidate>
      <Row>
        <Col xs={12} md={6}>
          <Form.Group className="mb-3" controlId="codigo">
            <Form.Label>Código</Form.Label>
            <Form.Control
              name="codigo"
              value={datos.codigo}
              onChange={cambiar}
              isInvalid={Boolean(errores.codigo)}
            />
            <Form.Control.Feedback type="invalid">
              {errores.codigo}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
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
        </Col>

        <Col xs={12} md={6}>
          <Form.Group className="mb-3" controlId="marca">
            <Form.Label>Marca</Form.Label>
            <Form.Control
              name="marca"
              value={datos.marca}
              onChange={cambiar}
              isInvalid={Boolean(errores.marca)}
            />
            <Form.Control.Feedback type="invalid">
              {errores.marca}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group className="mb-3" controlId="categoria">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              name="categoria"
              value={datos.categoria}
              onChange={cambiar}
              isInvalid={Boolean(errores.categoria)}
            />
            <Form.Control.Feedback type="invalid">
              {errores.categoria}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={4}>
          <Form.Group className="mb-3" controlId="precio">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={datos.precio}
              onChange={cambiar}
              isInvalid={Boolean(errores.precio)}
            />
            <Form.Control.Feedback type="invalid">
              {errores.precio}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={4}>
          <Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={datos.stock}
              onChange={cambiar}
              isInvalid={Boolean(errores.stock)}
            />
            <Form.Control.Feedback type="invalid">
              {errores.stock}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={4}>
          <Form.Group className="mb-3" controlId="stockCritico">
            <Form.Label>Stock crítico</Form.Label>
            <Form.Control
              type="number"
              name="stockCritico"
              value={datos.stockCritico}
              onChange={cambiar}
              isInvalid={Boolean(errores.stockCritico)}
            />
            <Form.Control.Feedback type="invalid">
              {errores.stockCritico}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Button type="submit">Guardar</Button>{" "}
      <Button type="button" onClick={onCancelar}>
        Cancelar
      </Button>
    </Form>
  );
}

export default FormularioProducto;
