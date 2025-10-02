import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
const prisma = new PrismaClient()

// Configuración de multer para subir archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'logo-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    
    if (mimetype && extname) {
      return cb(null, true)
    }
    cb(new Error('Solo se permiten archivos de imagen (JPG, PNG)'))
  }
})

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))

// Ruta POST para crear liga
app.post('/liga', upload.single('logoLiga'), async (req, res) => {
  try {
    const { nombreLiga, edadMin, edadMax, categoria, nombrePresidente, contactoPresidente } = req.body
    
    console.log('Datos recibidos:', req.body)
    //Esto No existe compa
    //console.log('Archivo recibido:', req.file)
    
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

// Ruta GET para obtener ligas
app.get('/liga', async (req, res) => {
  try {
    const ligas = await prisma.liga.findMany()
    res.json(ligas)
  } catch (error) {
    console.error('Error al obtener ligas:', error)
    res.status(500).json({ error: 'Error al obtener ligas' })
  }
})

app.listen(3001, () => console.log('Servidor corriendo en puerto 3001'))