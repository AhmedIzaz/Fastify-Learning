/*
  Warnings:

  - You are about to drop the column `createBy` on the `Post` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_createBy_fkey`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `createBy`,
    ADD COLUMN `createdBy` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
