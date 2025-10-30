import React, { useState, useEffect } from 'react'
import { obtenerJugadoresPorEquipo } from '../../../services/jugadorService'
import { registrarEstadisticas } from '../../../services/estadisticaService'


export default function ModalResultados({ show, onClose, equipoId, partidoId, equipoNombre }) {
  const [carreras, setCarreras] = useState(0)
  const [jugadoresDisponibles, setJugadoresDisponibles] = useState([])
  const [estadisticas, setEstadisticas] = useState([])

  useEffect(() => {
    if (equipoId && show) {
      obtenerJugadoresPorEquipo(equipoId)
        .then(setJugadoresDisponibles)
        .catch(err => console.error('Error al obtener jugadores:', err))
    }
  }, [equipoId, show])

  if (!show) return null

  const agregarJugador = () => {
    setEstadisticas([
      ...estadisticas,
      {
        id: Date.now(),
        jugadorId: '',
        H: 0,
        HR: 0,
        H2: 0,
        H3: 0,
        BB: 0,
        BG: 0,
        TL: 0,
        S: 0
      }
    ])
  }

  const actualizarCampo = (id, campo, valor) => {
    setEstadisticas(estadisticas.map(j =>
      j.id === id ? { ...j, [campo]: valor } : j
    ))
  }

  const handleGuardar = async () => {
    try {
      const payload = {
        equipoId,
        partidoId,
        carrerasTotales: carreras,
        estadisticas: estadisticas.map(({ jugadorId, ...stats }) => ({
          jugadorId: Number(jugadorId),
          ...stats
        }))
      }

      console.log('📤 Enviando al backend:', payload)
      await registrarEstadisticas(payload)
      alert('✅ Estadísticas guardadas correctamente')
      onClose()
    } catch (error) {
      console.error('❌ Error al guardar estadísticas:', error)
      alert('Error al guardar estadísticas')
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-[750px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Registrar resultados de {equipoNombre}</h2>

        <div className="mb-6 flex items-center justify-center gap-3">
          <label className="font-semibold text-lg">Carreras totales:</label>
          <input
            type="number"
            min="0"
            value={carreras}
            onChange={(e) => setCarreras(Number(e.target.value))}
            className="w-24 text-center border rounded-md py-1"
          />
        </div>

        <h3 className="text-xl font-bold mb-3 text-center">Estadísticas de Jugadores</h3>

        {estadisticas.map((j, index) => (
          <div key={j.id} className="border rounded-xl p-4 mb-4 bg-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-gray-300 px-2 py-1 rounded-md text-sm font-semibold">
                #{index + 1}
              </span>
              <select
                value={j.jugadorId}
                onChange={(e) => actualizarCampo(j.id, 'jugadorId', e.target.value)}
                className="flex-1 border rounded-md px-2 py-1"
              >
                <option value="">Seleccionar jugador</option>
                {jugadoresDisponibles.map(jg => (
                  <option key={jg.id} value={jg.id}>
                    {jg.nombre} {jg.apellidoPaterno}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              {['H', 'HR', 'BG', 'H2', 'BB', 'TL', 'H3', 'S'].map(stat => (
                <div key={stat} className="flex flex-col items-center">
                  <input
                    type="number"
                    min="0"
                    value={j[stat]}
                    onChange={(e) => actualizarCampo(j.id, stat, Number(e.target.value))}
                    className="w-12 text-center border rounded-md"
                  />
                  <label className="text-sm font-semibold mt-1">{stat}</label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <button
            onClick={agregarJugador}
            className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-400"
          >
            + Agregar jugador
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="bg-gray-400 text-white font-bold px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={handleGuardar}
              className="bg-green-500 text-white font-bold px-4 py-2 rounded hover:bg-green-400"
            >
              Guardar resultados
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
