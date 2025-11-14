import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

const router = express.Router();
const prisma = new PrismaClient();

// Crear liga
router.post('/', async (req, res) => {
  const { nombreLiga, edadMin, edadMax, categoria, nombrePresidente, contactoPresidente } = req.body;

  try {
    const nueva = await prisma.liga.create({
      data: {
        nombreLiga,
        edad_min: Number(edadMin),
        edad_max: Number(edadMax),
        categoria,
        nombrePresidente,
        contactoPresidente
      }
    });

    res.json(nueva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar la liga' });
  }
});
// Obtener todas
router.get('/', async (req, res) => {
  const ligas = await prisma.liga.findMany();
  res.json(ligas);
});
// Obtener por ID
router.get('/:id', async (req, res) => {
  const liga = await prisma.liga.findUnique({ where: { id: Number(req.params.id) } });

  if (!liga) return res.status(404).json({ error: 'Liga no encontrada' });

  res.json(liga);
});
// Editar
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const data = req.body;

  try {
    const editada = await prisma.liga.update({
      where: { id },
      data: {
        nombreLiga: data.nombreLiga,
        edad_min: data.edadMin,
        edad_max: data.edadMax,
        categoria: data.categoria,
        nombrePresidente: data.nombrePresidente,
        contactoPresidente: data.contactoPresidente
      }
    });

    res.json(editada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo editar la liga' });
  }
});
// Eliminar
router.delete('/:id', async (req, res) => {
  try {
    await prisma.liga.delete({ where: { id: Number(req.params.id) } });
    res.json({ mensaje: 'Liga eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar liga' });
  }
});

export default router;