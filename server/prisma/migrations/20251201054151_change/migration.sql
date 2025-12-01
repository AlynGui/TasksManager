/*
  Warnings:

  - You are about to drop the column `user_id` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "user_id",
ADD COLUMN     "userId" INTEGER NOT NULL DEFAULT 0;
