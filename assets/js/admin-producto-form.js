const formularioProducto = document.querySelector("#formulario-producto");
const codigo = document.querySelector("#codigo");
const nombreProducto = document.querySelector("#nombre-producto");
const marca = document.querySelector("#marca");
const categoria = document.querySelector("#categoria");
const precio = document.querySelector("#precio");
const stock = document.querySelector("#stock");
const stockCritico = document.querySelector("#stock-critico");
const descripcion = document.querySelector("#descripcion");
const mensajeExitoProducto = document.querySelector("#mensaje-exito-producto");
const tituloFormularioProducto = document.querySelector("#titulo-formulario-producto");

function cargarProductosAdmin() {
  const productosGuardados = localStorage.getItem("productosFerreteria");
  if (productosGuardados === null) {
    localStorage.setItem("productosFerreteria", JSON.stringify(productos));
    return productos;
  }
  return JSON.parse(productosGuardados);
}

function guardarProductosAdmin(lista) {
  localStorage.setItem("productosFerreteria", JSON.stringify(lista));
}

const codigoEnEdicion = localStorage.getItem("productoEnEdicion");
let productoOriginal = null;

if (codigoEnEdicion !== null) {
  const listaProductos = cargarProductosAdmin();
  for (const producto of listaProductos) {
    if (producto.codigo === codigoEnEdicion) {
      productoOriginal = producto;
    }
  }
}

if (productoOriginal !== null) {
  tituloFormularioProducto.textContent = "Editar producto";
  codigo.value = productoOriginal.codigo;
  codigo.setAttribute("readonly", "true");
  nombreProducto.value = productoOriginal.nombre;
  marca.value = productoOriginal.marca;
  categoria.value = productoOriginal.categoria;
  precio.value = productoOriginal.precio;
  stock.value = productoOriginal.stock;
  stockCritico.value = productoOriginal.stockCritico;
  descripcion.value = productoOriginal.descripcion;
}

function mostrarError(control, idError, mensaje) {
  const salida = document.querySelector(`#${idError}`);
  salida.textContent = mensaje;
  control.classList.add("campo-invalido");
  control.setAttribute("aria-invalid", "true");
}

function limpiarError(control, idError) {
  const salida = document.querySelector(`#${idError}`);
  salida.textContent = "";
  control.classList.remove("campo-invalido");
  control.removeAttribute("aria-invalid");
}

function validarCodigo(valor) {
  limpiarError(codigo, "error-codigo");
  if (valor === "") {
    mostrarError(codigo, "error-codigo", "El código es obligatorio");
    return false;
  }
  if (productoOriginal === null) {
    const listaProductos = cargarProductosAdmin();
    for (const producto of listaProductos) {
      if (producto.codigo === valor) {
        mostrarError(codigo, "error-codigo", "Ya existe un producto con ese código");
        return false;
      }
    }
  }
  return true;
}

function validarNombreProducto(valor) {
  limpiarError(nombreProducto, "error-nombre-producto");
  if (valor === "") {
    mostrarError(nombreProducto, "error-nombre-producto", "El nombre es obligatorio");
    return false;
  }
  return true;
}

function validarMarca(valor) {
  limpiarError(marca, "error-marca");
  if (valor === "") {
    mostrarError(marca, "error-marca", "La marca es obligatoria");
    return false;
  }
  return true;
}

function validarCategoria(valor) {
  limpiarError(categoria, "error-categoria");
  if (valor === "") {
    mostrarError(categoria, "error-categoria", "Selecciona una categoría");
    return false;
  }
  return true;
}

function validarEnteroNoNegativo(valor, control, idError, etiqueta) {
  limpiarError(control, idError);
  const formatoEntero = /^[0-9]+$/;
  if (valor === "") {
    mostrarError(control, idError, `${etiqueta} es obligatorio`);
    return false;
  }
  if (!formatoEntero.test(valor)) {
    mostrarError(control, idError, `${etiqueta} debe ser un número entero mayor o igual a cero`);
    return false;
  }
  return true;
}

function validarDescripcion(valor) {
  limpiarError(descripcion, "error-descripcion");
  if (valor === "") {
    mostrarError(descripcion, "error-descripcion", "La descripción es obligatoria");
    return false;
  }
  return true;
}

function procesarFormularioProducto(evento) {
  evento.preventDefault();

  const valorCodigo = codigo.value.trim().toUpperCase();
  const valorNombre = nombreProducto.value.trim();
  const valorMarca = marca.value.trim();
  const valorCategoria = categoria.value;
  const valorPrecio = precio.value.trim();
  const valorStock = stock.value.trim();
  const valorStockCritico = stockCritico.value.trim();
  const valorDescripcion = descripcion.value.trim();

  const codigoValido = validarCodigo(valorCodigo);
  const nombreValido = validarNombreProducto(valorNombre);
  const marcaValida = validarMarca(valorMarca);
  const categoriaValida = validarCategoria(valorCategoria);
  const precioValido = validarEnteroNoNegativo(valorPrecio, precio, "error-precio", "El precio");
  const stockValido = validarEnteroNoNegativo(valorStock, stock, "error-stock", "El stock");
  const stockCriticoValido = validarEnteroNoNegativo(valorStockCritico, stockCritico, "error-stock-critico", "El stock crítico");
  const descripcionValida = validarDescripcion(valorDescripcion);

  const formularioValido =
    codigoValido && nombreValido && marcaValida && categoriaValida &&
    precioValido && stockValido && stockCriticoValido && descripcionValida;

  if (!formularioValido) {
    mensajeExitoProducto.textContent = "Revisa los campos marcados";
    return;
  }

  const productoGuardado = {
    codigo: valorCodigo,
    nombre: valorNombre,
    marca: valorMarca,
    categoria: valorCategoria,
    precio: Number(valorPrecio),
    stock: Number(valorStock),
    stockCritico: Number(valorStockCritico),
    descripcion: valorDescripcion,
    icono: productoOriginal !== null ? productoOriginal.icono : ""
  };

  const listaProductos = cargarProductosAdmin();

  if (productoOriginal !== null) {
    const listaActualizada = [];
    for (const producto of listaProductos) {
      if (producto.codigo === valorCodigo) {
        listaActualizada.push(productoGuardado);
      } else {
        listaActualizada.push(producto);
      }
    }
    guardarProductosAdmin(listaActualizada);
  } else {
    listaProductos.push(productoGuardado);
    guardarProductosAdmin(listaProductos);
  }

  localStorage.removeItem("productoEnEdicion");
  mensajeExitoProducto.textContent = "Producto guardado correctamente";
}

formularioProducto.addEventListener("submit", procesarFormularioProducto);