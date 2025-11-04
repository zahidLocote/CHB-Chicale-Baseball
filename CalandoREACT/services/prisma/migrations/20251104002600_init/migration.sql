-- CreateTable
CREATE TABLE `presidente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `contacto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Liga` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreLiga` VARCHAR(191) NOT NULL,
    `edad_min` INTEGER NOT NULL,
    `edad_max` INTEGER NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `nombrePresidente` VARCHAR(191) NOT NULL,
    `contactoPresidente` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `entrenador` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,
    `ligaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jugador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellidoPaterno` VARCHAR(191) NOT NULL,
    `apellidoMaterno` VARCHAR(191) NULL DEFAULT 'N/A',
    `fechaNacimiento` DATETIME(3) NOT NULL,
    `numero` INTEGER NOT NULL,
    `posicion` ENUM('P', 'C', 'PrimeraBase', 'SegundaBase', 'TerceraBase', 'SS', 'LF', 'CF', 'RF', 'DH', 'SUB') NOT NULL,
    `foto` VARCHAR(191) NULL DEFAULT 'default.png',
    `equipoId` INTEGER NOT NULL,

    UNIQUE INDEX `jugador_equipoId_numero_key`(`equipoId`, `numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Partido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `lugar` VARCHAR(191) NOT NULL,
    `hora` VARCHAR(191) NOT NULL,
    `estado` ENUM('PROGRAMADO', 'ENVIVO', 'FINALIZADO') NOT NULL DEFAULT 'PROGRAMADO',
    `equipoId1` INTEGER NOT NULL,
    `equipoId2` INTEGER NOT NULL,
    `equipoNombre1` VARCHAR(191) NOT NULL,
    `equipoNombre2` VARCHAR(191) NOT NULL,
    `score1` INTEGER NOT NULL DEFAULT 0,
    `score2` INTEGER NOT NULL DEFAULT 0,
    `ligaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `BG` INTEGER NOT NULL DEFAULT 0,
    `turnosLegales` INTEGER NOT NULL DEFAULT 0,
    `S` INTEGER NOT NULL DEFAULT 0,

    INDEX `EstadisticaJugador_jugadorId_idx`(`jugadorId`),
    INDEX `EstadisticaJugador_equipoId_idx`(`equipoId`),
    UNIQUE INDEX `EstadisticaJugador_partidoId_jugadorId_key`(`partidoId`, `jugadorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EstadisticaJugadorTotal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jugadorId` INTEGER NOT NULL,
    `equipoId` INTEGER NOT NULL,
    `H` INTEGER NOT NULL DEFAULT 0,
    `HR` INTEGER NOT NULL DEFAULT 0,
    `H2` INTEGER NOT NULL DEFAULT 0,
    `H3` INTEGER NOT NULL DEFAULT 0,
    `BB` INTEGER NOT NULL DEFAULT 0,
    `BG` INTEGER NOT NULL DEFAULT 0,
    `turnosLegales` INTEGER NOT NULL DEFAULT 0,
    `S` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `EstadisticaJugadorTotal_jugadorId_equipoId_key`(`jugadorId`, `equipoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `equipo` ADD CONSTRAINT `equipo_ligaId_fkey` FOREIGN KEY (`ligaId`) REFERENCES `Liga`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jugador` ADD CONSTRAINT `jugador_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `equipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partido` ADD CONSTRAINT `Partido_ligaId_fkey` FOREIGN KEY (`ligaId`) REFERENCES `Liga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EstadisticaJugador` ADD CONSTRAINT `EstadisticaJugador_partidoId_fkey` FOREIGN KEY (`partidoId`) REFERENCES `Partido`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EstadisticaJugador` ADD CONSTRAINT `EstadisticaJugador_jugadorId_fkey` FOREIGN KEY (`jugadorId`) REFERENCES `jugador`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EstadisticaJugador` ADD CONSTRAINT `EstadisticaJugador_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `equipo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EstadisticaJugadorTotal` ADD CONSTRAINT `EstadisticaJugadorTotal_jugadorId_fkey` FOREIGN KEY (`jugadorId`) REFERENCES `jugador`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EstadisticaJugadorTotal` ADD CONSTRAINT `EstadisticaJugadorTotal_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `equipo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
