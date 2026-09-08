function mostrarCarrito() {
  const contenedor = document.querySelector("#lista-carrito");
  if (contenedor === null) {
    return;
  }

  const productosGuardados = localStorage.getItem("productosFerreteria");
  const catalogo = productosGuardados !== null ? JSON.parse(productosGuardados) : productos;

  const carritoGuardado = localStorage.getItem("carrito");
  const carrito = carritoGuardado !== null ? JSON.parse(carritoGuardado) : [];

  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p class='carrito-vacio'>Tu carrito esta vacio.</p>";
    document.querySelector("#resumen-total").textContent = "0";
    return;
  }

  let total = 0;
  let cantidadTotal = 0;

  for (const item of carrito) {
    let producto = null;
    for (const p of catalogo) {
      if (p.codigo === item.codigo) {
        producto = p;
      }
    }

    const subtotal = producto.precio * item.cantidad;
    total = total + subtotal;
    cantidadTotal = cantidadTotal + item.cantidad;

    const linea = document.createElement("div");
    linea.classList.add("item-carrito");

    const miniatura = document.createElement("div");
    miniatura.classList.add("miniatura");

    const foto = document.createElement("img");
    foto.src = producto.imagen;
    foto.alt = producto.nombre;
    miniatura.appendChild(foto);
    linea.appendChild(miniatura);

    const info = document.createElement("div");
    info.innerHTML = "<p>" + producto.nombre + "</p><p class='muted small'>$ "
      + producto.precio.toLocaleString("es-CL") + " cada uno</p>";
    linea.appendChild(info);

    const controles = document.createElement("div");
    controles.classList.add("item-controles");

    const botonMenos = document.createElement("button");
    botonMenos.textContent = "-";
    botonMenos.addEventListener("click", function () {
      cambiarCantidad(item.codigo, -1);
    });

    const cantidad = document.createElement("span");
    cantidad.textContent = item.cantidad;

    const botonMas = document.createElement("button");
    botonMas.textContent = "+";
    botonMas.addEventListener("click", function () {
      cambiarCantidad(item.codigo, 1);
    });

    const grupoCantidad = document.createElement("div");
    grupoCantidad.classList.add("cantidad");
    grupoCantidad.appendChild(botonMenos);
    grupoCantidad.appendChild(cantidad);
    grupoCantidad.appendChild(botonMas);
    controles.appendChild(grupoCantidad);

    const subtotalTexto = document.createElement("span");
    subtotalTexto.textContent = "$ " + subtotal.toLocaleString("es-CL");
    controles.appendChild(subtotalTexto);

    const botonQuitar = document.createElement("button");
    botonQuitar.classList.add("btn-quitar");
    botonQuitar.textContent = "Quitar";
    botonQuitar.addEventListener("click", function () {
      quitarDelCarrito(item.codigo);
    });
    controles.appendChild(botonQuitar);

    linea.appendChild(controles);
    contenedor.appendChild(linea);
  }

  document.querySelector("#resumen-cantidad").textContent = cantidadTotal + " unidades";
  document.querySelector("#resumen-total").textContent = total.toLocaleString("es-CL");
}

function cambiarCantidad(codigo, cambio) {
  const carritoGuardado = localStorage.getItem("carrito");
  const carrito = carritoGuardado !== null ? JSON.parse(carritoGuardado) : [];

  for (const item of carrito) {
    if (item.codigo === codigo) {
      item.cantidad = item.cantidad + cambio;
    }
  }

  const carritoLimpio = [];
  for (const item of carrito) {
    if (item.cantidad > 0) {
      carritoLimpio.push(item);
    }
  }

  localStorage.setItem("carrito", JSON.stringify(carritoLimpio));
  mostrarCarrito();
}

function quitarDelCarrito(codigo) {
  const carritoGuardado = localStorage.getItem("carrito");
  const carrito = carritoGuardado !== null ? JSON.parse(carritoGuardado) : [];

  const carritoLimpio = [];
  for (const item of carrito) {
    if (item.codigo !== codigo) {
      carritoLimpio.push(item);
    }
  }

  localStorage.setItem("carrito", JSON.stringify(carritoLimpio));
  mostrarCarrito();
}

const botonPagar = document.querySelector("#boton-pagar");
if (botonPagar !== null) {
  botonPagar.addEventListener("click", function () {
    const carritoGuardado = localStorage.getItem("carrito");
    const carrito = carritoGuardado !== null ? JSON.parse(carritoGuardado) : [];
    if (carrito.length === 0) {
      alert("Tu carrito esta vacio");
      return;
    }
    alert("Gracias por tu compra. Esta simulacion no incluye pago real.");
    localStorage.removeItem("carrito");
    mostrarCarrito();
  });
}

mostrarCarrito();
