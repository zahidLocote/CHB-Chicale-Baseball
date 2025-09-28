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
  const { nombre, entrenador, liga, logo } = req.body
  const nuevo = await prisma.equipo.create({ data: { nombre, entrenador, liga, logo } })
  res.json(nuevo)
})

app.get('/equipos', async (req, res) => {
  const equipos = await prisma.equipo.findMany()
  res.json(equipos)
})

app.listen(3001, () => console.log('Servidor corriendo en puerto 3001'))