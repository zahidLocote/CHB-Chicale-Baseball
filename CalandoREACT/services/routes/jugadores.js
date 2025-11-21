import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const prisma = new PrismaClient();


// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  }
});

const upload = multer({ storage });

// Crear
router.post('/', upload.single('foto'), async (req, res) => {
  const { nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, numero, posicion, equipoId } = req.body;

  const foto = req.file ? req.file.filename : null;

  try {
    const jugador = await prisma.jugador.create({
      data: {
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        fechaNacimiento: new Date(fechaNacimiento),
        numero: Number(numero),
        posicion,
        equipoId: Number(equipoId),
        foto
      }
    });
    res.json({ message: "Jugador creado", jugador });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear jugador" });
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
router.put('/:id', upload.single('foto'), async (req, res) => {
  const id = Number(req.params.id);
  const { nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, numero, posicion } = req.body;

  const foto = req.file ? req.file.filename : undefined; 

  try {
    const jugador = await prisma.jugador.update({
      where: { id },
      data: {
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        fechaNacimiento: new Date(fechaNacimiento),
        numero: Number(numero),
        posicion,
        ...(foto && { foto })
      }
    });

    res.json({ message: "Jugador editado", jugador });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al editar jugador" });
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