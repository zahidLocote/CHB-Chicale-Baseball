import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { obtenerEquipoPorId } from '../../services/equipoService'
import { obtenerJugadoresPorEquipo } from '../../services/jugadorService'
import { obtenerLigaPorId } from '../../services/ligaService'
import { obtenerEquiposPorLiga } from '../../services/equipoService'
import placeholderfoto from '../assets/placeholderfoto.jpg'
import AltaJugador from './AltaJugador'
import BannerLiga from '../components/UI/BannerLiga'
import { useAuth } from '../context/AuthContext'

export default function DetalleEquipo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [equipo, setEquipo] = useState(null)
  const [jugadores, setJugadores] = useState([])
  const [mostrarModal, setMostrarModal] = useState(false)
  const [liga, setLiga] = useState(null)
  const [equiposLiga, setEquiposLiga] = useState([])
  const { esAdmin } = useAuth()

  useEffect(() => {
    obtenerEquipoPorId(id)
      .then(data => {
        setEquipo(data)

        if (data.ligaId) {
          obtenerLigaPorId(data.ligaId).then(setLiga).catch(console.error)
          obtenerEquiposPorLiga(data.ligaId).then(setEquiposLiga).catch(console.error)
        }
      })
      .catch(error => console.error(error))

    obtenerJugadoresPorEquipo(id)
      .then(setJugadores)
      .catch(error => console.error('Error al obtener jugadores:', error))
  }, [id])

  if (!equipo) return <p className="text-center mt-8">Cargando equipo...</p>

  // Usamos URL completa del backend
  const logo = equipo.logoUrl || placeholderfoto

  return (
    <>
      <BannerLiga liga={liga} equipos={equiposLiga} />

      <div className="text-center mt-6">
        <h1 className="text-3xl font-bold mb-4">{equipo.nombre}</h1>

        <img
          src={logo}
          alt={equipo.nombre}
          className="w-40 h-40 object-cover rounded-full mx-auto mb-4 shadow"
        />

        <p><strong>ID:</strong> 000{equipo.id}</p>
        <p><strong>Entrenador:</strong> {equipo.entrenador}</p>
        <p><strong>Liga:</strong> {equipo.ligaId || 'N/A'}</p>
      </div>

      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        {esAdmin && (
          <button
            className="bg-green-300 text-green-700 font-bold px-4 py-2 rounded-lg hover:bg-green-200 w-36 text-center"
            onClick={() => setMostrarModal(true)}
          >
            Agregar
          </button>
        )}

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-400 w-36 text-center"
        >
          Regresar
        </button>
      </div>

      <div
        className="w-full h-[80px] mb-6 shadow-md"
        style={{ background: 'linear-gradient(to right, #002878, #0031AD)' }}
      ></div>

      <div className="mt-10 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center font-race">
          Jugadores del Equipo
        </h2>

        <table className="min-w-full border overflow-hidden shadow">
          <thead
            className="text-white"
            style={{ background: 'linear-gradient(to right, #002878, #0031AD)' }}
          >
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Nombre</th>
              <th className="py-3 px-4 text-left">Posición</th>
              <th className="py-3 px-4 text-left">Número</th>
              <th className="py-3 px-4 text-left">Fecha Nacimiento</th>
            </tr>
          </thead>

          <tbody>
            {jugadores.map((jugador, index) => (
              <tr
                key={jugador.id}
                className="border-b hover:bg-blue-900/40 transition cursor-pointer"
                onClick={() => navigate(`/jugador/${jugador.id}`)}
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{jugador.nombre}</td>
                <td className="py-2 px-4">{jugador.posicion}</td>
                <td className="py-2 px-4">{jugador.numero}</td>
                <td className="py-2 px-4">
                  {new Date(jugador.fechaNacimiento).toLocaleDateString("es-MX")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarModal && (
        <AltaJugador
          equipoId={equipo.id}
          onClose={() => setMostrarModal(false)}
        />
      )}
    </>
  )
}
