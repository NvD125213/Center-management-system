-- CreateEnum
CREATE TYPE "IsActive" AS ENUM ('1', '0');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('1', '2', '3');

-- CreateEnum
CREATE TYPE "Element" AS ENUM ('images', 'audio');

-- CreateEnum
CREATE TYPE "Option" AS ENUM ('A', 'B', 'C', 'D');

-- CreateEnum
CREATE TYPE "MenuStatus" AS ENUM ('Open', 'Close');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('T2', 'T3', 'T4', 'T5', 'T6', 'T7');

-- CreateEnum
CREATE TYPE "Hour" AS ENUM ('9h', '14h', '16h', '18h', '20h');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('Tiền mặt', 'Banking');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Chờ xử lý', 'Hoàn thành', 'Từ chối');

-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('Hiện', 'Ẩn');

-- CreateTable
CREATE TABLE "User" (
    "ID" SERIAL NOT NULL,
    "Full_Name" TEXT,
    "Email" TEXT NOT NULL DEFAULT '',
    "PhoneNumber" TEXT NOT NULL DEFAULT '',
    "Password" TEXT NOT NULL DEFAULT '',
    "is_Active" "IsActive" NOT NULL DEFAULT '1',
    "Role" "Role" NOT NULL DEFAULT '1',
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Subject" (
    "ID" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Exam" (
    "ID" SERIAL NOT NULL,
    "Subject_ID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Part" (
    "ID" SERIAL NOT NULL,
    "Exam_ID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Order" INTEGER NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Part_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "QuestionGroup" (
    "ID" SERIAL NOT NULL,
    "Part_ID" INTEGER NOT NULL,
    "Element" "Element" NOT NULL,
    "Description" TEXT NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionGroup_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Question" (
    "ID" SERIAL NOT NULL,
    "Group_ID" INTEGER NOT NULL,
    "Option" "Option" NOT NULL,
    "Score" INTEGER NOT NULL,
    "AnswerCorrect" TEXT NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Answer" (
    "ID" SERIAL NOT NULL,
    "Question_ID" INTEGER NOT NULL,
    "Selected_Option" TEXT NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "History" (
    "ID" SERIAL NOT NULL,
    "User_ID" INTEGER NOT NULL,
    "Exam_ID" INTEGER NOT NULL,
    "Answer_ID" INTEGER NOT NULL,
    "Total_Score" INTEGER NOT NULL,
    "Corect_Answer" INTEGER NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Menu" (
    "ID" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Sort" INTEGER NOT NULL,
    "Status" "MenuStatus" NOT NULL,
    "Parent_ID" INTEGER,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Blog" (
    "ID" SERIAL NOT NULL,
    "User_ID" INTEGER NOT NULL,
    "Menu_ID" INTEGER NOT NULL,
    "Status" "MenuStatus" NOT NULL,
    "Title" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Course" (
    "ID" SERIAL NOT NULL,
    "Menu_ID" INTEGER NOT NULL,
    "Lessons" INTEGER NOT NULL,
    "Term" INTEGER NOT NULL,
    "Level" "Level" NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,
    "Description" TEXT NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Student" (
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

    CONSTRAINT "Student_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "ID" SERIAL NOT NULL,
    "User_ID" INTEGER NOT NULL,
    "Description" TEXT NOT NULL,
    "Photo" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Staff" (
    "ID" SERIAL NOT NULL,
    "User_ID" INTEGER NOT NULL,
    "Position" TEXT NOT NULL,
    "Photo" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Classes" (
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

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Class_Student" (
    "ID" SERIAL NOT NULL,
    "Class_ID" INTEGER NOT NULL,
    "Student_ID" INTEGER NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_Student_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Class_Weekday" (
    "ID" SERIAL NOT NULL,
    "Week_Day" "WeekDay" NOT NULL,
    "Hours" "Hour" NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_Weekday_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Payment" (
    "ID" SERIAL NOT NULL,
    "Student_ID" INTEGER NOT NULL,
    "Staff_ID" INTEGER NOT NULL,
    "Class_ID" INTEGER NOT NULL,
    "Payment_Date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "Payment_Method" "PaymentMethod" NOT NULL,
    "Status" "PaymentStatus" NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Consultation" (
    "ID" SERIAL NOT NULL,
    "Course_ID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "School" TEXT NOT NULL,
    "Level" TEXT NOT NULL,
    "Target" TEXT NOT NULL,
    "Date" TEXT NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Address" (
    "ID" SERIAL NOT NULL,
    "State" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Comment" (
    "ID" SERIAL NOT NULL,
    "User_ID" INTEGER NOT NULL,
    "Parent_ID" INTEGER,
    "Exam_ID" INTEGER NOT NULL,
    "Content" TEXT NOT NULL,
    "Status" "CommentStatus" NOT NULL,
    "Create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "User_PhoneNumber_key" ON "User"("PhoneNumber");

-- CreateIndex
CREATE INDEX "User_Email_idx" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_Name_key" ON "Subject"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Exam_Name_key" ON "Exam"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Part_Exam_ID_key" ON "Part"("Exam_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Question_AnswerCorrect_key" ON "Question"("AnswerCorrect");

-- CreateIndex
CREATE UNIQUE INDEX "History_User_ID_key" ON "History"("User_ID");

-- CreateIndex
CREATE UNIQUE INDEX "History_Exam_ID_key" ON "History"("Exam_ID");

-- CreateIndex
CREATE UNIQUE INDEX "History_Answer_ID_key" ON "History"("Answer_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_Name_key" ON "Menu"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_Sort_key" ON "Menu"("Sort");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_User_ID_key" ON "Blog"("User_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_Menu_ID_key" ON "Blog"("Menu_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Course_Menu_ID_key" ON "Course"("Menu_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_User_ID_key" ON "Teacher"("User_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_User_ID_key" ON "Staff"("User_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Class_Student_Class_ID_key" ON "Class_Student"("Class_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Class_Student_Student_ID_key" ON "Class_Student"("Student_ID");

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_Subject_ID_fkey" FOREIGN KEY ("Subject_ID") REFERENCES "Subject"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part" ADD CONSTRAINT "Part_Exam_ID_fkey" FOREIGN KEY ("Exam_ID") REFERENCES "Exam"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionGroup" ADD CONSTRAINT "QuestionGroup_Part_ID_fkey" FOREIGN KEY ("Part_ID") REFERENCES "Part"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_Group_ID_fkey" FOREIGN KEY ("Group_ID") REFERENCES "QuestionGroup"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_Question_ID_fkey" FOREIGN KEY ("Question_ID") REFERENCES "Question"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_User_ID_fkey" FOREIGN KEY ("User_ID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_Exam_ID_fkey" FOREIGN KEY ("Exam_ID") REFERENCES "Exam"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_Answer_ID_fkey" FOREIGN KEY ("Answer_ID") REFERENCES "Answer"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_User_ID_fkey" FOREIGN KEY ("User_ID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_Menu_ID_fkey" FOREIGN KEY ("Menu_ID") REFERENCES "Menu"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_Menu_ID_fkey" FOREIGN KEY ("Menu_ID") REFERENCES "Menu"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_User_ID_fkey" FOREIGN KEY ("User_ID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_User_ID_fkey" FOREIGN KEY ("User_ID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_User_ID_fkey" FOREIGN KEY ("User_ID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_ClassWeekday_ID_fkey" FOREIGN KEY ("ClassWeekday_ID") REFERENCES "Class_Weekday"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_Teacher_ID_fkey" FOREIGN KEY ("Teacher_ID") REFERENCES "Teacher"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_Course_ID_fkey" FOREIGN KEY ("Course_ID") REFERENCES "Course"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_Address_ID_fkey" FOREIGN KEY ("Address_ID") REFERENCES "Address"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class_Student" ADD CONSTRAINT "Class_Student_Class_ID_fkey" FOREIGN KEY ("Class_ID") REFERENCES "Classes"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class_Student" ADD CONSTRAINT "Class_Student_Student_ID_fkey" FOREIGN KEY ("Student_ID") REFERENCES "Student"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_Student_ID_fkey" FOREIGN KEY ("Student_ID") REFERENCES "Student"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_Staff_ID_fkey" FOREIGN KEY ("Staff_ID") REFERENCES "Staff"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_Class_ID_fkey" FOREIGN KEY ("Class_ID") REFERENCES "Classes"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_Course_ID_fkey" FOREIGN KEY ("Course_ID") REFERENCES "Course"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_User_ID_fkey" FOREIGN KEY ("User_ID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_Exam_ID_fkey" FOREIGN KEY ("Exam_ID") REFERENCES "Exam"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
