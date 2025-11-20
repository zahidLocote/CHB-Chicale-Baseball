import React, { useState, useEffect } from 'react'
import chicalisLogo from '../../assets/chicalis.png'   // logo
import cityImage from '../../assets/city.png'         // imagen city
import { obtenerLigas } from '../../../services/ligaService' // servicio en raíz
import { useNavigate } from 'react-router-dom'

export default function Banner() {
  const [ligas, setLigas] = useState([])
  const [mostrarLigas, setMostrarLigas] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerLigas()
        setLigas(data)
      } catch (error) {
        console.error('Error al cargar ligas:', error)
      }
    }
    cargar()
  }, [])

  return (
    <div
      className="w-full text-white py-3 px-6 mb-6 shadow-md flex items-center"
      style={{ background: 'linear-gradient(to right, #002878, #0031AD)' }}
    >
      {/* Logo a la izquierda */}
      <img
        src={chicalisLogo}
        alt="Logo Chicalis"
        className="h-35 w-30 rounded-full"
      />

      {/* Botón desplegable de ligas */}
      <div className="relative flex justify-start ml-60 h-[140px]">
        <button
          onClick={() => setMostrarLigas(!mostrarLigas)}
          className="text-white text-4xl px-2 py-4 hover:bg-black/20 bg-transparent transition-opacity btn-race text-center border-l-2 border-r-2 border-black/20"
        >
          Ligas <span className="text-2xl">▼</span>
        </button>

        {mostrarLigas && (
          <div
            className="absolute top-full mt-2 w-47 bg-white text-[#0031AD] shadow-lg z-50 font-race text-center"
            style={{ left: '50%', transform: 'translateX(-50%)' }}
          >
            {ligas.length === 0 ? (
              <div className="px-4 py-2 text-sm opacity-80">
                No hay ligas registradas
              </div>
            ) : (
              ligas.map(liga => (
                <div
                  key={liga.id}
                  onClick={() => {
                    setMostrarLigas(false)
                    navigate(`/ligas/${liga.id}/equipos`, { state: { liga } })
                  }}
                  className="px-4 py-2 hover:bg-black/10 cursor-pointer text-xl font-race"
                >
                  {liga.nombreLiga}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Imagen city a la derecha */}
      <div className="flex-shrink-0">
        <img
          src={cityImage}
          alt="City"
          className="h-24 w-auto absolute"
          style={{
            top: '68px',   // mueve verticalmente (Y)
            right: '30px', // mueve horizontalmente desde el borde derecho (X)
          }}
        />
      </div>
    </div>
  )
}
