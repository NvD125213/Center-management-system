/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Blog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Class_Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Class_Weekday` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Classes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Consultation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Part` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_Question_ID_fkey";

-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_Menu_ID_fkey";

-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_User_ID_fkey";

-- DropForeignKey
ALTER TABLE "Class_Student" DROP CONSTRAINT "Class_Student_Class_ID_fkey";

-- DropForeignKey
ALTER TABLE "Class_Student" DROP CONSTRAINT "Class_Student_Student_ID_fkey";

-- DropForeignKey
ALTER TABLE "Classes" DROP CONSTRAINT "Classes_Address_ID_fkey";

-- DropForeignKey
ALTER TABLE "Classes" DROP CONSTRAINT "Classes_ClassWeekday_ID_fkey";

-- DropForeignKey
ALTER TABLE "Classes" DROP CONSTRAINT "Classes_Course_ID_fkey";

-- DropForeignKey
ALTER TABLE "Classes" DROP CONSTRAINT "Classes_Teacher_ID_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_Exam_ID_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_User_ID_fkey";

-- DropForeignKey
ALTER TABLE "Consultation" DROP CONSTRAINT "Consultation_Course_ID_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_Menu_ID_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_Subject_ID_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_Answer_ID_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_Exam_ID_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_User_ID_fkey";

-- DropForeignKey
ALTER TABLE "Part" DROP CONSTRAINT "Part_Exam_ID_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_Class_ID_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_Staff_ID_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_Student_ID_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_Group_ID_fkey";

-- DropForeignKey
ALTER TABLE "QuestionGroup" DROP CONSTRAINT "QuestionGroup_Part_ID_fkey";

-- DropForeignKey
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_User_ID_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_User_ID_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_User_ID_fkey";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "Answer";

-- DropTable
DROP TABLE "Blog";

-- DropTable
DROP TABLE "Class_Student";

-- DropTable
DROP TABLE "Class_Weekday";

-- DropTable
DROP TABLE "Classes";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Consultation";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "Exam";

-- DropTable
DROP TABLE "History";

-- DropTable
DROP TABLE "Menu";

-- DropTable
DROP TABLE "Part";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "QuestionGroup";

-- DropTable
DROP TABLE "Staff";

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "Subject";

-- DropTable
DROP TABLE "Teacher";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "CommentStatus";

-- DropEnum
DROP TYPE "Hour";

-- DropEnum
DROP TYPE "IsActive";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "WeekDay";

-- CreateTable
CREATE TABLE "users" (
    "ID" SERIAL NOT NULL,
    "Full_Name" TEXT,
    "Email" TEXT NOT NULL DEFAULT '',
    "PhoneNumber" TEXT NOT NULL DEFAULT '',
    "Password" TEXT NOT NULL DEFAULT '',
    "is_Active" BOOLEAN NOT NULL DEFAULT true,
    "Role" INTEGER NOT NULL DEFAULT 1,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "subjects" (
    "ID" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "exams" (
    "ID" SERIAL NOT NULL,
    "Subject_ID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "parts" (
    "ID" SERIAL NOT NULL,
    "Exam_ID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Order" INTEGER NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parts_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "question_groups" (
    "ID" SERIAL NOT NULL,
    "Part_ID" INTEGER NOT NULL,
    "Element" "Element" NOT NULL,
    "Description" TEXT NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "question_groups_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "questions" (
    "ID" SERIAL NOT NULL,
    "Group_ID" INTEGER NOT NULL,
    "Option" "Option" NOT NULL,
    "Score" INTEGER NOT NULL,
    "AnswerCorrect" TEXT NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "answers" (
    "ID" SERIAL NOT NULL,
    "Question_ID" INTEGER NOT NULL,
    "Selected_Option" TEXT NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "historys" (
    "ID" SERIAL NOT NULL,
    "User_ID" INTEGER NOT NULL,
    "Exam_ID" INTEGER NOT NULL,
    "Answer_ID" INTEGER NOT NULL,
    "Total_Score" INTEGER NOT NULL,
    "Corect_Answer" INTEGER NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "historys_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "menus" (
    "ID" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Sort" INTEGER NOT NULL,
    "Status" "MenuStatus" NOT NULL,
    "Parent_ID" INTEGER,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "blogs" (
    "ID" SERIAL NOT NULL,
    "User_ID" INTEGER NOT NULL,
    "Menu_ID" INTEGER NOT NULL,
    "Status" "MenuStatus" NOT NULL,
    "Title" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "courses" (
    "ID" SERIAL NOT NULL,
    "Menu_ID" INTEGER NOT NULL,
    "Lessons" INTEGER NOT NULL,
    "Term" INTEGER NOT NULL,
    "Level" "Level" NOT NULL,
    "Price" DECIMAL(10,2) NOT NULL,
    "Currency" VARCHAR(3) NOT NULL DEFAULT 'VND',
    "Description" TEXT NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "student" (
    "ID" SERIAL NOT NULL,
    "User_ID" INTEGER NOT NULL,
    "Birth" TIMESTAMP(3) NOT NULL,
    "State" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "Zip_code" TEXT NOT NULL,
    "Street" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "teachers" (
    "ID" SERIAL NOT NULL,
    "User_ID" INTEGER NOT NULL,
    "Description" TEXT NOT NULL,
    "Photo" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "staffs" (
    "ID" SERIAL NOT NULL,
    "User_ID" INTEGER NOT NULL,
    "Position" TEXT NOT NULL,
    "Photo" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staffs_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "classes" (
    "ID" SERIAL NOT NULL,
    "ClassWeekday_ID" INTEGER NOT NULL,
    "Teacher_ID" INTEGER NOT NULL,
    "Course_ID" INTEGER NOT NULL,
    "Address_ID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Start_Date" TIMESTAMP(3) NOT NULL,
    "Start_End" TIMESTAMP(3) NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "class_students" (
    "ID" SERIAL NOT NULL,
    "Class_ID" INTEGER NOT NULL,
    "Student_ID" INTEGER NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "class_students_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "class_weekdays" (
    "ID" SERIAL NOT NULL,
    "Week_Day" INTEGER NOT NULL,
    "Hours" INTEGER NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "class_weekdays_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "payments" (
    "ID" SERIAL NOT NULL,
    "Student_ID" INTEGER NOT NULL,
    "Staff_ID" INTEGER NOT NULL,
    "Class_ID" INTEGER NOT NULL,
    "Payment_Date" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "Payment_Method" "PaymentMethod" NOT NULL,
    "Status" "PaymentStatus" NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "consultations" (
    "ID" SERIAL NOT NULL,
    "Course_ID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "School" TEXT NOT NULL,
    "Level" "Level" NOT NULL,
    "Target" TEXT NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consultations_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "address" (
    "ID" SERIAL NOT NULL,
    "State" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "comments" (
    "ID" SERIAL NOT NULL,
    "User_ID" INTEGER NOT NULL,
    "Parent_ID" INTEGER,
    "Exam_ID" INTEGER NOT NULL,
    "Content" TEXT NOT NULL,
    "Status" BOOLEAN NOT NULL DEFAULT true,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_Email_key" ON "users"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "users_PhoneNumber_key" ON "users"("PhoneNumber");

-- CreateIndex
CREATE INDEX "users_Email_idx" ON "users"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_Name_key" ON "subjects"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "exams_Name_key" ON "exams"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "parts_Exam_ID_key" ON "parts"("Exam_ID");

-- CreateIndex
CREATE UNIQUE INDEX "questions_AnswerCorrect_key" ON "questions"("AnswerCorrect");

-- CreateIndex
CREATE UNIQUE INDEX "historys_User_ID_key" ON "historys"("User_ID");

-- CreateIndex
CREATE UNIQUE INDEX "historys_Exam_ID_key" ON "historys"("Exam_ID");

-- CreateIndex
CREATE UNIQUE INDEX "historys_Answer_ID_key" ON "historys"("Answer_ID");

-- CreateIndex
CREATE UNIQUE INDEX "menus_Name_key" ON "menus"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "menus_Sort_key" ON "menus"("Sort");

-- CreateIndex
CREATE UNIQUE INDEX "blogs_User_ID_key" ON "blogs"("User_ID");

-- CreateIndex
CREATE UNIQUE INDEX "blogs_Menu_ID_key" ON "blogs"("Menu_ID");

-- CreateIndex
CREATE UNIQUE INDEX "courses_Menu_ID_key" ON "courses"("Menu_ID");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_User_ID_key" ON "teachers"("User_ID");

-- CreateIndex
CREATE UNIQUE INDEX "staffs_User_ID_key" ON "staffs"("User_ID");

-- CreateIndex
CREATE UNIQUE INDEX "class_students_Class_ID_key" ON "class_students"("Class_ID");

-- CreateIndex
CREATE UNIQUE INDEX "class_students_Student_ID_key" ON "class_students"("Student_ID");

-- AddForeignKey
ALTER TABLE "exams" ADD CONSTRAINT "exams_Subject_ID_fkey" FOREIGN KEY ("Subject_ID") REFERENCES "subjects"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parts" ADD CONSTRAINT "parts_Exam_ID_fkey" FOREIGN KEY ("Exam_ID") REFERENCES "exams"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_groups" ADD CONSTRAINT "question_groups_Part_ID_fkey" FOREIGN KEY ("Part_ID") REFERENCES "parts"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_Group_ID_fkey" FOREIGN KEY ("Group_ID") REFERENCES "question_groups"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_Question_ID_fkey" FOREIGN KEY ("Question_ID") REFERENCES "questions"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historys" ADD CONSTRAINT "historys_User_ID_fkey" FOREIGN KEY ("User_ID") REFERENCES "users"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historys" ADD CONSTRAINT "historys_Exam_ID_fkey" FOREIGN KEY ("Exam_ID") REFERENCES "exams"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historys" ADD CONSTRAINT "historys_Answer_ID_fkey" FOREIGN KEY ("Answer_ID") REFERENCES "answers"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_User_ID_fkey" FOREIGN KEY ("User_ID") REFERENCES "users"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_Menu_ID_fkey" FOREIGN KEY ("Menu_ID") REFERENCES "menus"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_Menu_ID_fkey" FOREIGN KEY ("Menu_ID") REFERENCES "menus"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_User_ID_fkey" FOREIGN KEY ("User_ID") REFERENCES "users"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_User_ID_fkey" FOREIGN KEY ("User_ID") REFERENCES "users"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffs" ADD CONSTRAINT "staffs_User_ID_fkey" FOREIGN KEY ("User_ID") REFERENCES "users"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_ClassWeekday_ID_fkey" FOREIGN KEY ("ClassWeekday_ID") REFERENCES "class_weekdays"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_Teacher_ID_fkey" FOREIGN KEY ("Teacher_ID") REFERENCES "teachers"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_Course_ID_fkey" FOREIGN KEY ("Course_ID") REFERENCES "courses"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_Address_ID_fkey" FOREIGN KEY ("Address_ID") REFERENCES "address"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_students" ADD CONSTRAINT "class_students_Class_ID_fkey" FOREIGN KEY ("Class_ID") REFERENCES "classes"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_students" ADD CONSTRAINT "class_students_Student_ID_fkey" FOREIGN KEY ("Student_ID") REFERENCES "student"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_Student_ID_fkey" FOREIGN KEY ("Student_ID") REFERENCES "student"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_Staff_ID_fkey" FOREIGN KEY ("Staff_ID") REFERENCES "staffs"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_Class_ID_fkey" FOREIGN KEY ("Class_ID") REFERENCES "classes"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_Course_ID_fkey" FOREIGN KEY ("Course_ID") REFERENCES "courses"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_User_ID_fkey" FOREIGN KEY ("User_ID") REFERENCES "users"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_Exam_ID_fkey" FOREIGN KEY ("Exam_ID") REFERENCES "exams"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
