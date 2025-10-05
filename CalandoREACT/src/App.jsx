import { Routes, Route } from 'react-router-dom'
import VentanaPrincipal from './pages/VentanaPrincipal'
import DetalleEquipo from './pages/DetalleEquipo'
import AltaEquipos from './pages/AltaEquipos'

function App() {
  return (
    <Routes>
      <Route path="/" element={<VentanaPrincipal />} />
      <Route path="/equipos/:id" element={<DetalleEquipo />} />
      <Route path='/equipos/nuevo' element={<AltaEquipos/>}/>
    </Routes>
  )
}

export default App