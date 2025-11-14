import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';


const router = express.Router();
const prisma = new PrismaClient();

// Registrar partido
router.post('/', async (req, res) => {
  const data = req.body;

  try {
    const partido = await prisma.partido.create({ data });
    res.json({ success: true, data: partido });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar partido' });
  }
});
// Obtener por liga
router.get('/', async (req, res) => {
  const { ligaId } = req.query;

  try {
    const partidos = await prisma.partido.findMany({
      where: ligaId ? { ligaId: Number(ligaId) } : undefined
    });

    res.json(partidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener partidos' });
  }
});
// Obtener por ID
router.get('/:id', async (req, res) => {
  const partido = await prisma.partido.findUnique({
    where: { id: Number(req.params.id) }
  });

  if (!partido) return res.status(404).json({ error: 'Partido no encontrado' });

  res.json(partido);
});
// Editar
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const actualizado = await prisma.partido.update({
      where: { id },
      data: req.body
    });

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar partido' });
  }
});
// Eliminar
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.partido.delete({ where: { id } });
    res.json({ mensaje: 'Partido eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar partido' });
  }
});

export default router;