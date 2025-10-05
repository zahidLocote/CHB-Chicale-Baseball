import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()
const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

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

app.get('/equipos', async (req, res) => {
  const equipos = await prisma.equipo.findMany()
  res.json(equipos)
})

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

app.get('/ligas', async (req, res) => {
  const ligas = await prisma.liga.findMany()
  res.json(ligas)
})

app.listen(3001, () => console.log('Servidor corriendo en puerto 3001'))