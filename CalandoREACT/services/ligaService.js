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

export async function obtenerLigaPorId(id) {
  const res = await fetch(`api/liga/${id}`)

  if (!res.ok) {
    throw new Error('Error al obtener liga')
  }

  return await res.json()
}

