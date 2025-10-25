/*
  Warnings:

  - You are about to drop the column `equipo1Id` on the `partido` table. All the data in the column will be lost.
  - You are about to drop the column `equipo2Id` on the `partido` table. All the data in the column will be lost.
  - Added the required column `equipoId1` to the `Partido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipoId2` to the `Partido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipoNombre1` to the `Partido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipoNombre2` to the `Partido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `partido` DROP COLUMN `equipo1Id`,
    DROP COLUMN `equipo2Id`,
    ADD COLUMN `equipoId1` INTEGER NOT NULL,
    ADD COLUMN `equipoId2` INTEGER NOT NULL,
    ADD COLUMN `equipoNombre1` VARCHAR(191) NOT NULL,
    ADD COLUMN `equipoNombre2` VARCHAR(191) NOT NULL;
