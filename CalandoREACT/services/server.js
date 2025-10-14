import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from './generated/prisma/index.js';

dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

// 🔹 EQUIPOS

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
    });
    res.json(nuevoEquipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el equipo' });
  }
});

// Obtener equipos
app.get('/equipos', async (req, res) => {
  const equipos = await prisma.equipo.findMany();
  res.json(equipos);
});

// Obtener equipo por id
app.get('/equipos/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const equipo = await prisma.equipo.findUnique({
      where: { id }
    });

    if (!equipo) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }

    res.json(equipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener equipo' });
  }
});

// Editar equipo
app.put('/equipos/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { nombre, entrenador, logo, ligaId } = req.body;

  try {
    const equipoActualizado = await prisma.equipo.update({
      where: { id },
      data: {
        nombre,
        entrenador,
        logo,
        liga: ligaId ? { connect: { id: Number(ligaId) } } : undefined
      }
    });
    res.json(equipoActualizado);
  } catch (error) {
    console.error('Error al editar equipo:', error);
    res.status(500).json({ error: 'No se pudo editar el equipo' });
  }
});

// Eliminar equipo
app.delete('/equipos/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.equipo.delete({ where: { id } });
    res.json({ mensaje: 'Equipo eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar equipo' });
  }
});

// 🔹 LIGAS
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


// Eliminar equipo
app.delete('/equipo/:id', async (req, res) => {
  const id = Number(req.params.id)
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

// Editar Equipo
app.put('/equipo/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { nombreLiga, edadMin, edadMax, categoria, nombrePresidente, contactoPresidente } = req.body

  try {
    console.log('Datos recibidos:', { nombreLiga, edadMin, edadMax, categoria, nombrePresidente, contactoPresidente })
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
    res.json(ligaActualizadas)
  } catch (error) {
    console.error('Error al editar equipo:', error)
    res.status(500).json({ error: 'No se pudo editar el equipo' })
  }
})

// 🔹 JUGADORES

// Alta jugador
app.post('/api/jugadores', async (req, res) => {
  const {
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    fechaNacimiento,
    numero,
    posicion,
    foto,
    equipoId
  } = req.body;

  try {
    const nuevoJugador = await prisma.jugador.create({
      data: {
        nombre,
        apellidoPaterno,
        apellidoMaterno: apellidoMaterno || "N/A",
        fechaNacimiento: new Date(fechaNacimiento),
        numero: parseInt(numero),
        posicion,
        foto,
        equipo: { connect: { id: parseInt(equipoId) } }
      }
    });

    res.json({ message: "Jugador registrado exitosamente", jugador: nuevoJugador });
  } catch (error) {
    console.error("Error al registrar jugador:", error);
    res.status(500).json({ message: "Error al registrar jugador" });
  }
});

// Obtener jugador por ID
app.get('/api/jugadores/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const jugador = await prisma.jugador.findUnique({
      where: { id }
    });

    if (!jugador) {
      return res.status(404).json({ message: "Jugador no encontrado" });
    }

    res.json(jugador);
  } catch (error) {
    console.error("Error al obtener jugador:", error);
    res.status(500).json({ message: "Error al obtener jugador" });
  }
});

// Obtener jugadores por equipo
app.get('/api/jugadores/equipo/:equipoId', async (req, res) => {
  const equipoId = Number(req.params.equipoId);

  try {
    const jugadores = await prisma.jugador.findMany({
      where: { equipoId }
    });

    res.json(jugadores);
  } catch (error) {
    console.error("Error al obtener jugadores del equipo:", error);
    res.status(500).json({ message: "Error al obtener jugadores del equipo" });
  }
});

app.put('/api/jugadores/:id', async (req, res) => {
  const id = Number(req.params.id);
  const {
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    fechaNacimiento,
    numero,
    posicion,
    foto
  } = req.body;

  try {
    const jugadorActualizado = await prisma.jugador.update({
      where: { id },
      data: {
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        fechaNacimiento: new Date(fechaNacimiento),
        numero: parseInt(numero),
        posicion,
        foto
      }
    });

    res.json(jugadorActualizado);
  } catch (error) {
    console.error("Error al editar jugador:", error);
    res.status(500).json({ message: "Error al editar jugador" });
  }
});


// Eliminar jugador
app.delete('/api/jugadores/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.jugador.delete({
      where: { id }
    });

    res.json({ message: "Jugador eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar jugador:", error);
    res.status(500).json({ message: "Error al eliminar jugador" });
  }
});


//Editar ligas
app.put('/liga/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { nombreLiga, edadMin, edadMax, categoria, nombrePresidente, contactoPresidente } = req.body

  try {
    console.log('Datos recibidos:', { nombreLiga, edadMin, edadMax, categoria, nombrePresidente, contactoPresidente })
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

// 🔹 INICIO DEL SERVIDOR
app.listen(3001, () => console.log('Servidor corriendo en puerto 3001'));
