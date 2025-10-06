import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import InfoCard from '../components/UI/InfoCard'
import { obtenerEquipos, eliminarEquipo } from '../../services/equipoService'

export default function TablaEquipos() {
  const [equipos, setEquipos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    obtenerEquipos().then(setEquipos).catch(console.error)
  }, [])

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {equipos.map((equipo) => (
          <div key={equipo.id} onClick={() => navigate(`/equipos/${equipo.id}`)} className="cursor-pointer">
            <InfoCard
              data={equipo}
              tipo="equipo"
              onVer={() => navigate(`/equipos/${equipo.id}`)}
              onEliminar={() => handleEliminar(equipo.id)}
            />

          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button onClick={() => navigate('equipos/nuevo')} className="bg-green-200 text-green-800 font-semibold px-4 py-2 rounded hover:bg-green-300 cursor-pointer">
          Agregar Equipo
        </button>
      </div>
    </>
  )
}