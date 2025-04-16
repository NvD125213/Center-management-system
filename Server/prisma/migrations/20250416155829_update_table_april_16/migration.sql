/*
  Warnings:

  - You are about to drop the `Part` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `exam_part` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "exam_part" DROP CONSTRAINT "exam_part_exam_id_fkey";

-- DropForeignKey
ALTER TABLE "exam_part" DROP CONSTRAINT "exam_part_part_id_fkey";

-- DropForeignKey
ALTER TABLE "question_groups" DROP CONSTRAINT "question_groups_part_id_fkey";

-- DropTable
DROP TABLE "Part";

-- DropTable
DROP TABLE "exam_part";

-- CreateTable
CREATE TABLE "exam_parts" (
    "id" SERIAL NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "part_id" INTEGER NOT NULL,

    CONSTRAINT "exam_parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "part" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "part_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exam_parts_exam_id_part_id_key" ON "exam_parts"("exam_id", "part_id");

-- AddForeignKey
ALTER TABLE "exam_parts" ADD CONSTRAINT "exam_parts_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_parts" ADD CONSTRAINT "exam_parts_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_groups" ADD CONSTRAINT "question_groups_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
