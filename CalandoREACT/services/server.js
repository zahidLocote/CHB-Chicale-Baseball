import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { DateTime } from 'luxon';
import { PrismaClient } from './generated/prisma/index.js';
import jugadoresRouter from './routes/jugadores.js';
import equiposRouter from "./routes/equipos.js";
import ligasRouter from "./routes/ligas.js";
import partidosRouter from "./routes/partidos.js";
import estadisticasRouter from './routes/estadisticas.js';

dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());



const ZONA = 'America/Tijuana';
let isRunning = false; //

cron.schedule('* * * * *', async () => {
  if (isRunning) return;
  isRunning = true;

  try {
    const ahora = DateTime.now().setZone(ZONA);

    const partidos = await prisma.partido.findMany({
      where: { estado: { in: ['PROGRAMADO', 'ENVIVO'] } },
    });

    for (const p of partidos) {
      const base = DateTime.fromJSDate(p.fecha, { zone: ZONA });
      const [hh = '0', mm = '0'] = (p.hora || '').split(':');

      const inicio = base.set({ hour: Number(hh), minute: Number(mm) });
      const fin = inicio.plus({ hours: 2 });

      let nuevo = p.estado;
      if (ahora < inicio) nuevo = 'PROGRAMADO';
      else if (ahora >= inicio && ahora < fin) nuevo = 'ENVIVO';
      else nuevo = 'FINALIZADO';

      if (nuevo !== p.estado) {
        await prisma.partido.update({
          where: { id: p.id },
          data: { estado: nuevo },
        });
        console.log(`⚡ Partido ${p.id}: ${p.estado} → ${nuevo}`);
      }
    }
  } catch (err) {
    console.error('Error en cron:', err);
  } finally {
    isRunning = false;
  }
}, { timezone: ZONA });


// Rutas
app.use("/api/jugadores", jugadoresRouter);
app.use("/api/equipos", equiposRouter);
app.use("/api/ligas", ligasRouter);
app.use("/api/partidos", partidosRouter);
app.use("/api/estadisticas", estadisticasRouter);

app.listen(3001, () => console.log('Servidor corriendo en puerto 3001'));