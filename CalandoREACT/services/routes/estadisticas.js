import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

const router = express.Router();
const prisma = new PrismaClient();

//REGISTRAR ESTADÍSTICAS DE JUGADORES (Por partido)
router.post('/', async (req, res) => {
  const { equipoId, partidoId, carrerasTotales, estadisticas } = req.body;

  if (!equipoId || !partidoId || !Array.isArray(estadisticas)) {
    return res.status(400).json({ error: 'Datos incompletos o inválidos.' });
  }

  try {
    const resultado = await prisma.$transaction(async (tx) => {
      const resultados = { partidoGuardado: 0, totalesActualizados: 0 };

      // Guardar estadísticas del partido (historial)
      for (const stat of estadisticas) {
        const existe = await tx.estadisticaJugador.findFirst({
          where: {
            partidoId: Number(partidoId),
            jugadorId: Number(stat.jugadorId)
          }
        });

        if (existe) {
          await tx.estadisticaJugador.update({
            where: { id: existe.id },
            data: {
              H: stat.H || 0,
              HR: stat.HR || 0,
              H2: stat.H2 || 0,
              H3: stat.H3 || 0,
              BB: stat.BB || 0,
              BG: stat.BG || 0,
              turnosLegales: stat.TL || 0,
              S: stat.S || 0
            }
          });
        } else {
          await tx.estadisticaJugador.create({
            data: {
              partidoId: Number(partidoId),
              jugadorId: Number(stat.jugadorId),
              equipoId: Number(equipoId),
              H: stat.H || 0,
              HR: stat.HR || 0,
              H2: stat.H2 || 0,
              H3: stat.H3 || 0,
              BB: stat.BB || 0,
              BG: stat.BG || 0,
              turnosLegales: stat.TL || 0,
              S: stat.S || 0
            }
          });
        }

        resultados.partidoGuardado++;
      }

      // Actualizar estadísticas totales del jugador
      for (const stat of estadisticas) {
        const totalExiste = await tx.estadisticaJugadorTotal.findFirst({
          where: {
            jugadorId: Number(stat.jugadorId),
            equipoId: Number(equipoId)
          }
        });

        if (totalExiste) {
          await tx.estadisticaJugadorTotal.update({
            where: { id: totalExiste.id },
            data: {
              H: totalExiste.H + (stat.H || 0),
              HR: totalExiste.HR + (stat.HR || 0),
              H2: totalExiste.H2 + (stat.H2 || 0),
              H3: totalExiste.H3 + (stat.H3 || 0),
              BB: totalExiste.BB + (stat.BB || 0),
              BG: totalExiste.BG + (stat.BG || 0),
              turnosLegales: totalExiste.turnosLegales + (stat.TL || 0),
              S: totalExiste.S + (stat.S || 0)
            }
          });
        } else {
          await tx.estadisticaJugadorTotal.create({
            data: {
              jugadorId: Number(stat.jugadorId),
              equipoId: Number(equipoId),
              H: stat.H || 0,
              HR: stat.HR || 0,
              H2: stat.H2 || 0,
              H3: stat.H3 || 0,
              BB: stat.BB || 0,
              BG: stat.BG || 0,
              turnosLegales: stat.TL || 0,
              S: stat.S || 0
            }
          });
        }

        resultados.totalesActualizados++;
      }

      // Actualizar marcador del partido
      const partido = await tx.partido.findUnique({
        where: { id: Number(partidoId) }
      });

      if (partido && typeof carrerasTotales === 'number') {
        const campoScore = partido.equipoId1 === Number(equipoId) ? 'score1' : 'score2';

        await tx.partido.update({
          where: { id: Number(partidoId) },
          data: { [campoScore]: carrerasTotales }
        });
      }

      return resultados;
    });

    res.json({
      success: true,
      message: 'Estadísticas registradas correctamente',
      ...resultado
    });

  } catch (error) {
    console.error('Error al registrar estadísticas:', error);
    res.status(500).json({
      error: 'Error al registrar estadísticas',
      details: error.message
    });
  }
});
//TABLA DE POSICIONES (Clasificación por liga)
router.get('/equipos/:ligaId', async (req, res) => {
  const ligaId = Number(req.params.ligaId);

  try {
    const partidos = await prisma.partido.findMany({
      where: { ligaId, estado: 'FINALIZADO' },
      select: {
        equipoId1: true,
        equipoNombre1: true,
        score1: true,
        equipoId2: true,
        equipoNombre2: true,
        score2: true
      }
    });

    const tabla = new Map();

    const ensureTeam = (id, nombre) => {
      if (!tabla.has(id)) {
        tabla.set(id, { equipo: nombre, G: 0, P: 0, RS: 0, RA: 0 });
      }
      return tabla.get(id);
    };

    for (const p of partidos) {
      const t1 = ensureTeam(p.equipoId1, p.equipoNombre1);
      const t2 = ensureTeam(p.equipoId2, p.equipoNombre2);

      const s1 = Number(p.score1 ?? 0);
      const s2 = Number(p.score2 ?? 0);

      t1.RS += s1; t1.RA += s2;
      t2.RS += s2; t2.RA += s1;

      if (s1 > s2) { t1.G++; t2.P++; }
      else if (s2 > s1) { t2.G++; t1.P++; }
    }

    const rows = Array.from(tabla.values()).map(t => {
      const juegos = t.G + t.P;
      return {
        equipo: t.equipo,
        G: t.G,
        P: t.P,
        Porcentaje: juegos ? (t.G / juegos).toFixed(3) : '0.000',
        RS: t.RS,
        RA: t.RA,
        Diff: (t.RS - t.RA >= 0 ? "+" : "") + (t.RS - t.RA),
        RAVG: juegos ? (t.RS / juegos).toFixed(2) : '0.00',
        PTS: t.G * 2
      };
    });

    rows.sort((a, b) =>
      Number(b.Porcentaje) - Number(a.Porcentaje) ||
      parseInt(b.Diff) - parseInt(a.Diff)
    );

    res.json(rows);

  } catch (error) {
    console.error('Error al obtener tabla:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});
// ESTADÍSTICAS GLOBALES DE UN JUGADOR
router.get('/jugador', async (req, res) => {
  const { jugadorId, equipoId } = req.query;

  if (!jugadorId) return res.status(400).json({ error: 'jugadorId es obligatorio' });

  try {
    const estadistica = await prisma.estadisticaJugadorTotal.findFirst({
      where: {
        jugadorId: Number(jugadorId),
        ...(equipoId && { equipoId: Number(equipoId) })
      },
      include: { jugador: true, equipo: true }
    });

    if (!estadistica) {
      return res.status(404).json({ error: 'No hay estadísticas para este jugador.' });
    }

    res.json(estadistica);

  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas.' });
  }
});
// Obtener historial por partido de un jugador
router.get('/historial/:jugadorId', async (req, res) => {
  const jugadorId = Number(req.params.jugadorId);

  try {
    const historial = await prisma.estadisticaJugador.findMany({
      where: { jugadorId },
      include: {
        partido: true
      },
      orderBy: {
        partidoId: 'asc'
      }
    });

    res.json(historial);
  } catch (error) {
    console.error("Error al obtener historial:", error);
    res.status(500).json({ error: "Error al obtener historial del jugador" });
  }
});
// Editar estadísticas de un partido
router.put('/historial/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const updated = await prisma.estadisticaJugador.update({
      where: { id },
      data: req.body
    });

    res.json(updated);
  } catch (error) {
    console.error("Error al editar estadística:", error);
    res.status(500).json({ error: "Error al editar estadística del jugador" });
  }
});

export default router;