import { Routes, Route } from 'react-router-dom'

import VentanaPrincipal from './pages/VentanaPrincipal'
import DetalleEquipo from './pages/DetalleEquipo'
import AltaEquipos from './pages/AltaEquipos'
import EditarEquipo from './pages/EditarEquipo'
import  AltaLigas  from './pages/AltaLigas'
import EditarLiga from './pages/EditarLiga'


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<VentanaPrincipal />} />
      <Route path="/editar-liga/:id" element={<EditarLiga />} />
      <Route path="/equipos/:id" element={<DetalleEquipo />} />
      <Route path='/equipos/nuevo' element={<AltaEquipos/>}/>
      <Route path="/equipos/editar/:id" element={<EditarEquipo />}/>
    </Routes>

    <AltaLigas/>
    </>

  )
}

export default App