/*
  Warnings:

  - Added the required column `categoria` to the `Liga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactoPresidente` to the `Liga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombrePresidente` to the `Liga` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `liga` ADD COLUMN `categoria` VARCHAR(191) NOT NULL,
    ADD COLUMN `contactoPresidente` VARCHAR(191) NOT NULL,
    ADD COLUMN `nombrePresidente` VARCHAR(191) NOT NULL;
