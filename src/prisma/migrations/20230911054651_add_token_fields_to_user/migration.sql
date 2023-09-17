-- AlterTable
ALTER TABLE "User" ADD COLUMN     "confirmedAt" TIMESTAMP(3),
ADD COLUMN     "emailToken" TEXT,
ADD COLUMN     "emailTokenExpires" TIMESTAMP(3),
ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpires" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Workout" ALTER COLUMN "title" SET DEFAULT to_char(now(), 'MM/DD/YY');
