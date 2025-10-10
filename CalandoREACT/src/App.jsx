import { Routes, Route } from 'react-router-dom'

import VentanaPrincipal from './pages/VentanaPrincipal'
import DetalleEquipo from './pages/DetalleEquipo'
import AltaEquipos from './pages/AltaEquipos'
import EditarEquipo from './pages/EditarEquipo'
import  AltaLigas  from './pages/AltaLigas'
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
      <Route path='/equipos/nuevo' element={<AltaEquipos/>}/>
      <Route path="/equipos/editar/:id" element={<EditarEquipo />}/>
    </Routes>
    </>

  )
}

export default App