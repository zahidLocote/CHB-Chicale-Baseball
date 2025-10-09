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
CREATE TABLE `equipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `entrenador` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,
    `ligaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `equipo` ADD CONSTRAINT `equipo_ligaId_fkey` FOREIGN KEY (`ligaId`) REFERENCES `Liga`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
