import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

import { usuarios as usuariosIniciales } from "../../data/usuarios";
import FormularioUsuario from "./FormularioUsuario";

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState(() => {
    const guardados = localStorage.getItem("usuariosAdmin");
    return guardados ? JSON.parse(guardados) : usuariosIniciales;
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  useEffect(() => {
    localStorage.setItem("usuariosAdmin", JSON.stringify(usuarios));
  }, [usuarios]);

  function guardar(usuario) {
    if (usuarioEditando) {
      setUsuarios(
        usuarios.map((item) => (item.id === usuario.id ? usuario : item))
      );
    } else {
      const ultimoId = Math.max(0, ...usuarios.map((item) => item.id));
      setUsuarios([...usuarios, { ...usuario, id: ultimoId + 1 }]);
    }

    setUsuarioEditando(null);
    setMostrarFormulario(false);
  }

  function agregar() {
    setUsuarioEditando(null);
    setMostrarFormulario(true);
  }

  function editar(usuario) {
    setUsuarioEditando(usuario);
    setMostrarFormulario(true);
  }

  function cancelar() {
    setUsuarioEditando(null);
    setMostrarFormulario(false);
  }

  function cambiarEstado(id) {
    setUsuarios(
      usuarios.map((usuario) =>
        usuario.id === id
          ? { ...usuario, activo: !usuario.activo }
          : usuario
      )
    );
  }

  return (
    <Container className="py-4">
      <h1>Administración de usuarios</h1>

      {!mostrarFormulario && (
        <Button className="mb-4" onClick={agregar}>
          Agregar usuario
        </Button>
      )}

      {mostrarFormulario && (
        <FormularioUsuario
          usuarios={usuarios}
          usuario={usuarioEditando}
          onGuardar={guardar}
          onCancelar={cancelar}
        />
      )}

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.rol}</td>
                <td>{usuario.activo ? "Activo" : "Inactivo"}</td>
                <td className="d-flex gap-2">
                  <Button size="sm" onClick={() => editar(usuario)}>
                    Editar
                  </Button>
                  <Button size="sm" onClick={() => cambiarEstado(usuario.id)}>
                    {usuario.activo ? "Desactivar" : "Activar"}
                  </Button>
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
