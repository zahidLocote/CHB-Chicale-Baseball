const BASE_URL = 'http://localhost:3001/api/equipos';

// Crear equipo
export async function crearEquipo({ nombre, entrenador, logo, ligaId }) {
  const equipo = {
    nombre,
    entrenador,
    logo: logo ? logo.name : null,
    ligaId: Number(ligaId)
  };

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(equipo)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al crear equipo');
  }

  return res.json();
}
// Obtener equipo por ID
export async function obtenerEquipoPorId(id) {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) throw new Error('Error al obtener equipo');

  return res.json();
}
// Eliminar equipo
export async function eliminarEquipo(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al eliminar equipo');
  }

  return res.json();
}
// Editar equipo
export async function editarEquipo(id, datosActualizados) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosActualizados)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al editar equipo');
  }

  return res.json();
}
// Obtener equipos por liga
export async function obtenerEquiposPorLiga(ligaId) {
  const res = await fetch(`${BASE_URL}?ligaId=${ligaId}`);

  if (!res.ok) {
    throw new Error('Error al obtener equipos por liga');
  }

  return res.json();
}
// Obtener estadísticas por liga (tabla de posiciones)
export async function obtenerEstadisticasPorLiga(ligaId) {
  const res = await fetch(`http://localhost:3001/api/estadisticas/equipos/${ligaId}`);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al obtener estadísticas');
  }

  return res.json();
}