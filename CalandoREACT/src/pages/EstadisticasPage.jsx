import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { obtenerEstadisticasPorLiga, obtenerEquiposPorLiga } from '../../services/equipoService'
import { obtenerLigaPorId } from '../../services/ligaService'
import BannerLiga from '../components/UI/BannerLiga'

export default function EstadisticasPage() {
  const { id } = useParams()
  const [liga, setLiga] = useState(null)
  const [equipos, setEquipos] = useState([])
  const [estadisticas, setEstadisticas] = useState([])

  useEffect(() => {
    obtenerLigaPorId(id).then(setLiga).catch(console.error)
    obtenerEquiposPorLiga(id).then(setEquipos).catch(console.error)
    obtenerEstadisticasPorLiga(id).then(setEstadisticas).catch(console.error)
  }, [id])

  return (
    <div className="">
      {/* Banner al inicio */}
      <BannerLiga liga={liga} equipos={equipos} />

      <h1 className="text-3xl font-bold text-center mb-6">Estadísticas de la liga</h1>
      <div className="overflow-x-auto">
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
    </div>
  )
}
