-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "performed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "title" SET DEFAULT to_char(now(), 'MM/DD/YY');
