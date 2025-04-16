/*
  Warnings:

  - You are about to drop the `ExamPart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExamPart" DROP CONSTRAINT "ExamPart_exam_id_fkey";

-- DropForeignKey
ALTER TABLE "ExamPart" DROP CONSTRAINT "ExamPart_part_id_fkey";

-- DropTable
DROP TABLE "ExamPart";

-- CreateTable
CREATE TABLE "exam_part" (
    "id" SERIAL NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "part_id" INTEGER NOT NULL,

    CONSTRAINT "exam_part_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exam_part_exam_id_part_id_key" ON "exam_part"("exam_id", "part_id");

-- AddForeignKey
ALTER TABLE "exam_part" ADD CONSTRAINT "exam_part_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_part" ADD CONSTRAINT "exam_part_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
