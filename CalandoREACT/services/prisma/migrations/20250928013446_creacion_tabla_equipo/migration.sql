-- CreateTable
CREATE TABLE `equipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `entrenador` VARCHAR(191) NOT NULL,
    `liga` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
