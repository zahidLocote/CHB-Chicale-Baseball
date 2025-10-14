import { Routes, Route } from 'react-router-dom'

import VentanaPrincipal from './pages/VentanaPrincipal'
import DetalleEquipo from './pages/DetalleEquipo'
import AltaEquipos from './pages/AltaEquipos'
import EditarEquipo from './pages/EditarEquipo'
import AltaLigas from './pages/AltaLigas'
import DetalleJugador from './pages/DetalleJugador'
import EditarJugador from './pages/EditarJugador';
import EditarLiga from './pages/EditarLiga'
import TablaEquipos from './pages/TablaEquipos'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<VentanaPrincipal />} />
        <Route path="/ligas/nuevo" element={<AltaLigas />} />
        <Route path="/editar-liga/:id" element={<EditarLiga />} />
        <Route path="/ligas/:id/equipos" element={<TablaEquipos />} />
        <Route path="/equipos/:id" element={<DetalleEquipo />} />
        <Route path="/nuevo" element={<AltaEquipos />} />
        <Route path="/equipos/editar/:id" element={<EditarEquipo />} />
        <Route path="/jugador/:id" element={<DetalleJugador />} />
        <Route path="/jugador/editar/:id" element={<EditarJugador />} />
        <Route path='*' element={<h1>ERROR</h1>}/>
      </Routes>
    </>

  )
}

export default App