const formularioContacto = document.querySelector("#formulario-contacto");

if (formularioContacto !== null) {
  const nombre = document.querySelector("#contacto-nombre");
  const email = document.querySelector("#contacto-email");
  const asunto = document.querySelector("#contacto-asunto");
  const mensaje = document.querySelector("#contacto-mensaje");

  const errorNombre = document.querySelector("#error-contacto-nombre");
  const errorEmail = document.querySelector("#error-contacto-email");
  const errorAsunto = document.querySelector("#error-contacto-asunto");
  const errorMensaje = document.querySelector("#error-contacto-mensaje");

  const mensajeContacto = document.querySelector("#mensaje-contacto");

  function mostrarError(campo, elementoError, texto) {
    elementoError.textContent = texto;
    campo.setAttribute("aria-invalid", "true");
  }

  function limpiarError(campo, elementoError) {
    elementoError.textContent = "";
    campo.removeAttribute("aria-invalid");
  }

  function emailValido(valor) {
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(valor);
  }

  function validarFormulario() {
    let formularioValido = true;

    const nombreValor = nombre.value.trim();
    const emailValor = email.value.trim().toLowerCase();
    const asuntoValor = asunto.value;
    const mensajeValor = mensaje.value.trim();

    limpiarError(nombre, errorNombre);
    limpiarError(email, errorEmail);
    limpiarError(asunto, errorAsunto);
    limpiarError(mensaje, errorMensaje);

    if (nombreValor.length < 3) {
      mostrarError(
        nombre,
        errorNombre,
        "Ingresa un nombre de al menos 3 caracteres.",
      );
      formularioValido = false;
    }

    if (nombreValor.length > 100) {
      mostrarError(
        nombre,
        errorNombre,
        "El nombre puede tener máximo 100 caracteres.",
      );
      formularioValido = false;
    }

    if (!emailValido(emailValor)) {
      mostrarError(email, errorEmail, "Ingresa un correo electrónico válido.");
      formularioValido = false;
    }

    if (emailValor.length > 100) {
      mostrarError(email, errorEmail, "El correo puede tener máximo 100 caracteres.");
      formularioValido = false;
    }

    const dominioValido = emailValor.endsWith("@duoc.cl")
      || emailValor.endsWith("@profesor.duoc.cl")
      || emailValor.endsWith("@gmail.com");
    if (!dominioValido) {
      mostrarError(email, errorEmail, "Solo se acepta @duoc.cl, @profesor.duoc.cl o @gmail.com.");
      formularioValido = false;
    }

    if (asuntoValor === "") {
      mostrarError(asunto, errorAsunto, "Selecciona un motivo de contacto.");
      formularioValido = false;
    }

    if (mensajeValor.length < 20) {
      mostrarError(
        mensaje,
        errorMensaje,
        "El mensaje debe tener al menos 20 caracteres.",
      );
      formularioValido = false;
    }

    if (mensajeValor.length > 500) {
      mostrarError(
        mensaje,
        errorMensaje,
        "El mensaje puede tener máximo 500 caracteres.",
      );
      formularioValido = false;
    }

    return formularioValido;
  }

  formularioContacto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    mensajeContacto.textContent = "";

    if (!validarFormulario()) {
      const primerCampoInvalido = formularioContacto.querySelector(
        '[aria-invalid="true"]',
      );

      if (primerCampoInvalido !== null) {
        primerCampoInvalido.focus();
      }

      return;
    }

    mensajeContacto.textContent =
      "Formulario validado correctamente. Gracias por contactarnos.";

    formularioContacto.reset();
  });

  nombre.addEventListener("input", function () {
    limpiarError(nombre, errorNombre);
  });

  email.addEventListener("input", function () {
    limpiarError(email, errorEmail);
  });

  asunto.addEventListener("change", function () {
    limpiarError(asunto, errorAsunto);
  });

  mensaje.addEventListener("input", function () {
    limpiarError(mensaje, errorMensaje);
  });
}
