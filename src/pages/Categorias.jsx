import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import TarjetaProducto from "../components/TarjetaProducto";
import { categorias } from "../data/productos";
import { productosDeCategoria } from "../utils/catalogo";
import { mensajeAgregado } from "../utils/mensajes";
import { leerProductos } from "../utils/persistencia";

function Categorias({ onAgregar }) {
  const [mensaje, setMensaje] = useState("");
  const productos = leerProductos();

  function agregar(producto) {
    onAgregar(producto);
    setMensaje(mensajeAgregado(producto));
  }

  return (
    <Container className="py-4">
      <h1>Categorías</h1>

      {mensaje && <p className="text-success fw-bold">{mensaje}</p>}

      {categorias.map((categoria) => (
        <section className="my-4" key={categoria}>
          <h2 className="h4 mb-3">{categoria}</h2>

          <Row className="g-4">
            {productosDeCategoria(productos, categoria).map((producto) => (
              <Col xs={12} md={6} lg={4} key={producto.codigo}>
                <TarjetaProducto producto={producto} onAgregar={agregar} />
              </Col>
            ))}
          </Row>
        </section>
      ))}
    </Container>
  );
}

export default Categorias;
