import { Routes, Route } from 'react-router-dom'

import VentanaPrincipal from './pages/VentanaPrincipal'
import DetalleEquipo from './pages/DetalleEquipo'
import AltaEquipos from './pages/AltaEquipos'
import EditarEquipo from './pages/EditarEquipo'
import  AltaLigas  from './pages/AltaLigas'
import DetalleJugador from './pages/DetalleJugador'
import EditarJugador from './pages/EditarJugador';

function App() {
  return (
    <Routes>
      <Route path="/" element={<VentanaPrincipal />} />
      <Route path="/equipos/:id" element={<DetalleEquipo />} />
      <Route path='/equipos/nuevo' element={<AltaEquipos/>}/>
      <Route path="/equipos/editar/:id" element={<EditarEquipo />}/>
      <Route path="/jugador/:id" element={<DetalleJugador />} /> 
      <Route path="/jugador/editar/:id" element={<EditarJugador />} />
    </Routes>

  )
}

export default App