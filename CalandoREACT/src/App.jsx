import { useState } from 'react'
import './App.css'
import { Header } from './components/UI/Header'
import { Intro } from './components/UI/Intro'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <Intro></Intro>
      
    </>
  )
}

export default App
