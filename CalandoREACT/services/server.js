import express from 'express'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

    res.json({
      success: true,
      message: 'Liga registrada exitosamente',
      data: nuevaLiga
    })

  } catch (error) {
    console.error('Error al crear liga:', error)
    res.status(500).json({ 
      error: 'Error al registrar la liga',
      details: error.message 
    })
  }
})

// Ruta POST para crear liga
app.post('/liga', async (req, res) => {
  try {
    const { nombreLiga, edadMin, edadMax, categoria, nombrePresidente, contactoPresidente } = req.body

    console.log('Datos recibidos:', req.body)

    if (!nombreLiga || !categoria || !nombrePresidente || !contactoPresidente) {
      return res.status(400).json({ 
        error: 'Todos los campos son obligatorios excepto el logo' 
      })
    }

    const edadMinNum = parseInt(edadMin)
    const edadMaxNum = parseInt(edadMax)

    if (isNaN(edadMinNum) || isNaN(edadMaxNum)) {
      return res.status(400).json({ 
        error: 'Las edades deben ser números válidos' 
      })
    }

    if (edadMinNum > edadMaxNum) {
      return res.status(400).json({ 
        error: 'La edad mínima no puede ser mayor que la edad máxima' 
      })
    }

    const nuevaLiga = await prisma.liga.create({
      data: {
        nombreLiga,
        edad_min: edadMinNum,
        edad_max: edadMaxNum,
        categoria,
        nombrePresidente,
        contactoPresidente,
        //logoUrl: req.file ? `/uploads/${req.file.filename}` : null
      }
    })

    res.json({
      success: true,
      message: 'Liga registrada exitosamente',
      data: nuevaLiga
    })

  } catch (error) {
    console.error('Error al crear liga:', error)
    res.status(500).json({ 
      error: 'Error al registrar la liga',
      details: error.message 
    })
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
  app.get('/liga', async (req, res) => {
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