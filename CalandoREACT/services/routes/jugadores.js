import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

const router = express.Router();
const prisma = new PrismaClient();

// Crear
router.post('/', async (req, res) => {
  const { nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, numero, posicion, foto, equipoId } = req.body;

  if (!nombre || !apellidoPaterno || !fechaNacimiento || !numero || !posicion || !equipoId) {
    return res.status(400).json({ message: 'Todos los campos obligatorios deben estar llenos' });
  }

  try {
    const nuevo = await prisma.jugador.create({
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
    res.json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar jugador' });
  }
});
// Obtener por ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const jugador = await prisma.jugador.findUnique({ where: { id } });

  if (!jugador) return res.status(404).json({ message: 'Jugador no encontrado' });

  res.json(jugador);
});
// Obtener por equipo
router.get('/equipo/:equipoId', async (req, res) => {
  const equipoId = Number(req.params.equipoId);
  const jugadores = await prisma.jugador.findMany({
    where: { equipoId },
    orderBy: { numero: 'asc' }
  });

  res.json(jugadores);
});
// Editar
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const datos = req.body;

  try {
    const actualizado = await prisma.jugador.update({
      where: { id },
      data: {
        ...datos,
        fechaNacimiento: new Date(datos.fechaNacimiento),
        numero: Number(datos.numero)
      }
    });
    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al editar jugador' });
  }
});
// Eliminar
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.jugador.delete({ where: { id } });
    res.json({ message: 'Jugador eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar jugador' });
  }
});

export default router;