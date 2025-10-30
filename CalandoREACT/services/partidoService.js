// src/services/partidoService.js

const BASE_URL = 'http://localhost:3001'; 

// Registrar un nuevo partido
export async function registrarPartido(data) {
  try {
    const response = await fetch(`${BASE_URL}/partido`, {
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
    console.error('Error en registrarPartido:', error);
    throw error;
  }
}

// Obtener partidos por liga
export async function obtenerPartidosPorLiga(ligaId) {
  try {
    const res = await fetch(`${BASE_URL}/partido?ligaId=${ligaId}`);

    if (!res.ok) {
      throw new Error('Error al obtener partidos');
    }

    return await res.json();
  } catch (error) {
    console.error('Error en obtenerPartidosPorLiga:', error);
    throw error;
  }
}

// Eliminar partido por ID
export async function eliminarPartido(id) {
  try {
    const res = await fetch(`${BASE_URL}/partido/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error al eliminar partido: ${errorText}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error en eliminarPartido:', error);
    throw error;
  }
}


