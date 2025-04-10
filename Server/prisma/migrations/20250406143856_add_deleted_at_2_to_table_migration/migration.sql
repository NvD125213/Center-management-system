/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `class_students` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `class_weekdays` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `consultations` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `exams` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `historys` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `menus` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `parts` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `question_groups` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `staffs` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `subjects` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `teachers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "answers" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "class_students" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "class_weekdays" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "classes" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "consultations" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "exams" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "historys" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "menus" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "parts" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "question_groups" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "staffs" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "student" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "subjects" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "deletedAt",
ADD COLUMN     "deleted_at" TIMESTAMP(3);
