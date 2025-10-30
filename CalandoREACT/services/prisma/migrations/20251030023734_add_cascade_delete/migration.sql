-- DropForeignKey
ALTER TABLE `estadisticajugador` DROP FOREIGN KEY `EstadisticaJugador_partidoId_fkey`;

-- AddForeignKey
ALTER TABLE `EstadisticaJugador` ADD CONSTRAINT `EstadisticaJugador_partidoId_fkey` FOREIGN KEY (`partidoId`) REFERENCES `Partido`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
