export async function registrarLiga(data) {
  try {
    const response = await fetch('api/liga', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en registrarLiga:', error);
    throw error;
  }
}

export async function obtenerLigas() {
  const res = await fetch('api/liga')

  if (!res.ok) {
    throw new Error('Error al obtener ligas')
  }

  return await res.json()
}

export async function editarLigas(id, datosActualizados) {
  const res = await fetch(`http://localhost:3001/liga/${id}`, {
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

export async function obtenerLigaPorId(id) {
  const res = await fetch(`http://localhost:3001/liga/${id}`); // ← corregido

  if (!res.ok) {
    throw new Error('Error al obtener liga');
  }

  return await res.json();
}


