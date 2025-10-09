import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { obtenerEquipoPorId } from '../../services/equipoService'
import placeholderfoto from '../assets/placeholderfoto.jpg'
import AltaJugador from './AltaJugador'

export default function DetalleEquipo() {
  const { id } = useParams()
  const [equipo, setEquipo] = useState(null)
  const [mostrarModal, setMostrarModal] = useState(false)

  useEffect(() => {
    obtenerEquipoPorId(id)
      .then(data => setEquipo(data))
      .catch(error => console.error(error))
  }, [id])

  if (!equipo) return <p>Cargando equipo...</p>

  const logo = equipo.logo ? `/uploads/${equipo.logo}` : placeholderfoto

  return (
    <div className="p-6 bg-white rounded-xl shadow-xl mt-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{equipo.nombre}</h1>
      <img src={logo} alt={equipo.nombre} className="w-40 h-40 object-cover rounded-full mx-auto mb-4" />
      <p><strong>ID:</strong> 000{equipo.id}</p>
      <p><strong>Entrenador:</strong> {equipo.entrenador}</p>
      <p><strong>Liga:</strong> {equipo.ligaId}</p>

      <div className="flex justify-center gap-4 mt-6">
        <button className="bg-blue-300 text-blue-700 font-bold px-4 py-2 rounded-xl hover:bg-blue-200">
          Editar
        </button>
        <button className="bg-red-300 text-red-700 font-bold px-4 py-2 rounded-xl hover:bg-red-200">
          Eliminar
        </button>
        <button
          className="bg-green-300 text-green-700 font-bold px-4 py-2 rounded-xl hover:bg-green-200"
          onClick={() => setMostrarModal(true)}
        >
          Agregar Jugador
        </button>
      </div>

      {mostrarModal && (
        <AltaJugador
          equipoId={equipo.id}
          onClose={() => setMostrarModal(false)}
        />
      )}
    </div>
  )
}
