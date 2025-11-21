import React, { useState, useEffect } from 'react'
import chicalisLogo from '../../assets/chicalis.png'   // logo sistema
import { obtenerLigas } from '../../../services/ligaService'
import { useNavigate } from 'react-router-dom'

export default function Slideshow() {
  const [slides, setSlides] = useState([])
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const cargar = async () => {
      try {
        const ligas = await obtenerLigas()
        const sistemaSlide = { type: 'system', logo: chicalisLogo }
        const ligaSlides = ligas.map(liga => ({
          type: 'liga',
          logo: liga.logoUrl,
          nombre: liga.nombreLiga,
          id: liga.id
        }))
        setSlides([sistemaSlide, ...ligaSlides])
      } catch (error) {
        console.error('Error al cargar slideshow:', error)
      }
    }
    cargar()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [slides])

  if (slides.length === 0) return null

  const slide = slides[current]

  const prevSlide = () => {
    setCurrent(prev => (prev - 1 + slides.length) % slides.length)
  }

  const nextSlide = () => {
    setCurrent(prev => (prev + 1) % slides.length)
  }

  return (
    <div
      className="relative w-full h-[300px] flex items-center justify-center overflow-hidden shadow-lg"
      style={{ background: 'linear-gradient(to right, #002878, #0031AD)' }}
    >
      {slide.type === 'system' ? (
        <img src={slide.logo} alt="Logo sistema" className="h-50 w-auto" />
      ) : (
        <img
          src={slide.logo}
          alt={`Logo ${slide.nombre}`}
          className="h-40 w-auto cursor-pointer"
          onClick={() =>
            navigate(`/ligas/${slide.id}/equipos`, { state: { liga: slide } })
          }
        />
      )}

      {/* Flechas de desplazamiento */}
      <button
        onClick={prevSlide}
        className="absolute left-4 text-white text-xl bg-black/30  px-2 py-20 hover:bg-black/50"
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
            className={`w-3 h-3 rounded-full ${
              i === current ? 'bg-white' : 'bg-black/30'
            }`}
          ></span>
        ))}
      </div>
    </div>
  )
}
