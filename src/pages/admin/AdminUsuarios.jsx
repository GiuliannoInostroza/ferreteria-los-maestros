import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

import {
  mensajeEliminado,
  mensajeEstado,
  mensajeGuardado,
} from "../../utils/mensajes";
import { guardarUsuarios, leerUsuarios } from "../../utils/persistencia";
import { siguienteId } from "../../utils/usuarios";
import FormularioUsuario from "./FormularioUsuario";

function AdminUsuarios({ usuarioActual }) {
  const idActual = usuarioActual ? usuarioActual.id : 0;

  const [listaUsuarios, setListaUsuarios] = useState(() => leerUsuarios());
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [hayCambios, setHayCambios] = useState(false);
  const [pendiente, setPendiente] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    guardarUsuarios(listaUsuarios);
  }, [listaUsuarios]);

  function guardar(usuario) {
    setMensaje(mensajeGuardado("Usuario", Boolean(usuarioEditando)));

    setListaUsuarios(
      usuarioEditando
        ? listaUsuarios.map((item) => (item.id === usuario.id ? usuario : item))
        : [...listaUsuarios, { ...usuario, id: siguienteId(listaUsuarios) }]
    );

    setHayCambios(false);

    if (pendiente) {
      setUsuarioEditando(pendiente);
      setPendiente(null);
      return;
    }

    setUsuarioEditando(null);
    setMostrarFormulario(false);
  }

  function agregar() {
    setUsuarioEditando(null);
    setHayCambios(false);
    setMostrarFormulario(true);
    window.scrollTo(0, 0);
  }

  function editar(usuario) {
    window.scrollTo(0, 0);

    if (mostrarFormulario && hayCambios) {
      setPendiente(usuario);
      return;
    }

    setUsuarioEditando(usuario);
    setMostrarFormulario(true);
  }

  function descartar() {
    setUsuarioEditando(pendiente);
    setPendiente(null);
    setHayCambios(false);
  }

  function cancelar() {
    setUsuarioEditando(null);
    setPendiente(null);
    setHayCambios(false);
    setMostrarFormulario(false);
  }

  function eliminar(id) {
    setListaUsuarios(listaUsuarios.filter((item) => item.id !== id));
    setMensaje(mensajeEliminado("Usuario"));

    if (usuarioEditando && usuarioEditando.id === id) {
      cancelar();
    }
  }

  function cambiarEstado(usuarioElegido) {
    setMensaje(mensajeEstado(usuarioElegido));

    setListaUsuarios(
      listaUsuarios.map((usuario) =>
        usuario.id === usuarioElegido.id
          ? { ...usuario, activo: !usuario.activo }
          : usuario
      )
    );
  }

  return (
    <Container className="py-4">
      <h1>Administración de usuarios</h1>

      {mensaje && <p className="text-success fw-bold">{mensaje}</p>}

      {!mostrarFormulario && (
        <Button className="mb-4" onClick={agregar}>
          Agregar usuario
        </Button>
      )}

      {mostrarFormulario && (
        <section className="bg-body-tertiary rounded p-4 mb-5">
          <h2 className="h4 mb-4">
            {usuarioEditando ? "Editar usuario" : "Agregar usuario"}
          </h2>

          {pendiente && (
            <div className="bg-body rounded p-3 mb-4">
              <p className="text-warning mb-2">
                Tienes cambios sin guardar. Presiona Guardar cambios para
                guardarlos o descártalos para editar {pendiente.nombre}.
              </p>
              <Button className="btn-sm" onClick={descartar}>
                Descartar cambios
              </Button>
            </div>
          )}

          <FormularioUsuario
            usuarios={listaUsuarios}
            usuario={usuarioEditando}
            onGuardar={guardar}
            onCancelar={cancelar}
            onModificar={() => setHayCambios(true)}
          />
        </section>
      )}

      <div className="table-responsive">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {listaUsuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>
                  <div>{usuario.nombre}</div>
                  <div className="text-secondary small text-break">{usuario.correo}</div>
                </td>
                <td>
                  <div>{usuario.rol}</div>
                  <div className="text-secondary small">
                    {usuario.activo ? "Activo" : "Inactivo"}
                  </div>
                </td>
                <td>
                  <div className="d-grid gap-2 d-md-flex">
                    <Button className="btn-sm" onClick={() => editar(usuario)}>
                      Editar
                    </Button>
                    {usuario.id !== idActual && (
                      <Button
                        className="btn-sm"
                        onClick={() => cambiarEstado(usuario)}
                      >
                        {usuario.activo ? "Desactivar" : "Activar"}
                      </Button>
                    )}
                    {usuario.id !== idActual && (
                      <Button
                        className="btn-sm"
                        onClick={() => eliminar(usuario.id)}
                      >
                        Eliminar
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default AdminUsuarios;
