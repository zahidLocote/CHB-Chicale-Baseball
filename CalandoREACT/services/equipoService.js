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

export async function obtenerEquipos() {
  const res = await fetch('http://localhost:3001/equipos')

  if (!res.ok) {
    throw new Error('Error al obtener equipos')
  }

  return await res.json()
}

