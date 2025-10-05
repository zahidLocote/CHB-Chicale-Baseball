import { useNavigate } from 'react-router-dom'
import InfoCard from '../components/UI/InfoCard'

export default function TablaEquipos({ equipos }) {
  const navigate = useNavigate()

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {equipos.map((equipo) => (
          <div key={equipo.id} onClick={() => navigate(`/equipos/${equipo.id}`)} className="cursor-pointer">
            <InfoCard data={equipo} tipo="equipo" />
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