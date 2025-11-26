import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SlideshowLiga({ liga, equipos }) {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

  const slides = [
    { type: 'liga', logo: liga?.logo ? `http://localhost:3001/uploads/${liga.logo}` : null, nombre: liga?.nombreLiga },
    ...equipos.map(e => ({ type: 'equipo', logo: e.logo ? `http://localhost:3001/uploads/${e.logo}` : null, nombre: e.nombreEquipo, id: e.id }))
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [slides.length])

  if (slides.length === 0) return null
  const slide = slides[current]

  const prevSlide = () => setCurrent(prev => (prev - 1 + slides.length) % slides.length)
  const nextSlide = () => setCurrent(prev => (prev + 1) % slides.length)

  return (
    <div
      className="relative w-full h-[300px] flex items-center justify-center overflow-hidden shadow-lg"
      style={{ background: 'linear-gradient(to right, #002878, #0031AD)' }}
    >
      {slide.type === 'liga' ? (
        <img src={slide.logo} alt={`Logo ${slide.nombre}`} className="h-40 w-auto" />
      ) : (
        <img
          src={slide.logo}
          alt={`Logo ${slide.nombre}`}
          className="h-40 w-auto cursor-pointer"
          onClick={() => navigate(`/equipos/${slide.id}`)}
        />
      )}

      {/* Flechas de desplazamiento */}
      <button
        onClick={prevSlide}
        className="absolute left-4 text-white text-5xl bg-black/30  px-2 py-20 hover:bg-black/50"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 text-white text-5xl bg-black/30  px-2 py-20 hover:bg-black/50"
      >
        ›
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${i === current ? 'bg-white' : 'bg-black/30'}`}
          ></span>
        ))}
      </div>
    </div>
  )
}
