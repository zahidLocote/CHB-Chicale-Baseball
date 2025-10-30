-- CreateTable
CREATE TABLE `EstadisticaJugador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `partidoId` INTEGER NOT NULL,
    `jugadorId` INTEGER NOT NULL,
    `equipoId` INTEGER NOT NULL,
    `H` INTEGER NOT NULL DEFAULT 0,
    `HR` INTEGER NOT NULL DEFAULT 0,
    `H2` INTEGER NOT NULL DEFAULT 0,
    `H3` INTEGER NOT NULL DEFAULT 0,
    `BB` INTEGER NOT NULL DEFAULT 0,
    `K` INTEGER NOT NULL DEFAULT 0,
    `BG` INTEGER NOT NULL DEFAULT 0,
    `turnosLegales` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `EstadisticaJugador_partidoId_jugadorId_key`(`partidoId`, `jugadorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EstadisticaJugador` ADD CONSTRAINT `EstadisticaJugador_partidoId_fkey` FOREIGN KEY (`partidoId`) REFERENCES `Partido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EstadisticaJugador` ADD CONSTRAINT `EstadisticaJugador_jugadorId_fkey` FOREIGN KEY (`jugadorId`) REFERENCES `jugador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EstadisticaJugador` ADD CONSTRAINT `EstadisticaJugador_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `equipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
