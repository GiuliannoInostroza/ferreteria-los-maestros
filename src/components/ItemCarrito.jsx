import { formatearPrecio } from "../utils/precio";

function ItemCarrito({ item, onCambiarCantidad, onQuitar }) {
  const subtotal = item.precio * item.cantidad;

  return (
    <article className="item-carrito">
      <div className="d-flex align-items-center gap-3">
        <img
          className="miniatura"
          src={`/assets/img/productos/${item.codigo}.jpg`}
          alt={item.nombre}
        />

        <div className="text-break">
          <h2 className="h6 mb-1">{item.nombre}</h2>
          <p className="text-secondary small mb-0">
            {formatearPrecio(item.precio)} cada uno
          </p>
        </div>
      </div>

      {item.cantidad > item.stock && (
        <p className="text-danger fw-bold mt-3 mb-0">
          Supera el stock disponible: quedan {item.stock}
        </p>
      )}

      <div className="d-flex flex-wrap align-items-center gap-3 mt-3">
        <div className="cantidad">
          <button onClick={() => onCambiarCantidad(item.codigo, -1)}>-</button>
          <span>{item.cantidad}</span>
          <button onClick={() => onCambiarCantidad(item.codigo, 1)}>+</button>
        </div>

        <strong>{formatearPrecio(subtotal)}</strong>

        <button className="btn-quitar" onClick={() => onQuitar(item.codigo)}>
          Quitar
        </button>
      </div>
    </article>
  );
}

export default ItemCarrito;
