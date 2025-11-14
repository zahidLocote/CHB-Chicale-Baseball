const BASE_URL = "http://localhost:3001/api/estadisticas";

// Registrar estadísticas por partido
export async function registrarEstadisticas(datos) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Error al registrar estadísticas");
  }

  return res.json();
}
// Obtener estadísticas globales del jugador
export async function obtenerEstadisticasTotales(jugadorId, equipoId = null) {
  let url = `${BASE_URL}/jugador?jugadorId=${jugadorId}`;
  if (equipoId) url += `&equipoId=${equipoId}`;

  const res = await fetch(url);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Error al obtener estadísticas totales del jugador");
  }

  return res.json();
}
// Obtener tabla de posiciones por liga
export async function obtenerTablaPorLiga(ligaId) {
  const res = await fetch(`${BASE_URL}/equipos/${ligaId}`);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Error al obtener tabla de posiciones");
  }

  return res.json();
}