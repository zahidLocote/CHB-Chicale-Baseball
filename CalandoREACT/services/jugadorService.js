// src/services/jugadorService.js

const BASE_URL = 'http://localhost:3001/api/jugadores';

export async function crearJugador(jugador) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jugador)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al registrar jugador');
  }

  return await res.json();
}

export async function obtenerJugadoresPorEquipo(equipoId) {
  const res = await fetch(`${BASE_URL}/equipo/${equipoId}`);

  if (!res.ok) {
    throw new Error('Error al obtener jugadores del equipo');
  }

  return await res.json();
}

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
