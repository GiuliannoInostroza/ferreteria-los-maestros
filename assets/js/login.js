const formulario = document.querySelector("#formulario-login");
const correo = document.querySelector("#correo");
const contrasena = document.querySelector("#contrasena");
const mensajeExito = document.querySelector("#mensaje-exito");

function mostrarError(control, idError, mensaje) {
  const salida = document.querySelector("#" + idError);
  salida.textContent = mensaje;
  control.classList.add("campo-invalido");
}

function limpiarError(control, idError) {
  const salida = document.querySelector("#" + idError);
  salida.textContent = "";
  control.classList.remove("campo-invalido");
}

function validarCorreo(valor) {
  limpiarError(correo, "error-correo");
  if (valor === "") {
    mostrarError(correo, "error-correo", "El correo es obligatorio");
    return false;
  }
  if (valor.length > 100) {
    mostrarError(correo, "error-correo", "Máximo 100 caracteres");
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

function validarContrasena(valor) {
  limpiarError(contrasena, "error-contrasena");
  if (valor.length < 4 || valor.length > 10) {
    mostrarError(contrasena, "error-contrasena", "La contraseña debe tener entre 4 y 10 caracteres");
    return false;
  }
  return true;
}

function procesarLogin(evento) {
  evento.preventDefault();

  const valorCorreo = correo.value.trim().toLowerCase();
  const valorContrasena = contrasena.value;

  const correoValido = validarCorreo(valorCorreo);
  const contrasenaValida = validarContrasena(valorContrasena);

  if (!correoValido || !contrasenaValida) {
    mensajeExito.textContent = "";
    return;
  }

  // Buscar el usuario registrado para saber su rol
  const usuariosGuardados = localStorage.getItem("usuariosFerreteria");
  const listaUsuarios = usuariosGuardados !== null ? JSON.parse(usuariosGuardados) : [];

  let tipoUsuario = "cliente";
  for (const usuario of listaUsuarios) {
    if (usuario.correo === valorCorreo) {
      tipoUsuario = usuario.tipoCliente;
    }
  }

  // Sesion simulada: nunca guardamos la contrasena
  const sesion = { correo: valorCorreo, tipo: tipoUsuario };
  localStorage.setItem("sesion", JSON.stringify(sesion));

  mensajeExito.textContent = "Inicio de sesión correcto. ¡Bienvenido!";
  formulario.reset();

  if (tipoUsuario === "administrador") {
    setTimeout(function () {
      window.location.href = "admin.html";
    }, 1200);
  }
}

formulario.addEventListener("submit", procesarLogin);

correo.addEventListener("blur", function () {
  validarCorreo(correo.value.trim().toLowerCase());
});
correo.addEventListener("input", function () {
  limpiarError(correo, "error-correo");
});
contrasena.addEventListener("blur", function () {
  validarContrasena(contrasena.value);
});
contrasena.addEventListener("input", function () {
  limpiarError(contrasena, "error-contrasena");
});