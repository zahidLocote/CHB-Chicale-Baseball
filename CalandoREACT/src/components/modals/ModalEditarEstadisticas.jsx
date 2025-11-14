import React from "react";

export default function ModalEditarEstadisticas({
  abierta,
  cerrar,
  stat,
  jugadorId,
  editarEstadisticaPartido,
  obtenerHistorialJugador,
  obtenerEstadisticasTotales,
  setHistorial,
  setEstadisticas
}) {
  if (!abierta || !stat) return null;

  // Generar título dinámico del partido
  const tituloPartido = stat.partido
    ? `${stat.partido.equipoNombre1} vs ${stat.partido.equipoNombre2} (${new Date(
      stat.partido.fecha
    ).toLocaleDateString("es-MX")})`
    : "Partido";

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const datosActualizados = {
      H: Number(formData.get("H")),
      HR: Number(formData.get("HR")),
      H2: Number(formData.get("H2")),
      H3: Number(formData.get("H3")),
      BB: Number(formData.get("BB")),
      BG: Number(formData.get("BG")),
      turnosLegales: Number(formData.get("TL")),
      S: Number(formData.get("S")),
    };

    await editarEstadisticaPartido(stat.id, datosActualizados);

    // Recargar historial
    const dataHistorial = await obtenerHistorialJugador(jugadorId);
    setHistorial(dataHistorial);

    // Recargar totales
    const dataTotales = await obtenerEstadisticasTotales(jugadorId);
    setEstadisticas(dataTotales);

    cerrar();
  }

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-xl shadow-xl w-[360px] max-h-[85vh] overflow-y-auto">

        <h2 className="text-xl font-bold text-center mb-2">Editar Estadísticas</h2>

        <p className="text-center text-sm text-gray-600 mb-4 font-semibold">
          {tituloPartido}
        </p>

        <form onSubmit={handleSubmit}>

          {["H", "HR", "H2", "H3", "BB", "BG", "TL", "S"].map((campo) => (
            <div className="mb-3" key={campo}>
              <label className="font-semibold">{campo}:</label>
              <input
                name={campo}
                defaultValue={stat[campo] || 0}
                type="number"
                min="0"
                className="border p-2 rounded w-full focus:outline-blue-500"
              />
            </div>
          ))}

          <div className="flex justify-between mt-5">
            <button
              type="button"
              onClick={cerrar}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
