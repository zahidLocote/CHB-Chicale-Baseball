import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

const router = express.Router();
const prisma = new PrismaClient();

// Crear equipo
router.post('/', async (req, res) => {
  const { nombre, entrenador, logo, ligaId } = req.body;

  try {
    const nuevo = await prisma.equipo.create({
      data: {
        nombre,
        entrenador,
        logo: logo || null,
        liga: ligaId ? { connect: { id: Number(ligaId) } } : undefined
      }
    });

    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear equipo' });
  }
});
// Obtener equipos por liga
router.get('/', async (req, res) => {
  const { ligaId } = req.query;

  try {
    const equipos = await prisma.equipo.findMany({
      where: ligaId ? { ligaId: Number(ligaId) } : undefined
    });

    res.json(equipos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener equipos' });
  }
});
// Obtener por ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const equipo = await prisma.equipo.findUnique({
      where: { id },
      include: { liga: true, jugadores: true }
    });

    if (!equipo) return res.status(404).json({ error: 'Equipo no encontrado' });

    res.json(equipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener equipo' });
  }
});
// Editar
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { nombre, entrenador, logo, ligaId } = req.body;

  try {
    const actualizado = await prisma.equipo.update({
      where: { id },
      data: {
        nombre,
        entrenador,
        logo,
        liga: ligaId ? { connect: { id: Number(ligaId) } } : undefined
      }
    });

    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al editar equipo' });
  }
});
// Eliminar
router.delete('/:id', async (req, res) => {
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
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar equipo' });
  }
});

export default router;