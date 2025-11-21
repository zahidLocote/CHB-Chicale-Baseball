import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { obtenerPartidosPorLiga } from '../../services/partidoService'
import { obtenerLigaPorId } from '../../services/ligaService'
import { obtenerEquiposPorLiga } from '../../services/equipoService'
import BannerLiga from '../components/UI/BannerLiga'
import InfoPartidos from '../components/UI/InfoPartidos'

export default function PartidosPage() {
  const { id } = useParams()
  const [liga, setLiga] = useState(null)
  const [equipos, setEquipos] = useState([])
  const [partidos, setPartidos] = useState([])

  useEffect(() => {
    obtenerLigaPorId(id).then(setLiga).catch(console.error)
    obtenerEquiposPorLiga(id).then(setEquipos).catch(console.error)
    obtenerPartidosPorLiga(id).then(setPartidos).catch(console.error)
  }, [id])

  return (
    <div className="">
      {/* Banner al inicio */}
      <BannerLiga liga={liga} equipos={equipos} />

      <h1 className="text-3xl font-bold text-center mb-6 font-race">Partidos de la liga</h1>
      {partidos.length === 0 ? (
        <div className="mt-5 w-full border border-gray-400 rounded-4xl p-7 bg-white shadow-xl">
          <p className="text-center text-gray-500">No hay partidos registrados aún.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {partidos.map(p => (
            <InfoPartidos key={p.id} partido={p} />
          ))}
        </div>
      )}
    </div>
  )
}
