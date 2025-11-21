import React, { useState } from 'react'
import chicalisLogo from '../../assets/chicalis.png'
import cityImage from '../../assets/city.png'
import { useNavigate } from 'react-router-dom'

export default function BannerLiga({ liga, equipos }) {
  const [mostrarEquipos, setMostrarEquipos] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      className="w-full text-white h-[100px] px-6 mb-6 shadow-md flex items-center"
      style={{ background: 'linear-gradient(to right, #002878, #0031AD)' }}
    >
      {/* Logo a la izquierda */}
      <img
        src={chicalisLogo}
        alt="Logo Chicalis"
        className="h-20 w-[72px] rounded-full"
      />

      {/* Botones centrales */}
      <div className="flex ml-40 gap-x-10 text-2xl font-race">
        {/* Home */}
        <button
          onClick={() => navigate('/')}
          className="hover:bg-black/20 px-4 py-2 rounded border-l-2 border-r-2 border-black/20"
        >
          Home
        </button>

        {/* Equipos con desplegable */}
        <div className="relative">
          <button
            onClick={() => setMostrarEquipos(!mostrarEquipos)}
            className="hover:bg-black/20 px-4 py-2 rounded border-l-2 border-r-2 border-black/20"
          >
            Equipos <span className="text-lg">▼</span>
          </button>
          {mostrarEquipos && (
            <div
              className="absolute top-full mt-2 w-48 bg-white text-[#0031AD] shadow-lg z-50 text-center font-race"
              style={{ left: '50%', transform: 'translateX(-50%)' }}
            >
              {equipos.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No hay equipos
                </div>
              ) : (
                equipos.map(equipo => (
                  <div
                    key={equipo.id}
                    onClick={() => navigate(`/equipos/${equipo.id}`)}
                    className="px-4 py-2 hover:bg-black/10 cursor-pointer text-lg"
                  >
                    {equipo.nombre}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Partidos */}
        <button
          onClick={() =>
            navigate(`/ligas/${liga?.id}/partidos`, { state: { liga } })
          }
          className="hover:bg-black/20 px-4 py-2 rounded border-l-2 border-r-2 border-black/20"
        >
          Partidos
        </button>

        {/* Estadísticas */}
        <button
          onClick={() =>
            navigate(`/ligas/${liga?.id}/estadisticas`, { state: { liga } })
          }
          className="hover:bg-black/20 px-4 py-2 rounded border-l-2 border-r-2 border-black/20"
        >
          Estadísticas
        </button>
      </div>

      {/* Imagen city a la derecha */}
      <div className="flex-shrink-0">
        <img
          src={cityImage}
          alt="City"
          className="h-24 w-auto absolute"
          style={{ top: '15px', right: '30px' }}
        />
      </div>
    </div>
  )
}
