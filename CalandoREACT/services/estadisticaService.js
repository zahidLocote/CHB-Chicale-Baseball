export async function registrarEstadisticas(datos) {
  const res = await fetch('http://localhost:3001/api/estadisticas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  })
  if (!res.ok) throw new Error('Error al registrar estadísticas')
  return res.json()
}
