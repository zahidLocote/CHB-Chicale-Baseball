/*
  Warnings:

  - You are about to alter the column `posicion` on the `jugador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - A unique constraint covering the columns `[equipoId,numero]` on the table `jugador` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `jugador` MODIFY `posicion` ENUM('P', 'C', 'PrimeraBase', 'SegundaBase', 'TerceraBase', 'SS', 'LF', 'CF', 'RF', 'DH', 'SUB') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `jugador_equipoId_numero_key` ON `jugador`(`equipoId`, `numero`);
