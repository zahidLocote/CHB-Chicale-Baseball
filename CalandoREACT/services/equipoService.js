export async function crearEquipo({ nombre, entrenador, logo, ligaId }) {
  const equipo = {
    nombre,
    entrenador,
    logo: logo ? logo.name : null,
    ligaId: Number(ligaId)
  }

  const res = await fetch('/api/equipos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(equipo)
  })

  if (!res.ok) throw new Error('Error al crear equipo')
  return await res.json()
}

export async function obtenerEquipoPorId(id) {
  const res = await fetch(`/api/equipos/${id}`)
  if (!res.ok) throw new Error('Error al obtener equipo')
  return await res.json()
}

export async function eliminarEquipo(id) {
  const res = await fetch(`http://localhost:3001/equipos/${id}`, {
    method: 'DELETE'
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.error || 'Error al eliminar equipo')
  }

  return await res.json()
}

export async function editarEquipo(id, datosActualizados) {
  const res = await fetch(`http://localhost:3001/equipos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosActualizados)
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.error || 'Error al editar equipo')
  }

  return await res.json()
}

export async function obtenerEquiposPorLiga(ligaId) {
  const res = await fetch(`http://localhost:3001/equipos?ligaId=${ligaId}`);

  if (!res.ok) {
    throw new Error('Error al obtener equipos por liga');
  }
  
  return await res.json();
}

export async function obtenerEstadisticasPorLiga(ligaId) {
  const response = await fetch(`/api/estadisticas/equipos/${ligaId}`)
  if (!response.ok) throw new Error("Error al obtener estadísticas")
  return response.json()
}


