import { Link } from "react-router-dom";
import { formatearPrecio } from "../utils/precio";
import { claseStock, textoStock } from "../utils/stock";

function TarjetaProducto({ producto, onAgregar }) {
  return (
    <article className="card h-100">
      <img
        src={`/assets/img/productos/${producto.codigo}.jpg`}
        alt={producto.nombre}
        className="card-img-top producto-img"
      />
      <div className="card-body d-flex flex-column">
        <p className="text-secondary mb-1">{producto.categoria}</p>

        <h2 className="h5">{producto.nombre}</h2>

        <p>{producto.marca}</p>

        <p className={claseStock(producto)}>{textoStock(producto)}</p>

        <strong className="mb-3">{formatearPrecio(producto.precio)}</strong>

        <div className="mt-auto d-flex gap-2">
          <Link
            className="btn btn-outline-light flex-fill"
            to={`/productos/${producto.codigo}`}
          >
            Ver detalle
          </Link>

          {onAgregar && (
            <button
              className="btn btn-warning flex-fill"
              onClick={() => onAgregar(producto)}
              disabled={producto.stock === 0}
            >
              Añadir
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default TarjetaProducto;
