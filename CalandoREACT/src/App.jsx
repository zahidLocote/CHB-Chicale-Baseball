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
import AltaPartido from './pages/AltaPartido'
import EditarPartido from './pages/EditarPartido'; // o './components/UI/EditarPartido'

import PartidosPage from './pages/PartidosPage'
import EstadisticasPage from './pages/EstadisticasPage'

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
        <Route path="/partidoNuevo" element={<AltaPartido/>}/>
        <Route path='*' element={<h1>ERROR</h1>}/>
        <Route path="/partido/editar/:id" element={<EditarPartido />} />
        
        <Route path="/ligas/:id/partidos" element={<PartidosPage />} />
        <Route path="/ligas/:id/estadisticas" element={<EstadisticasPage />} />

      </Routes>
    </>

  )
}

export default App