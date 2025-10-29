import { useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react'
import InfoCard from '../components/UI/InfoCard'
import { eliminarEquipo, obtenerEquiposPorLiga } from '../../services/equipoService'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { obtenerLigaPorId } from '../../services/ligaService' // Importa esta función


export default function TablaEquipos() {
  const [equipos, setEquipos] = useState([])
  const [liga, setLiga] = useState(null) // Cambia esto a 
  const navigate = useNavigate()
  const { id } = useParams() // Obtiene el ID de la liga desde la URL
  const { state } = useLocation() // Obtiene datos adicionales pasados desde VentanaPrincipal

  useEffect(() => {
    if (state?.liga) {
      setLiga(state.liga)
    } else {
      // Si no, obténla desde el servicio
      obtenerLigaPorId(id)
        .then(setLiga)
        .catch(console.error)
    }

    // Obtiene los equipos
    obtenerEquiposPorLiga(id)
      .then(setEquipos)
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
      </div>
    </>
  )
}