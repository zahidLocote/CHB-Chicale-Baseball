import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from './generated/prisma/index.js';

dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

// EQUIPOS

// Crear equipo
app.post('/equipos', async (req, res) => {
  const { nombre, entrenador, logo, ligaId } = req.body;

  if (!nombre || !entrenador) {
    return res.status(400).json({ error: 'Nombre y entrenador son obligatorios' });
  }

  try {
    const nuevoEquipo = await prisma.equipo.create({
      data: {
        nombre,
        entrenador,
        logo: logo || null,
        liga: ligaId ? { connect: { id: Number(ligaId) } } : undefined
      }
    });
    res.status(201).json(nuevoEquipo);
  } catch (error) {
    console.error('Error al crear equipo:', error);
    res.status(500).json({ error: 'Error al crear equipo' });
  }
});

// Obtener todos los equipos
/*app.get('/equipos', async (req, res) => {
  try {
    const equipos = await prisma.equipo.findMany({
      include: { liga: true, jugadores: true }
    });
    res.json(equipos);
  } catch (error) {
    console.error('Error al obtener equipos:', error);
    res.status(500).json({ error: 'Error al obtener equipos' });
  }
});*/

// Obtener equipo por ID
app.get('/equipos/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const equipo = await prisma.equipo.findUnique({
      where: { id },
      include: { liga: true, jugadores: true }
    });

    if (!equipo) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }

    res.json(equipo);
  } catch (error) {
    console.error('Error al obtener equipo:', error);
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
    res.status(500).json({ error: 'Error al editar equipo' });
  }
});

// Eliminar equipo con validación
app.delete('/equipos/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const jugadores = await prisma.jugador.findMany({ where: { equipoId: id } });

    if (jugadores.length > 0) {
      return res.status(400).json({
        error: 'No se puede eliminar el equipo. Tiene jugadores registrados.'
      });
    }

    await prisma.equipo.delete({ where: { id } });
    res.json({ mensaje: 'Equipo eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar equipo:', error);
    res.status(500).json({ error: 'Error al eliminar equipo' });
  }
});

// 🔹 LIGAS
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
app.get('/equipos', async (req, res) => {
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

// LIGAS


app.get('/ligas', async (req, res) => {
  try {
    const ligas = await prisma.liga.findMany();
    res.json(ligas);
  } catch (error) {
    console.error('Error al obtener ligas:', error);
    res.status(500).json({ error: 'Error al obtener ligas' });
  }
});

app.delete('/ligas/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const equipos = await prisma.equipo.findMany({ where: { ligaId: id } });

    if (equipos.length > 0) {
      return res.status(400).json({
        error: 'No se puede eliminar la liga. Contiene equipos registrados.'
      });
    }

    await prisma.liga.delete({ where: { id } });
    res.json({ mensaje: 'Liga eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar liga:', error);
    res.status(500).json({ error: 'Error al eliminar liga' });
  }
});

// JUGADORES
// Registrar jugador
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

  if (!nombre || !apellidoPaterno || !fechaNacimiento || !numero || !posicion || !equipoId) {
    return res.status(400).json({ message: 'Todos los campos obligatorios deben estar llenos' });
  }

  try {
    const nuevoJugador = await prisma.jugador.create({
      data: {
        nombre,
        apellidoPaterno,
        apellidoMaterno: apellidoMaterno || 'N/A',
        fechaNacimiento: new Date(fechaNacimiento),
        numero: Number(numero),
        posicion,
        foto: foto || null,
        equipo: { connect: { id: Number(equipoId) } }
      }
    });

    res.json({ message: 'Jugador registrado exitosamente', jugador: nuevoJugador });
  } catch (error) {
    console.error('Error al registrar jugador:', error);
    if (error.code === 'P2002') {
      res.status(409).json({ message: 'Ya existe un jugador con ese número en este equipo' });
    } else {
      res.status(500).json({ message: 'Error al registrar jugador' });
    }
  }
});

// Obtener jugador por ID
app.get('/api/jugadores/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const jugador = await prisma.jugador.findUnique({ where: { id } });
    if (!jugador) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }
    res.json(jugador);
  } catch (error) {
    console.error('Error al obtener jugador:', error);
    res.status(500).json({ message: 'Error al obtener jugador' });
  }
});

// Obtener jugadores por equipo
app.get('/api/jugadores/equipo/:equipoId', async (req, res) => {
  const equipoId = Number(req.params.equipoId);
  try {
    const jugadores = await prisma.jugador.findMany({
      where: { equipoId },
      orderBy: { numero: 'asc' }
    });
    res.json(jugadores);
  } catch (error) {
    console.error('Error al obtener jugadores del equipo:', error);
    res.status(500).json({ message: 'Error al obtener jugadores del equipo' });
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
    const jugador = await prisma.jugador.findUnique({ where: { id } });

    if (!jugador) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }

    await prisma.jugador.delete({ where: { id } });

    res.json({ message: 'Jugador eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar jugador:', error);
    res.status(500).json({ message: 'Error al eliminar jugador' });
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

// Eliminar partido por ID
app.delete('/partido/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id || isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  try {
    const partido = await prisma.partido.findUnique({ where: { id } });
    if (!partido) return res.status(404).json({ error: 'Partido no encontrado' });

    await prisma.partido.delete({ where: { id } });
    res.json({ mensaje: 'Partido eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar partido:', error);
    res.status(500).json({ error: 'Error al eliminar partido' });
  }
});

// Obtener partido por ID
app.get('/partido/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id || isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  try {
    const partido = await prisma.partido.findUnique({ where: { id } });
    if (!partido) return res.status(404).json({ error: 'Partido no encontrado' });

    res.json(partido);
  } catch (error) {
    console.error('Error al obtener partido por ID:', error);
    res.status(500).json({ error: 'Error interno al obtener partido' });
  }
});

// Editar partido por ID
app.put('/partido/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id || isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  const {
    fecha,
    lugar,
    hora,
    jornada,
    equipo1Id,
    equipo2Id
  } = req.body;

  try {
    const partidoExistente = await prisma.partido.findUnique({ where: { id } });
    if (!partidoExistente) return res.status(404).json({ error: 'Partido no encontrado' });

    const partidoActualizado = await prisma.partido.update({
      where: { id },
      data: {
        fecha,
        lugar,
        hora,
        jornada,
        equipoId1: equipo1Id,
        equipoId2: equipo2Id
      }
    });

    res.json({
      success: true,
      message: 'Partido actualizado correctamente.',
      data: partidoActualizado
    });
  } catch (error) {
    console.error('Error al editar partido:', error);
    res.status(500).json({
      error: 'Error al editar partido',
      details: error.message
    });
  }
});


app.listen(3001, () => console.log('Servidor corriendo en puerto 3001'))

