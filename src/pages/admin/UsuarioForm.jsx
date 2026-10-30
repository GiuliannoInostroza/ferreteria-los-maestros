import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	buscarUsuario,
	crearUsuario,
	actualizarUsuario,
} from "../../services/usuarioService";

const vacio = { nombre: "", correo: "", rol: "Cliente", activo: true };

export default function UsuarioForm() {
	const [form, setForm] = useState(vacio);
	const [guardando, setGuardando] = useState(false);
	const [error, setError] = useState("");
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (id) buscarUsuario(id).then(setForm).catch(e => setError(e.message));
	}, [id]);

	function cambiar(e) {
		const { name, value } = e.target;
		setForm(actual => ({ ...actual, [name]: value }));
	}

	async function enviar(e) {
		e.preventDefault();
		setGuardando(true);
		setError("");
		const datos = { ...form, correo: form.correo.trim() };

		try {
			if (id) await actualizarUsuario(id, datos);
			else await crearUsuario(datos);
			navigate("/admin/usuarios");
		} catch (e) {
			setError(e.message);
		} finally {
			setGuardando(false);
		}
	}

	return (
		<form onSubmit={enviar}>
			<h1>{id ? "Editar" : "Nuevo"} usuario</h1>
			{error && <p role="alert">{error}</p>}
			<label>
				Nombre
				<input
					name="nombre"
					value={form.nombre}
					onChange={cambiar}
					required
					maxLength="100"
				/>
			</label>
			<label>
				Correo
				<input
					name="correo"
					type="email"
					value={form.correo}
					onChange={cambiar}
					required
					maxLength="120"
				/>
			</label>
			<label>
				Rol
				<select name="rol" value={form.rol} onChange={cambiar} required>
					<option>Administrador</option>
					<option>Vendedor</option>
					<option>Cliente</option>
				</select>
			</label>
			<button disabled={guardando}>
				{guardando ? "Guardando..." : "Guardar"}
			</button>
		</form>
	);
}