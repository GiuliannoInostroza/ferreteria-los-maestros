const formulario = document.querySelector("#formulario-registro");
const nombre = document.querySelector("#nombre");
const rut = document.querySelector("#rut");
const correo = document.querySelector("#correo");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");
const tipoCliente = document.querySelector("#tipo-cliente");
const contrasena = document.querySelector("#contrasena");
const confirmarContrasena = document.querySelector("#confirmar-contrasena");
const mensajeExito = document.querySelector("#mensaje-exito");

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

const regiones = {
  "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
  "Tarapacá": ["Iquique", "Alto Hospicio", "Pica", "Huara"],
  "Antofagasta": ["Antofagasta", "Calama", "Tocopilla", "Mejillones"],
  "Atacama": ["Copiapó", "Vallenar", "Chañaral", "Diego de Almagro"],
  "Coquimbo": ["La Serena", "Coquimbo", "Ovalle", "Illapel", "Vicuña"],
  "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "San Antonio"],
  "Metropolitana": ["Santiago", "Providencia", "Maipú", "Puente Alto"],
  "O Higgins": ["Rancagua", "San Fernando", "Santa Cruz", "Pichilemu"],
  "Maule": ["Talca", "Curicó", "Linares", "Cauquenes"],
  "Ñuble": ["Chillán", "Quirihue", "Coelemu"],
  "Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Chiguayante"],
  "Araucanía": ["Temuco", "Villarrica", "Pucón", "Angol"],
  "Los Ríos": ["Valdivia", "La Unión", "Río Bueno"],
  "Los Lagos": ["Puerto Montt", "Osorno", "Castro", "Ancud"],
  "Aysén": ["Coyhaique", "Puerto Aysén"],
  "Magallanes": ["Punta Arenas", "Puerto Natales"]
};

const region = document.querySelector("#region");
const comuna = document.querySelector("#comuna");

for (const nombreRegion in regiones) {
  const opcionRegion = document.createElement("option");
  opcionRegion.value = nombreRegion;
  opcionRegion.textContent = nombreRegion;
  region.appendChild(opcionRegion);
}

region.addEventListener("change", function () {
  comuna.innerHTML = '<option value="">Selecciona una comuna</option>';
  const comunas = regiones[region.value];
  if (comunas !== undefined) {
    for (const unaComuna of comunas) {
      const opcion = document.createElement("option");
      opcion.value = unaComuna;
      opcion.textContent = unaComuna;
      comuna.appendChild(opcion);
    }
  }
});

function validarRegion(valor) {
  limpiarError(region, "error-region");
  if (valor === "") {
    mostrarError(region, "error-region", "Selecciona una región");
    return false;
  }
  return true;
}

function validarComuna(valor) {
  limpiarError(comuna, "error-comuna");
  if (valor === "") {
    mostrarError(comuna, "error-comuna", "Selecciona una comuna");
    return false;
  }
  return true;
}

function validarNombre(valor) {
  limpiarError(nombre, "error-nombre");
  if (valor === "") {
    mostrarError(nombre, "error-nombre", "El nombre es obligatorio");
    return false;
  }
  if (valor.length > 80) {
    mostrarError(nombre, "error-nombre", "Máximo 80 caracteres");
    return false;
  }
  return true;
}

function validarCorreo(valor) {
  limpiarError(correo, "error-correo");
  if (valor === "") {
    mostrarError(correo, "error-correo", "El correo es obligatorio");
    return false;
  }
  if (!valor.includes("@")) {
    mostrarError(correo, "error-correo", "El correo debe contener @");
    return false;
  }
  if (!valor.includes(".")) {
    mostrarError(correo, "error-correo", "El correo debe tener un dominio válido");
    return false;
  }
  const dominioValido = valor.endsWith("@duoc.cl")
    || valor.endsWith("@profesor.duoc.cl")
    || valor.endsWith("@gmail.com");
  if (!dominioValido) {
    mostrarError(correo, "error-correo", "Solo se acepta @duoc.cl, @profesor.duoc.cl o @gmail.com");
    return false;
  }
  return true;
}

function validarTelefono(valor) {
  limpiarError(telefono, "error-telefono");
  if (valor === "") {
    mostrarError(telefono, "error-telefono", "El teléfono es obligatorio");
    return false;
  }
  const formatoTelefono = /^[0-9]{9}$/;
  if (!formatoTelefono.test(valor)) {
    mostrarError(telefono, "error-telefono", "Debe tener 9 dígitos, sin espacios ni guiones");
    return false;
  }
  return true;
}

function validarDireccion(valor) {
  limpiarError(direccion, "error-direccion");
  if (valor === "") {
    mostrarError(direccion, "error-direccion", "La dirección es obligatoria");
    return false;
  }
  if (valor.length > 150) {
    mostrarError(direccion, "error-direccion", "Máximo 150 caracteres");
    return false;
  }
  return true;
}

function validarTipoCliente(valor) {
  limpiarError(tipoCliente, "error-tipo-cliente");
  if (valor === "") {
    mostrarError(tipoCliente, "error-tipo-cliente", "Selecciona un tipo de cliente");
    return false;
  }
  return true;
}

function validarContrasena(valor) {
  limpiarError(contrasena, "error-contrasena");
  if (valor.length < 6 || valor.length > 12) {
    mostrarError(contrasena, "error-contrasena", "Debe contener entre 6 y 12 caracteres");
    return false;
  }
  return true;
}

function validarConfirmarContrasena(valor, valorContrasena) {
  limpiarError(confirmarContrasena, "error-confirmar");
  if (valor === "") {
    mostrarError(confirmarContrasena, "error-confirmar", "Confirma tu contraseña");
    return false;
  }
  if (valor !== valorContrasena) {
    mostrarError(confirmarContrasena, "error-confirmar", "Las contraseñas no coinciden");
    return false;
  }
  return true;
}

function validarRut(valor) {
  limpiarError(rut, "error-rut");
  const formatoRut = /^[0-9]{7,8}[0-9Kk]$/;
  if (!formatoRut.test(valor)) {
    mostrarError(rut, "error-rut", "Escribe el RUT sin puntos ni guion");
    return false;
  }
  const cuerpo = valor.slice(0, -1);
  const digitoIngresado = valor.slice(-1).toUpperCase();
  let suma = 0;
  let multiplicador = 2;
  for (let posicion = cuerpo.length - 1; posicion >= 0; posicion--) {
    suma = suma + Number(cuerpo[posicion]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  const resto = 11 - (suma % 11);
  let digitoCalculado = String(resto);
  if (resto === 11) digitoCalculado = "0";
  if (resto === 10) digitoCalculado = "K";
  if (digitoIngresado !== digitoCalculado) {
    mostrarError(rut, "error-rut", "El dígito verificador no es correcto");
    return false;
  }
  return true;
}

function procesarRegistro(evento) {
  evento.preventDefault();

  const valorNombre = nombre.value.trim();
  const valorRut = rut.value.trim();
  const valorCorreo = correo.value.trim().toLowerCase();
  const valorTelefono = telefono.value.trim();
  const valorDireccion = direccion.value.trim();
  const valorTipoCliente = tipoCliente.value;
  const valorContrasena = contrasena.value;
  const valorConfirmarContrasena = confirmarContrasena.value;

  const nombreValido = validarNombre(valorNombre);
  const valorRegion = region.value;
  const valorComuna = comuna.value;
  const rutValido = validarRut(valorRut);
  const regionValida = validarRegion(valorRegion);
  const comunaValida = validarComuna(valorComuna);
  const correoValido = validarCorreo(valorCorreo);
  const telefonoValido = validarTelefono(valorTelefono);
  const direccionValida = validarDireccion(valorDireccion);
  const tipoClienteValido = validarTipoCliente(valorTipoCliente);
  const contrasenaValida = validarContrasena(valorContrasena);
  const confirmarValido = validarConfirmarContrasena(valorConfirmarContrasena, valorContrasena);

  const formularioValido =
    nombreValido && rutValido && correoValido && telefonoValido && regionValida && comunaValida &&
    direccionValida && tipoClienteValido && contrasenaValida && confirmarValido;

  if (!formularioValido) {
    mensajeExito.textContent = "Revisa los campos marcados";
    return;
  }

  const nuevoUsuario = {
    nombre: valorNombre,
    rut: valorRut.toUpperCase(),
    correo: valorCorreo,
    telefono: valorTelefono,
    direccion: valorDireccion,
    region: valorRegion,
    comuna: valorComuna,
    tipoCliente: valorTipoCliente
  };

  const usuariosGuardados = localStorage.getItem("usuariosFerreteria");
  const listaUsuarios = usuariosGuardados !== null ? JSON.parse(usuariosGuardados) : [];
  listaUsuarios.push(nuevoUsuario);
  localStorage.setItem("usuariosFerreteria", JSON.stringify(listaUsuarios));

  mensajeExito.textContent = "Cuenta creada correctamente";
  formulario.reset();
}

formulario.addEventListener("submit", procesarRegistro);

nombre.addEventListener("blur", function () {
  validarNombre(nombre.value.trim());
});
nombre.addEventListener("input", function () {
  limpiarError(nombre, "error-nombre");
});

rut.addEventListener("blur", function () {
  validarRut(rut.value.trim());
});
rut.addEventListener("input", function () {
  limpiarError(rut, "error-rut");
});

correo.addEventListener("blur", function () {
  validarCorreo(correo.value.trim().toLowerCase());
});
correo.addEventListener("input", function () {
  limpiarError(correo, "error-correo");
});

telefono.addEventListener("blur", function () {
  validarTelefono(telefono.value.trim());
});
telefono.addEventListener("input", function () {
  limpiarError(telefono, "error-telefono");
});

direccion.addEventListener("blur", function () {
  validarDireccion(direccion.value.trim());
});
direccion.addEventListener("input", function () {
  limpiarError(direccion, "error-direccion");
});

contrasena.addEventListener("blur", function () {
  validarContrasena(contrasena.value);
});
contrasena.addEventListener("input", function () {
  limpiarError(contrasena, "error-contrasena");
});

confirmarContrasena.addEventListener("blur", function () {
  validarConfirmarContrasena(confirmarContrasena.value, contrasena.value);
});
confirmarContrasena.addEventListener("input", function () {
  limpiarError(confirmarContrasena, "error-confirmar");
});
