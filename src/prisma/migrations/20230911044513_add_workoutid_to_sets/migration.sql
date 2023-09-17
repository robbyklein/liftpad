/*
  Warnings:

  - Added the required column `workoutId` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Set" ADD COLUMN     "workoutId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Workout" ALTER COLUMN "title" SET DEFAULT to_char(now(), 'MM/DD/YY');

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
