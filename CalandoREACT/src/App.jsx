import { useState } from 'react'
import './App.css'
import { Header } from './components/UI/Header'
import  AltaLigas  from './pages/AltaLigas'
import  AltaEquipos  from './pages/AltaEquipos'


function App() {
  const [count, setCount] = useState(0)
  const [vista, setVista] = useState(null);

  return (
    <>
      <Header></Header>
          <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Registro de entidades</h1>

      <div className="flex gap-4 mb-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setVista('ligas')}
        >
          Alta de Ligas
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setVista('equipos')}
        >
          Alta de Equipos
        </button>
      </div>

      {vista === 'ligas' && <AltaLigas />}
      {vista === 'equipos' && <AltaEquipos />}
    </div>

    </>
  )
}

export default App
