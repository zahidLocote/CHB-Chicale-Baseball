const BASE_URL = 'http://localhost:3001/api/jugadores';

// Crear jugador (con imagen)
export async function crearJugador(jugador) {
  const formData = new FormData();

  Object.keys(jugador).forEach(key => {
    if (jugador[key] !== null) {
      formData.append(key, jugador[key]);
    }
  });

  const res = await fetch(BASE_URL, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Error al registrar jugador');
  }

  return await res.json();
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
// Editar jugador
export async function editarJugador(id, datosActualizados) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosActualizados)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al editar jugador');
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