-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "equipment" TEXT NOT NULL,
    "imageEnd" TEXT NOT NULL,
    "imageStart" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "liftType" TEXT NOT NULL,
    "muscle" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);
