const formularioUsuario = document.querySelector("#formulario-usuario");
const nombreUsuario = document.querySelector("#nombre-usuario");
const rutUsuario = document.querySelector("#rut-usuario");
const correoUsuario = document.querySelector("#correo-usuario");
const telefonoUsuario = document.querySelector("#telefono-usuario");
const direccionUsuario = document.querySelector("#direccion-usuario");
const tipoClienteUsuario = document.querySelector("#tipo-cliente-usuario");
const mensajeExitoUsuario = document.querySelector("#mensaje-exito-usuario");
const tituloFormularioUsuario = document.querySelector("#titulo-formulario-usuario");

function cargarUsuariosAdmin() {
  const usuariosGuardados = localStorage.getItem("usuariosFerreteria");
  if (usuariosGuardados === null) {
    return [];
  }
  return JSON.parse(usuariosGuardados);
}

function guardarUsuariosAdmin(lista) {
  localStorage.setItem("usuariosFerreteria", JSON.stringify(lista));
}

const rutEnEdicion = localStorage.getItem("usuarioEnEdicion");
let usuarioOriginal = null;

if (rutEnEdicion !== null) {
  const listaUsuarios = cargarUsuariosAdmin();
  for (const usuario of listaUsuarios) {
    if (usuario.rut === rutEnEdicion) {
      usuarioOriginal = usuario;
    }
  }
}

if (usuarioOriginal !== null) {
  tituloFormularioUsuario.textContent = "Editar usuario";
  nombreUsuario.value = usuarioOriginal.nombre;
  rutUsuario.value = usuarioOriginal.rut;
  rutUsuario.setAttribute("readonly", "true");
  correoUsuario.value = usuarioOriginal.correo;
  telefonoUsuario.value = usuarioOriginal.telefono;
  direccionUsuario.value = usuarioOriginal.direccion;
  tipoClienteUsuario.value = usuarioOriginal.tipoCliente;
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

function validarNombreUsuario(valor) {
  limpiarError(nombreUsuario, "error-nombre-usuario");
  if (valor === "") {
    mostrarError(nombreUsuario, "error-nombre-usuario", "El nombre es obligatorio");
    return false;
  }
  if (valor.length > 80) {
    mostrarError(nombreUsuario, "error-nombre-usuario", "Máximo 80 caracteres");
    return false;
  }
  return true;
}

function validarRutUsuario(valor) {
  limpiarError(rutUsuario, "error-rut-usuario");
  const formatoRut = /^[0-9]{7,8}[0-9Kk]$/;
  if (!formatoRut.test(valor)) {
    mostrarError(rutUsuario, "error-rut-usuario", "Escribe el RUT sin puntos ni guion");
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
    mostrarError(rutUsuario, "error-rut-usuario", "El dígito verificador no es correcto");
    return false;
  }
  if (usuarioOriginal === null) {
    const listaUsuarios = cargarUsuariosAdmin();
    for (const usuario of listaUsuarios) {
      if (usuario.rut === valor.toUpperCase()) {
        mostrarError(rutUsuario, "error-rut-usuario", "Ya existe un usuario con ese RUT");
        return false;
      }
    }
  }
  return true;
}

function validarCorreoUsuario(valor) {
  limpiarError(correoUsuario, "error-correo-usuario");
  if (valor === "") {
    mostrarError(correoUsuario, "error-correo-usuario", "El correo es obligatorio");
    return false;
  }
  if (!valor.includes("@")) {
    mostrarError(correoUsuario, "error-correo-usuario", "El correo debe contener @");
    return false;
  }
  if (!valor.includes(".")) {
    mostrarError(correoUsuario, "error-correo-usuario", "El correo debe tener un dominio válido");
    return false;
  }
  return true;
}

function validarTelefonoUsuario(valor) {
  limpiarError(telefonoUsuario, "error-telefono-usuario");
  if (valor === "") {
    mostrarError(telefonoUsuario, "error-telefono-usuario", "El teléfono es obligatorio");
    return false;
  }
  const formatoTelefono = /^[0-9]{9}$/;
  if (!formatoTelefono.test(valor)) {
    mostrarError(telefonoUsuario, "error-telefono-usuario", "Debe tener 9 dígitos, sin espacios ni guiones");
    return false;
  }
  return true;
}

function validarDireccionUsuario(valor) {
  limpiarError(direccionUsuario, "error-direccion-usuario");
  if (valor === "") {
    mostrarError(direccionUsuario, "error-direccion-usuario", "La dirección es obligatoria");
    return false;
  }
  if (valor.length > 150) {
    mostrarError(direccionUsuario, "error-direccion-usuario", "Máximo 150 caracteres");
    return false;
  }
  return true;
}

function validarTipoClienteUsuario(valor) {
  limpiarError(tipoClienteUsuario, "error-tipo-cliente-usuario");
  if (valor === "") {
    mostrarError(tipoClienteUsuario, "error-tipo-cliente-usuario", "Selecciona un tipo de cliente");
    return false;
  }
  return true;
}

function procesarFormularioUsuario(evento) {
  evento.preventDefault();

  const valorNombre = nombreUsuario.value.trim();
  const valorRut = rutUsuario.value.trim();
  const valorCorreo = correoUsuario.value.trim().toLowerCase();
  const valorTelefono = telefonoUsuario.value.trim();
  const valorDireccion = direccionUsuario.value.trim();
  const valorTipoCliente = tipoClienteUsuario.value;

  const nombreValido = validarNombreUsuario(valorNombre);
  const rutValido = validarRutUsuario(valorRut);
  const correoValido = validarCorreoUsuario(valorCorreo);
  const telefonoValido = validarTelefonoUsuario(valorTelefono);
  const direccionValida = validarDireccionUsuario(valorDireccion);
  const tipoClienteValido = validarTipoClienteUsuario(valorTipoCliente);

  const formularioValido =
    nombreValido && rutValido && correoValido &&
    telefonoValido && direccionValida && tipoClienteValido;

  if (!formularioValido) {
    mensajeExitoUsuario.textContent = "Revisa los campos marcados";
    return;
  }

  const usuarioGuardado = {
    nombre: valorNombre,
    rut: valorRut.toUpperCase(),
    correo: valorCorreo,
    telefono: valorTelefono,
    direccion: valorDireccion,
    tipoCliente: valorTipoCliente
  };

  const listaUsuarios = cargarUsuariosAdmin();

  if (usuarioOriginal !== null) {
    const listaActualizada = [];
    for (const usuario of listaUsuarios) {
      if (usuario.rut === valorRut.toUpperCase()) {
        listaActualizada.push(usuarioGuardado);
      } else {
        listaActualizada.push(usuario);
      }
    }
    guardarUsuariosAdmin(listaActualizada);
  } else {
    listaUsuarios.push(usuarioGuardado);
    guardarUsuariosAdmin(listaUsuarios);
  }

  localStorage.removeItem("usuarioEnEdicion");
  mensajeExitoUsuario.textContent = "Usuario guardado correctamente";
}

formularioUsuario.addEventListener("submit", procesarFormularioUsuario);