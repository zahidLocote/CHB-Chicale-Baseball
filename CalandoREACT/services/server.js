import express from 'express'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const app = express()
const prisma = new PrismaClient()

// Ruta POST para crear liga
app.post('/liga', upload.single('logoLiga'), async (req, res) => {
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

app.listen(3001, () => console.log('Servidor corriendo en puerto 3001'))