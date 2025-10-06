import { Routes, Route } from 'react-router-dom'
import VentanaPrincipal from './pages/VentanaPrincipal'
import DetalleEquipo from './pages/DetalleEquipo'
import AltaEquipos from './pages/AltaEquipos'
import EditarEquipo from './pages/EditarEquipo'

function App() {
  return (
    <Routes>
      <Route path="/" element={<VentanaPrincipal />} />
      <Route path="/equipos/:id" element={<DetalleEquipo />} />
      <Route path='/equipos/nuevo' element={<AltaEquipos/>}/>
      <Route path="/equipos/editar/:id" element={<EditarEquipo />}/>
    </Routes>
  )
}

export default App