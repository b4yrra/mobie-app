/*
  Warnings:

  - You are about to drop the column `clerkId` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `dateOfBirth` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_clerkId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "clerkId",
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "dateOfBirth" SET NOT NULL,
ALTER COLUMN "imageUrl" SET NOT NULL;
