const BASE_URL = 'http://localhost:3001/api/equipos';

// Crear equipo (con upload de imagen)
export async function crearEquipo({ nombre, entrenador, logo, ligaId }) {
  const formData = new FormData();

  formData.append('nombre', nombre);
  formData.append('entrenador', entrenador);
  formData.append('ligaId', ligaId);

  if (logo instanceof File) {
    formData.append('logo', logo);
  }

  const res = await fetch(BASE_URL, {
    method: 'POST',
    body: formData 
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

  const equipo = await res.json();

  // agrega URL completa del logo
  return {
    ...equipo,
    logoUrl: equipo.logo ? `http://localhost:3001/uploads/${equipo.logo}` : null
  };
}


// Editar equipo (con imagen opcional)
export async function editarEquipo(id, { nombre, entrenador, ligaId, logo }) {
  const formData = new FormData();

  formData.append('nombre', nombre);
  formData.append('entrenador', entrenador);
  formData.append('ligaId', ligaId);

  // Si es File → imagen nueva
  if (logo instanceof File) {
    formData.append('logo', logo);
  }

  // Si es string → mantener imagen ya existente
  if (typeof logo === 'string') {
    formData.append('logoActual', logo);
  }

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: formData
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al editar equipo');
  }

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


// Obtener equipos por liga
export async function obtenerEquiposPorLiga(ligaId) {
  const res = await fetch(`${BASE_URL}?ligaId=${ligaId}`);

  if (!res.ok) throw new Error('Error al obtener equipos por liga');

  const data = await res.json();

  return data.map(e => ({
    ...e,
    logoUrl: e.logo ? `http://localhost:3001/uploads/${e.logo}` : null
  }));
}


// Obtener estadísticas
export async function obtenerEstadisticasPorLiga(ligaId) {
  const res = await fetch(`http://localhost:3001/api/estadisticas/equipos/${ligaId}`);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al obtener estadísticas');
  }

  return res.json();
}
