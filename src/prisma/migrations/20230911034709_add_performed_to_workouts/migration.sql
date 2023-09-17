-- AlterTable
ALTER TABLE "Workout" ALTER COLUMN "title" SET DEFAULT to_char(now(), 'MM/DD/YY');
