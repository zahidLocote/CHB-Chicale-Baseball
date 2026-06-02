import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const prisma = new PrismaClient();

// Storage multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + file.originalname;
    cb(null, unique);
  }
});

const upload = multer({ storage });

// Crear jugador con imagen
router.post('/', upload.single('foto'), async (req, res) => {
  const { nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, numero, posicion, equipoId } = req.body;

  try {
    const nuevo = await prisma.jugador.create({
      data: {
        nombre,
        apellidoPaterno,
        apellidoMaterno: apellidoMaterno || 'N/A',
        fechaNacimiento: new Date(fechaNacimiento),
        numero: Number(numero),
        posicion,
        foto: req.file ? req.file.filename : null,
        equipo: { connect: { id: Number(equipoId) } }
      }
    });

    res.json({ message: "Jugador registrado exitosamente", jugador: nuevo });
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
router.put('/:id', upload.single('foto'), async (req, res) => {
  const id = Number(req.params.id);
  const { nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, numero, posicion, fotoActual, eliminarFoto } = req.body;

  try {
    const jugadorActual = await prisma.jugador.findUnique({ where: { id } });
    if (!jugadorActual) return res.status(404).json({ message: 'Jugador no encontrado' });

    let nuevaFoto = jugadorActual.foto;

    if (req.file) {
      nuevaFoto = req.file.filename;
      if (jugadorActual.foto && jugadorActual.foto !== 'default.png') {
        const ruta = path.join('uploads', jugadorActual.foto);
        if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
      }
    } else if (eliminarFoto === 'true') {
      nuevaFoto = null;
      if (jugadorActual.foto && jugadorActual.foto !== 'default.png') {
        const ruta = path.join('uploads', jugadorActual.foto);
        if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
      }
    } else if (fotoActual !== undefined) {
      nuevaFoto = fotoActual || null;
    }

    const actualizado = await prisma.jugador.update({
      where: { id },
      data: {
        nombre,
        apellidoPaterno,
        apellidoMaterno: apellidoMaterno || 'N/A',
        fechaNacimiento: new Date(fechaNacimiento),
        numero: Number(numero),
        posicion,
        foto: nuevaFoto
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