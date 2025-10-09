import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { obtenerEquipoPorId } from '../../services/equipoService'
import placeholderfoto from '../assets/placeholderfoto.jpg'
import AltaJugador from './AltaJugador'

export default function DetalleEquipo() {
  const { id } = useParams()
  const [equipo, setEquipo] = useState(null)
  const [jugadores, setJugadores] = useState([])
  const [mostrarModal, setMostrarModal] = useState(false)

  useEffect(() => {
    // Carga datos del equipo
    obtenerEquipoPorId(id)
      .then(data => setEquipo(data))
      .catch(error => console.error(error))

    // 🔸 Aquí por ahora usamos datos simulados (luego conectaremos a la API)
    const jugadoresSimulados = [
      { id: 1, nombre: 'Juan Pérez', posicion: 'Pitcher', numero: 9, fechaNacimiento: '2010-05-12' },
      { id: 2, nombre: 'Luis Gómez', posicion: 'Catcher', numero: 15, fechaNacimiento: '2009-11-23' },
      { id: 3, nombre: 'Carlos Ruiz', posicion: 'Shortstop', numero: 3, fechaNacimiento: '2011-02-17' }
    ]
    setJugadores(jugadoresSimulados)
  }, [id])

  if (!equipo) return <p className="text-center mt-8">Cargando equipo...</p>

  const logo = equipo.logo ? `/uploads/${equipo.logo}` : placeholderfoto

  return (
    <div className="p-6 bg-white rounded-xl shadow-xl mt-6 max-w-5xl mx-auto">
      {/* Datos del equipo */}
      <div className="text-center">
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

      {/* Botones */}
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
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Regresar
        </button>
      </div>

      {/* Tabla de jugadores */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">Jugadores del Equipo</h2>

        <table className="min-w-full bg-gray-100 border rounded-lg overflow-hidden shadow">
          <thead className="bg-gray-800 text-white">
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
      className="border-b hover:bg-green-100 transition cursor-pointer"
      onClick={() => window.location.href = `/jugador/${jugador.id}`}
    >
      <td className="py-2 px-4">{index + 1}</td>
      <td className="py-2 px-4">{jugador.nombre}</td>
      <td className="py-2 px-4">{jugador.posicion}</td>
      <td className="py-2 px-4">{jugador.numero}</td>
      <td className="py-2 px-4">{jugador.fechaNacimiento}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>

      {/* Modal de alta de jugador */}
      {mostrarModal && (
        <AltaJugador
          equipoId={equipo.id}
          onClose={() => setMostrarModal(false)}
        />
      )}
    </div>
  )
}