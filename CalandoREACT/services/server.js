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
app.get('/equipos', async (req, res) => {
  try {
    const equipos = await prisma.equipo.findMany({
      include: { liga: true, jugadores: true }
    });
    res.json(equipos);
  } catch (error) {
    console.error('Error al obtener equipos:', error);
    res.status(500).json({ error: 'Error al obtener equipos' });
  }
});

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

// INICIO DEL SERVIDOR

app.listen(3001, () => console.log('Servidor corriendo en puerto 3001'));