const BASE_URL = 'http://localhost:3001/api/jugadores';

// Crear jugador
export async function crearJugador(data) {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    body: data
  });
  return res.json();
}

export async function editarJugador(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: data
  });
  return res.json();
}

// Obtener jugadores de un equipo
export async function obtenerJugadoresPorEquipo(equipoId) {
  const res = await fetch(`${BASE_URL}/equipo/${equipoId}`);

  if (!res.ok) {
    throw new Error('Error al obtener jugadores del equipo');
  }

  return await res.json();
}
// Eliminar jugador
export async function eliminarJugador(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al eliminar jugador');
  }

  return await res.json();
}
// Obtener jugador por ID
export async function obtenerJugadorPorId(id) {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al obtener jugador');
  }

  return await res.json();
}