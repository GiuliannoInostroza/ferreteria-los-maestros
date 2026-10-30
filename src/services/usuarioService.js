const API_URL = `${import.meta.env.VITE_API_URL}/usuarios`;

async function procesarRespuesta(response) {
	if (!response.ok) {
		throw new Error(`La API respondió ${response.status}`);
	}
	return response.status === 204 ? null : response.json();
}

export async function listarUsuarios() {
	const response = await fetch(API_URL);
	return procesarRespuesta(response);
}

export async function buscarUsuario(id) {
	return procesarRespuesta(await fetch(`${API_URL}/${id}`));
}

export async function crearUsuario(datos) {
	return procesarRespuesta(await fetch(API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(datos),
	}));
}

export async function actualizarUsuario(id, datos) {
	return procesarRespuesta(await fetch(`${API_URL}/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(datos),
	}));
}

export async function eliminarUsuario(id) {
	return procesarRespuesta(await fetch(`${API_URL}/${id}`, { method: "DELETE" }));
}