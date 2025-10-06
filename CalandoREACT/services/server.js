import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()
const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

// Agregar equipo
app.post('/equipos', async (req, res) => {
  const { nombre, entrenador, logo, ligaId } = req.body

  try {
    const nuevoEquipo = await prisma.equipo.create({
      data: {
        nombre,
        entrenador,
        logo,
        liga: ligaId ? { connect: { id: ligaId } } : undefined
      }
    })
    res.json(nuevoEquipo)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear el equipo' })
  }
})

// Obtener equipos
app.get('/equipos', async (req, res) => {
  const equipos = await prisma.equipo.findMany()
  res.json(equipos)
})

// Obtener equipo por id
app.get('/equipos/:id', async (req, res) => {
  const id = Number(req.params.id)

  try {
    const equipo = await prisma.equipo.findUnique({
      where: { id }
    })

    if (!equipo) {
      return res.status(404).json({ error: 'Equipo no encontrado' })
    }

    res.json(equipo)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener equipo' })
  }
})

// Obtener ligas
app.get('/ligas', async (req, res) => {
  const ligas = await prisma.liga.findMany()
  res.json(ligas)
})

// Eliminar equipo
app.delete('/equipos/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await prisma.equipo.delete({ where: { id } })
    res.json({ mensaje: 'Equipo eliminado correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar equipo' })
  }
})

// Eliminar liga
app.delete('/ligas/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await prisma.liga.delete({ where: { id } })
    res.json({ mensaje: 'Liga eliminada correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar liga' })
  }
})

// Editar Equipo
app.put('/equipos/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { nombre, entrenador, logo, ligaId } = req.body

  try {
    console.log('Datos recibidos:', { nombre, entrenador, logo, ligaId })
    const equipoActualizado = await prisma.equipo.update({
      where: { id },
      data: {
        nombre,
        entrenador,
        logo,
        liga: ligaId ? { connect: { id: Number(ligaId) } } : undefined
      }

    })
    res.json(equipoActualizado)
  } catch (error) {
    console.error('Error al editar equipo:', error)
    res.status(500).json({ error: 'No se pudo editar el equipo' })
  }
})

app.listen(3001, () => console.log('Servidor corriendo en puerto 3001'))