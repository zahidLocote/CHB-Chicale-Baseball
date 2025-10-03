-- CreateTable
CREATE TABLE `jugador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellidoPaterno` VARCHAR(191) NOT NULL,
    `apellidoMaterno` VARCHAR(191) NULL DEFAULT 'N/A',
    `fechaNacimiento` DATETIME(3) NOT NULL,
    `numero` INTEGER NOT NULL,
    `posicion` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NULL DEFAULT 'default.png',
    `equipoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `jugador` ADD CONSTRAINT `jugador_equipoId_fkey` FOREIGN KEY (`equipoId`) REFERENCES `equipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
