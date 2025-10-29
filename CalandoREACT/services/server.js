import express from 'express'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'


dotenv.config()

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Agregar equipo
app.post('/equipo', async (req, res) => {
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

// Obtener equipos por id de liga
app.get('/equipo', async (req, res) => {
  const { ligaId } = req.query;

  try {
    const equipos = await prisma.equipo.findMany({
      where: ligaId ? { ligaId: Number(ligaId) } : undefined
    });

    res.json(equipos);
  } catch (error) {
    console.error('Error al obtener equipos:', error);
    res.status(500).json({ error: 'Error al obtener equipos' });
  } 
});


// Obtener equipo por id
app.get('/equipo/:id', async (req, res) => {
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


//Obtener liga por id
app.get('/liga/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const liga = await prisma.liga.findUnique({ where: { id } });

    if (!liga) {
      return res.status(404).json({ error: 'Liga no encontrada' });
    }

    res.json(liga);
  } catch (error) {
    console.error('Error al obtener liga:', error);
    res.status(500).json({ error: 'Error al obtener liga' });
  }
});
1

// Eliminar equipo
app.delete('/equipo/:id', async (req, res) => {
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
app.put('/equipo/:id', async (req, res) => {
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

//Editar ligas
app.put('/liga/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { nombreLiga, edadMin, edadMax, categoria, nombrePresidente, contactoPresidente  } = req.body

  try {
    console.log('Datos recibidos:', { nombreLiga, edadMin, edadMax, categoria, nombrePresidente, contactoPresidente  })
    const ligaActualizada = await prisma.liga.update({
      where: { id },
      data: {
        nombreLiga,
        edad_min: edadMin,
        edad_max: edadMax,
        categoria,
        nombrePresidente,
        contactoPresidente,
      }

    })
    res.json(ligaActualizada)
  } catch (error) {
    console.error('Error al editar equipo:', error)
    res.status(500).json({ error: 'No se pudo editar el equipo' })
  }
})

//Eliminar liga
app.delete('/liga/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await prisma.liga.delete({ where: { id } })
    res.json({ mensaje: 'Liga eliminada correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar liga' })
  }
})

//Registro de partidos
app.post('/partido', async (req, res) =>{
    try{
        const {fecha, lugar,hora, equipoId1,equipoId2,equipoNombre1,equipoNombre2, ligaId,} = req.body

        const nuevoPartido = await prisma.partido.create({
            data: {
                fecha,
                lugar,
                hora,
                equipoId1,
                equipoId2,
                equipoNombre1,
                equipoNombre2,
                ligaId,
            }
        })

        res.json({
            succes: true,
            message: 'Partido registrado correctamente.',
            data: nuevoPartido
        })

    }catch (error) {
        console.error('Error al crear partido:', error)
        res.status(500).json({ 
            error: 'Error al registrar el partido',
            details: error.message 
        })
    }

})

//Obtener partidos por liga
app.get('/partido', async (req, res) => {
  const { ligaId } = req.query;

  try {
    const partidos = await prisma.partido.findMany({
      where: ligaId ? { ligaId: Number(ligaId) } : undefined
    });

    res.json(partidos);
  } catch (error) {
    console.error('Error al obtener partidos:', error);
    res.status(500).json({ error: 'Error al obtener partidos' });
  }
});



app.listen(3001, () => console.log('Servidor corriendo en puerto 3001'))