export async function registrarEstadisticas(datos) {
  const res = await fetch('http://localhost:3001/api/estadisticas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  })
  if (!res.ok) throw new Error('Error al registrar estadísticas')
  return res.json()
}

export async function obtenerEstadisticasTotales(jugadorId, equipoId = null) {
  let url = `http://localhost:3001/api/estadisticas/jugador?jugadorId=${jugadorId}`
  if (equipoId) {
    url += `&equipoId=${equipoId}`
  }

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Error al obtener las estadísticas totales')
  }

  const data = await res.json()
  return data
}
