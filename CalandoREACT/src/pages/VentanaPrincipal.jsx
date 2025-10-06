
import { useEffect, useState } from 'react'
import { Header } from "../components/UI/Header"
import { obtenerEquipos } from '../../services/equipoService'
import TablaEquipos from './TablaEquipos'

function VentanaPrincipal() {
  const [equipos, setEquipos] = useState([])

  useEffect(() => {
    obtenerEquipos()
      .then(data => setEquipos(data))
      .catch(error => console.error(error))
  }, [])

  return (
    <>
      <Header />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Equipos registrados</h1>
        <TablaEquipos/>
      </div>
    </>
  )
}

export default VentanaPrincipal
