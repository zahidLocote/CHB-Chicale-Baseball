const BASE_URL = 'http://localhost:3001/api/ligas';

// Registrar liga
export async function registrarLiga(formData) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    body: formData, 
  });

  if (!res.ok) throw new Error("Error al registrar liga");
  return await res.json();
}

// Obtener listas de ligas
export async function obtenerLigas() {
  const res = await fetch(BASE_URL);

  if (!res.ok) throw new Error('Error al obtener ligas');

  return await res.json();
}
// Editar liga
export async function editarLigas(id, formData) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: formData   //NO JSON, NO headers
  });

  if (!res.ok) throw new Error("Error al editar liga");
  return await res.json();
}
// Obtener liga por ID
export async function obtenerLigaPorId(id) {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) throw new Error('Error al obtener liga');

  return await res.json();
}
// Eliminar liga
export async function eliminarLiga(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al eliminar liga');
  }

  return await res.json();
}