import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import InfoCard from '../components/UI/InfoCard'
import InfoPartidos from '../components/UI/InfoPartidos'
import { eliminarEquipo, obtenerEquiposPorLiga, obtenerEstadisticasPorLiga } from '../../services/equipoService'
import { obtenerLigaPorId } from '../../services/ligaService'
import { obtenerPartidosPorLiga } from '../../services/partidoService'
import { useParams, useLocation } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"; 


export default function TablaEquipos() {
  const [equipos, setEquipos] = useState([])
  const [partidos, setPartidos] = useState([])
  const [liga, setLiga] = useState(null)
  const [estadisticas, setEstadisticas] = useState([])
  const navigate = useNavigate()
  const { id } = useParams()
  const { state } = useLocation()
      const { esAdmin } = useAuth();


  useEffect(() => {
    if (state?.liga) {
      setLiga(state.liga)
    } else {
      obtenerLigaPorId(id)
        .then(setLiga)
        .catch(console.error)
    }

    obtenerEquiposPorLiga(id)
      .then(setEquipos)
      .catch(console.error)

    obtenerPartidosPorLiga(id)
      .then(setPartidos)
      .catch(console.error)

    obtenerEstadisticasPorLiga(id)
      .then(data => {
        console.log('📊 Estadísticas recibidas del backend:', data)
        setEstadisticas(data)
      })
      .catch(err => console.error('❌ Error al obtener estadísticas:', err))
  }, [id, state])

  const handleEliminar = async (id) => {
    const primera = window.confirm("¿Deseas eliminar este registro?")
    if (!primera) return

    const segunda = window.confirm("¿Estás seguro de que deseas eliminar el equipo?")
    if (!segunda) return

    try {
      await eliminarEquipo(id)
      alert("Equipo eliminado con éxito")
      setEquipos(prev => prev.filter(e => e.id !== id))
    } catch (error) {
      console.error("Error al eliminar equipo:", error)
      alert("Ocurrió un error al eliminar el equipo.")
    }
  }

  return (
    <>
      <button 
        onClick={() => navigate(-1)} 
        className="text-xl text-blue-500 underline hover:text-blue-800 ml-50"
      >
        ← Volver
      </button>

      <h1 className='text-center text-3xl font-bold'>
        Equipos en la liga {liga?.nombreLiga}
      </h1>

      {/* Tarjetas de equipos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {equipos.map((equipo) => (
          <div key={equipo.id} onClick={() => navigate(`/equipos/${equipo.id}`)} className="cursor-pointer">
            <InfoCard
              data={equipo}
              tipo="equipo"
              onVer={() => navigate(`/equipos/editar/${equipo.id}`)}
              onEliminar={() => handleEliminar(equipo.id)}
              mostrarBotones={esAdmin}
            />
          </div>
        ))}
      </div>

      {/* Botones superiores */}
      {esAdmin &&(
        <div className="flex justify-center mt-6 gap-x-5">
        <button
          onClick={() => navigate('/nuevo', { state: { ligaId: liga?.id } })}
          className="bg-green-200 text-green-800 font-bold px-4 py-2 rounded hover:bg-green-300 cursor-pointer"
        >
          Agregar Equipo
        </button>
        <button
          onClick={() => navigate('/partidoNuevo', { state: { liga } })}
          className="bg-gray-300 text-gray-600 font-bold px-4 py-2 rounded hover:bg-gray-200 cursor-pointer"
        >
          Registrar partido
        </button>
      </div>
      )}
      

      {/* Estadísticas */}
      <h1 className='text-center text-3xl font-bold mt-10 mb-6'>- Estadísticas por equipo -</h1>
      <div className="overflow-x-auto mb-10">
        <table className="min-w-full border border-gray-300 text-sm text-center bg-white shadow-md">
          <thead className="bg-gray-100 font-bold">
            <tr>
              <th className="px-2 py-1">Equipo</th>
              <th>G</th>
              <th>P</th>
              <th>%</th>
              <th>RS</th>
              <th>RA</th>
              <th>Diff</th>
              <th>R-AVG</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
            {estadisticas.map((e, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-2 py-1 font-semibold">{e.equipo}</td>
                <td>{e.G}</td>
                <td>{e.P}</td>
                <td>{e.Porcentaje}</td>
                <td>{e.RS}</td>
                <td>{e.RA}</td>
                <td>{e.Diff}</td>
                <td>{e.RAVG}</td>
                <td>{e.PTS}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Partidos */}
      <h1 className='text-center text-3xl font-bold mb-10'>- Partidos -</h1>
      <div>
        {partidos.length === 0 ? (
          <div className="mt-5 w-full border border-gray-400 rounded-4xl p-7 bg-white shadow-xl">
            <p className="text-center text-gray-500">No hay partidos registrados aún.</p>
          </div>
        ) : (
          <div className="w-300 mx-auto mb-10 space-y-10">
            {partidos.map((partido) => (
              <InfoPartidos key={partido.id} partido={partido} mostrarBotones={esAdmin}  />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
