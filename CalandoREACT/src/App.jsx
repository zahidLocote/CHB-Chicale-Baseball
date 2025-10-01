import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import VentanaPrincipal from './pages/VentanaPrincipal'


function App() {
  const [count, setCount] = useState(0)
  const [vista, setVista] = useState(null);

  return (
    <>
      <VentanaPrincipal/>
    </>
  )
}

export default App
