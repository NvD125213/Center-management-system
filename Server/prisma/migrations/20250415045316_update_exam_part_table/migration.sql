/*
  Warnings:

  - You are about to drop the `parts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "parts" DROP CONSTRAINT "parts_exam_id_fkey";

-- DropForeignKey
ALTER TABLE "question_groups" DROP CONSTRAINT "question_groups_part_id_fkey";

-- DropTable
DROP TABLE "parts";

-- CreateTable
CREATE TABLE "ExamPart" (
    "id" SERIAL NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "part_id" INTEGER NOT NULL,

    CONSTRAINT "ExamPart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Part_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExamPart_exam_id_part_id_key" ON "ExamPart"("exam_id", "part_id");

-- AddForeignKey
ALTER TABLE "ExamPart" ADD CONSTRAINT "ExamPart_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamPart" ADD CONSTRAINT "ExamPart_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_groups" ADD CONSTRAINT "question_groups_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
