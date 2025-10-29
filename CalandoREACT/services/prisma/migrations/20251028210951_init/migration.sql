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
<<<<<<<< HEAD:CalandoREACT/services/prisma/migrations/20251014222444_init/migration.sql
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
========
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

>>>>>>>> origin/US-PTS-1:CalandoREACT/services/prisma/migrations/20251028210951_init/migration.sql
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `equipo` ADD CONSTRAINT `equipo_ligaId_fkey` FOREIGN KEY (`ligaId`) REFERENCES `Liga`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
<<<<<<<< HEAD:CalandoREACT/services/prisma/migrations/20251014222444_init/migration.sql
ALTER TABLE `jugador` ADD CONSTRAINT `jugador_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `equipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
========
ALTER TABLE `Partido` ADD CONSTRAINT `Partido_ligaId_fkey` FOREIGN KEY (`ligaId`) REFERENCES `Liga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
>>>>>>>> origin/US-PTS-1:CalandoREACT/services/prisma/migrations/20251028210951_init/migration.sql
