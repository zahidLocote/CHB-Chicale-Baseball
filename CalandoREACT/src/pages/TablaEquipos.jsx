import { useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react'
import InfoCard from '../components/UI/InfoCard'
import { eliminarEquipo, obtenerEquiposPorLiga } from '../../services/equipoService'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { obtenerLigaPorId } from '../../services/ligaService' 
import InfoPartidos from '../components/UI/InfoPartidos'
import { obtenerPartidosPorLiga } from '../../services/partidoService'

export default function TablaEquipos() {
  const [equipos, setEquipos] = useState([])
  const [partidos, setPartidos] = useState([])
  const [liga, setLiga] = useState(null) 
  const navigate = useNavigate()
  const { id } = useParams() // Obtiene el ID de la liga desde la URL
  const { state } = useLocation() // Obtiene datos adicionales pasados desde VentanaPrincipal

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
      <button onClick={() => navigate(-1)} className="text-xl text-blue-500 underline hover:text-blue-800  ml-50">
        ← Volver
      </button>
      <h1 className='text-center text-3xl font-bold '>Equipos en la liga {liga?.nombreLiga}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {equipos.map((equipo) => (
          <div key={equipo.id} onClick={() => navigate(`/equipos/${equipo.id}`)} className="cursor-pointer">
            <InfoCard
              data={equipo}
              tipo="equipo"
              onVer={() => navigate(`/equipos/editar/${equipo.id}`)}
              onEliminar={() => handleEliminar(equipo.id)}
            />

          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">

      <div className="flex justify-center mt-6 gap-x-5 ">
        <button onClick={() => navigate('equipos/nuevo')} className="bg-green-200 text-green-800 font-bold px-4 py-2 rounded hover:bg-green-300 cursor-pointer">
          Agregar Equipo
        </button>
        <button onClick={() => navigate('/partidoNuevo', { state: { liga } })} className="bg-gray-300 text-gray-600 font-bold px-4 py-2 rounded hover:bg-gray-200 cursor-pointer">
          Registrar partido
        </button>
      </div>

      <h1 className='text-center text-3xl font-bold mt-10 mb-10 '>- Partidos -</h1>
      <div>
        {partidos.length === 0 ? (
        <div className="mt-5 w-full border border-gray-400 rounded-4xl p-7 bg-white shadow-xl">
          <p className="text-center text-gray-500">No hay partidos registrados aún.</p>
        </div>
      ) : (
        
        <div className="w-300 mx-auto mb-10 space-y-10">
          {partidos.map((partido) => (
          <InfoPartidos key={partido.id} partido={partido} />
          ))}
        </div>
      
        )}
      </div>
      </div>
    </>
  )
}