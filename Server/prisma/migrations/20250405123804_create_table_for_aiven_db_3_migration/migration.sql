/*
  Warnings:

  - The primary key for the `answers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Create_at` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `Question_ID` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `Selected_Option` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `Update_at` on the `answers` table. All the data in the column will be lost.
  - The primary key for the `blogs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Content` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `Create_at` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `Menu_ID` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `Update_at` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `User_ID` on the `blogs` table. All the data in the column will be lost.
  - The primary key for the `class_students` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Class_ID` on the `class_students` table. All the data in the column will be lost.
  - You are about to drop the column `Create_at` on the `class_students` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `class_students` table. All the data in the column will be lost.
  - You are about to drop the column `Student_ID` on the `class_students` table. All the data in the column will be lost.
  - You are about to drop the column `Update_at` on the `class_students` table. All the data in the column will be lost.
  - The primary key for the `class_weekdays` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Create_at` on the `class_weekdays` table. All the data in the column will be lost.
  - You are about to drop the column `Hours` on the `class_weekdays` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `class_weekdays` table. All the data in the column will be lost.
  - You are about to drop the column `Update_at` on the `class_weekdays` table. All the data in the column will be lost.
  - You are about to drop the column `Week_Day` on the `class_weekdays` table. All the data in the column will be lost.
  - The primary key for the `classes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Address_ID` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `ClassWeekday_ID` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `Course_ID` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `Create_at` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `Start_Date` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `Start_End` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `Teacher_ID` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `Update_at` on the `classes` table. All the data in the column will be lost.
  - The primary key for the `comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Content` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `Create_at` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `Exam_ID` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `Parent_ID` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `Update_at` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `User_ID` on the `comments` table. All the data in the column will be lost.
  - The primary key for the `consultations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Course_ID` on the `consultations` table. All the data in the column will be lost.
  - You are about to drop the column `Create_at` on the `consultations` table. All the data in the column will be lost.
  - You are about to drop the column `Date` on the `consultations` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `consultations` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `consultations` table. All the data in the column will be lost.
  - You are about to drop the column `Level` on the `consultations` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `consultations` table. All the data in the column will be lost.
  - You are about to drop the column `School` on the `consultations` table. All the data in the column will be lost.
  - You are about to drop the column `Target` on the `consultations` table. All the data in the column will be lost.
  - The primary key for the `courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Create_at` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `Currency` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `Lessons` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `Level` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `Menu_ID` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `Price` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `Term` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `Update_at` on the `courses` table. All the data in the column will be lost.
  - The primary key for the `exams` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Create_at` on the `exams` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `exams` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `exams` table. All the data in the column will be lost.
  - You are about to drop the column `Subject_ID` on the `exams` table. All the data in the column will be lost.
  - You are about to drop the column `Update_at` on the `exams` table. All the data in the column will be lost.
  - The primary key for the `historys` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Answer_ID` on the `historys` table. All the data in the column will be lost.
  - You are about to drop the column `Corect_Answer` on the `historys` table. All the data in the column will be lost.
  - You are about to drop the column `Create_at` on the `historys` table. All the data in the column will be lost.
  - You are about to drop the column `Exam_ID` on the `historys` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `historys` table. All the data in the column will be lost.
  - You are about to drop the column `Total_Score` on the `historys` table. All the data in the column will be lost.
  - You are about to drop the column `Update_at` on the `historys` table. All the data in the column will be lost.
  - You are about to drop the column `User_ID` on the `historys` table. All the data in the column will be lost.
  - The primary key for the `menus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Create_at` on the `menus` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `menus` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `menus` table. All the data in the column will be lost.
  - You are about to drop the column `Parent_ID` on the `menus` table. All the data in the column will be lost.
  - You are about to drop the column `Sort` on the `menus` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `menus` table. All the data in the column will be lost.
  - You are about to drop the column `Update_at` on the `menus` table. All the data in the column will be lost.
  - The primary key for the `parts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Create_at` on the `parts` table. All the data in the column will be lost.
  - You are about to drop the column `Exam_ID` on the `parts` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `parts` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `parts` table. All the data in the column will be lost.
  - You are about to drop the column `Order` on the `parts` table. All the data in the column will be lost.
  - You are about to drop the column `Update_at` on the `parts` table. All the data in the column will be lost.
  - The primary key for the `payments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Class_ID` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `Create_at` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `Payment_Date` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `Payment_Method` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `Staff_ID` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `Student_ID` on the `payments` table. All the data in the column will be lost.
  - The primary key for the `question_groups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Create_at` on the `question_groups` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `question_groups` table. All the data in the column will be lost.
  - You are about to drop the column `Element` on the `question_groups` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `question_groups` table. All the data in the column will be lost.
  - You are about to drop the column `Part_ID` on the `question_groups` table. All the data in the column will be lost.
  - You are about to drop the column `Update_at` on the `question_groups` table. All the data in the column will be lost.
  - The primary key for the `questions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AnswerCorrect` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `Create_at` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `Group_ID` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `Option` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `Score` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `Update_at` on the `questions` table. All the data in the column will be lost.
  - The primary key for the `staffs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Create_at` on the `staffs` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `staffs` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `staffs` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `staffs` table. All the data in the column will be lost.
  - You are about to drop the column `Phone` on the `staffs` table. All the data in the column will be lost.
  - You are about to drop the column `Photo` on the `staffs` table. All the data in the column will be lost.
  - You are about to drop the column `Position` on the `staffs` table. All the data in the column will be lost.
  - You are about to drop the column `Update_at` on the `staffs` table. All the data in the column will be lost.
  - You are about to drop the column `User_ID` on the `staffs` table. All the data in the column will be lost.
  - The primary key for the `student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Birth` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `City` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `Create_at` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `Phone` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `State` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `Street` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `Update_at` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `User_ID` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `Zip_code` on the `student` table. All the data in the column will be lost.
  - The primary key for the `subjects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Create_at` on the `subjects` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `subjects` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `subjects` table. All the data in the column will be lost.
  - You are about to drop the column `Update_at` on the `subjects` table. All the data in the column will be lost.
  - The primary key for the `teachers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Create_at` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `Phone` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `Photo` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `Update_at` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `User_ID` on the `teachers` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Create_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `Full_Name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `PhoneNumber` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `Role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `Update_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_Active` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `blogs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[menu_id]` on the table `blogs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[class_id]` on the table `class_students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[student_id]` on the table `class_students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[menu_id]` on the table `courses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `exams` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `historys` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[exam_id]` on the table `historys` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[answer_id]` on the table `historys` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `menus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sort]` on the table `menus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[exam_id]` on the table `parts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[answer_correct]` on the table `questions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `staffs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `subjects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `teachers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `question_id` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selected_option` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menu_id` to the `blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_id` to the `class_students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `class_students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `class_students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hours` to the `class_weekdays` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `class_weekdays` table without a default value. This is not possible if the table is not empty.
  - Added the required column `week_day` to the `class_weekdays` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_id` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_weekday_id` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_id` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_end` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exam_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_id` to the `consultations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `consultations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `consultations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `consultations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lessons` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menu_id` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `term` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `exams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject_id` to the `exams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `exams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answer_id` to the `historys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correct_answer` to the `historys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exam_id` to the `historys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_score` to the `historys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `historys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `historys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sort` to the `menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `menus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exam_id` to the `parts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `parts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `parts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `parts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_id` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_date` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staff_id` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `question_groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `element` to the `question_groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `part_id` to the `question_groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `question_groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `answer_correct` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `group_id` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `staffs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `staffs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `staffs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `staffs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `staffs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `staffs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `staffs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `teachers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_Question_ID_fkey";

-- DropForeignKey
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_Menu_ID_fkey";

-- DropForeignKey
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_User_ID_fkey";

-- DropForeignKey
ALTER TABLE "class_students" DROP CONSTRAINT "class_students_Class_ID_fkey";

-- DropForeignKey
ALTER TABLE "class_students" DROP CONSTRAINT "class_students_Student_ID_fkey";

-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_Address_ID_fkey";

-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_ClassWeekday_ID_fkey";

-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_Course_ID_fkey";

-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_Teacher_ID_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_Exam_ID_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_User_ID_fkey";

-- DropForeignKey
ALTER TABLE "consultations" DROP CONSTRAINT "consultations_Course_ID_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_Menu_ID_fkey";

-- DropForeignKey
ALTER TABLE "exams" DROP CONSTRAINT "exams_Subject_ID_fkey";

-- DropForeignKey
ALTER TABLE "historys" DROP CONSTRAINT "historys_Answer_ID_fkey";

-- DropForeignKey
ALTER TABLE "historys" DROP CONSTRAINT "historys_Exam_ID_fkey";

-- DropForeignKey
ALTER TABLE "historys" DROP CONSTRAINT "historys_User_ID_fkey";

-- DropForeignKey
ALTER TABLE "parts" DROP CONSTRAINT "parts_Exam_ID_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_Class_ID_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_Staff_ID_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_Student_ID_fkey";

-- DropForeignKey
ALTER TABLE "question_groups" DROP CONSTRAINT "question_groups_Part_ID_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_Group_ID_fkey";

-- DropForeignKey
ALTER TABLE "staffs" DROP CONSTRAINT "staffs_User_ID_fkey";

-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_User_ID_fkey";

-- DropForeignKey
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_User_ID_fkey";

-- DropIndex
DROP INDEX "blogs_Menu_ID_key";

-- DropIndex
DROP INDEX "blogs_User_ID_key";

-- DropIndex
DROP INDEX "class_students_Class_ID_key";

-- DropIndex
DROP INDEX "class_students_Student_ID_key";

-- DropIndex
DROP INDEX "courses_Menu_ID_key";

-- DropIndex
DROP INDEX "exams_Name_key";

-- DropIndex
DROP INDEX "historys_Answer_ID_key";

-- DropIndex
DROP INDEX "historys_Exam_ID_key";

-- DropIndex
DROP INDEX "historys_User_ID_key";

-- DropIndex
DROP INDEX "menus_Name_key";

-- DropIndex
DROP INDEX "menus_Sort_key";

-- DropIndex
DROP INDEX "parts_Exam_ID_key";

-- DropIndex
DROP INDEX "questions_AnswerCorrect_key";

-- DropIndex
DROP INDEX "staffs_User_ID_key";

-- DropIndex
DROP INDEX "subjects_Name_key";

-- DropIndex
DROP INDEX "teachers_User_ID_key";

-- DropIndex
DROP INDEX "users_Email_idx";

-- DropIndex
DROP INDEX "users_Email_key";

-- DropIndex
DROP INDEX "users_PhoneNumber_key";

-- AlterTable
ALTER TABLE "answers" DROP CONSTRAINT "answers_pkey",
DROP COLUMN "Create_at",
DROP COLUMN "ID",
DROP COLUMN "Question_ID",
DROP COLUMN "Selected_Option",
DROP COLUMN "Update_at",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "question_id" INTEGER NOT NULL,
ADD COLUMN     "selected_option" TEXT NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "answers_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_pkey",
DROP COLUMN "Content",
DROP COLUMN "Create_at",
DROP COLUMN "ID",
DROP COLUMN "Menu_ID",
DROP COLUMN "Status",
DROP COLUMN "Title",
DROP COLUMN "Update_at",
DROP COLUMN "User_ID",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "menu_id" INTEGER NOT NULL,
ADD COLUMN     "status" "MenuStatus" NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "blogs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "class_students" DROP CONSTRAINT "class_students_pkey",
DROP COLUMN "Class_ID",
DROP COLUMN "Create_at",
DROP COLUMN "ID",
DROP COLUMN "Student_ID",
DROP COLUMN "Update_at",
ADD COLUMN     "class_id" INTEGER NOT NULL,
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "student_id" INTEGER NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "class_students_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "class_weekdays" DROP CONSTRAINT "class_weekdays_pkey",
DROP COLUMN "Create_at",
DROP COLUMN "Hours",
DROP COLUMN "ID",
DROP COLUMN "Update_at",
DROP COLUMN "Week_Day",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hours" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "week_day" INTEGER NOT NULL,
ADD CONSTRAINT "class_weekdays_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "classes" DROP CONSTRAINT "classes_pkey",
DROP COLUMN "Address_ID",
DROP COLUMN "ClassWeekday_ID",
DROP COLUMN "Course_ID",
DROP COLUMN "Create_at",
DROP COLUMN "ID",
DROP COLUMN "Name",
DROP COLUMN "Start_Date",
DROP COLUMN "Start_End",
DROP COLUMN "Teacher_ID",
DROP COLUMN "Update_at",
ADD COLUMN     "address_id" INTEGER NOT NULL,
ADD COLUMN     "class_weekday_id" INTEGER NOT NULL,
ADD COLUMN     "course_id" INTEGER NOT NULL,
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "teacher_id" INTEGER NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "classes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "comments" DROP CONSTRAINT "comments_pkey",
DROP COLUMN "Content",
DROP COLUMN "Create_at",
DROP COLUMN "Exam_ID",
DROP COLUMN "ID",
DROP COLUMN "Parent_ID",
DROP COLUMN "Status",
DROP COLUMN "Update_at",
DROP COLUMN "User_ID",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "exam_id" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "parent_id" INTEGER,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "consultations" DROP CONSTRAINT "consultations_pkey",
DROP COLUMN "Course_ID",
DROP COLUMN "Create_at",
DROP COLUMN "Date",
DROP COLUMN "Email",
DROP COLUMN "ID",
DROP COLUMN "Level",
DROP COLUMN "Name",
DROP COLUMN "School",
DROP COLUMN "Target",
ADD COLUMN     "course_id" INTEGER NOT NULL,
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD CONSTRAINT "consultations_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "courses" DROP CONSTRAINT "courses_pkey",
DROP COLUMN "Create_at",
DROP COLUMN "Currency",
DROP COLUMN "Description",
DROP COLUMN "ID",
DROP COLUMN "Lessons",
DROP COLUMN "Level",
DROP COLUMN "Menu_ID",
DROP COLUMN "Price",
DROP COLUMN "Term",
DROP COLUMN "Update_at",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currency" VARCHAR(3) NOT NULL DEFAULT 'VND',
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "lessons" INTEGER NOT NULL,
ADD COLUMN     "level" "Level" NOT NULL,
ADD COLUMN     "menu_id" INTEGER NOT NULL,
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "term" INTEGER NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "courses_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "exams" DROP CONSTRAINT "exams_pkey",
DROP COLUMN "Create_at",
DROP COLUMN "ID",
DROP COLUMN "Name",
DROP COLUMN "Subject_ID",
DROP COLUMN "Update_at",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "subject_id" INTEGER NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "exams_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "historys" DROP CONSTRAINT "historys_pkey",
DROP COLUMN "Answer_ID",
DROP COLUMN "Corect_Answer",
DROP COLUMN "Create_at",
DROP COLUMN "Exam_ID",
DROP COLUMN "ID",
DROP COLUMN "Total_Score",
DROP COLUMN "Update_at",
DROP COLUMN "User_ID",
ADD COLUMN     "answer_id" INTEGER NOT NULL,
ADD COLUMN     "correct_answer" INTEGER NOT NULL,
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "exam_id" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "total_score" INTEGER NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "historys_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "menus" DROP CONSTRAINT "menus_pkey",
DROP COLUMN "Create_at",
DROP COLUMN "ID",
DROP COLUMN "Name",
DROP COLUMN "Parent_ID",
DROP COLUMN "Sort",
DROP COLUMN "Status",
DROP COLUMN "Update_at",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "parent_id" INTEGER,
ADD COLUMN     "sort" INTEGER NOT NULL,
ADD COLUMN     "status" "MenuStatus" NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "menus_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "parts" DROP CONSTRAINT "parts_pkey",
DROP COLUMN "Create_at",
DROP COLUMN "Exam_ID",
DROP COLUMN "ID",
DROP COLUMN "Name",
DROP COLUMN "Order",
DROP COLUMN "Update_at",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "exam_id" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "parts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "payments" DROP CONSTRAINT "payments_pkey",
DROP COLUMN "Class_ID",
DROP COLUMN "Create_at",
DROP COLUMN "ID",
DROP COLUMN "Payment_Date",
DROP COLUMN "Payment_Method",
DROP COLUMN "Staff_ID",
DROP COLUMN "Status",
DROP COLUMN "Student_ID",
ADD COLUMN     "class_id" INTEGER NOT NULL,
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "payment_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "payment_method" "PaymentMethod" NOT NULL,
ADD COLUMN     "staff_id" INTEGER NOT NULL,
ADD COLUMN     "status" "PaymentStatus" NOT NULL,
ADD COLUMN     "student_id" INTEGER NOT NULL,
ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "question_groups" DROP CONSTRAINT "question_groups_pkey",
DROP COLUMN "Create_at",
DROP COLUMN "Description",
DROP COLUMN "Element",
DROP COLUMN "ID",
DROP COLUMN "Part_ID",
DROP COLUMN "Update_at",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "element" "Element" NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "part_id" INTEGER NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "question_groups_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "questions" DROP CONSTRAINT "questions_pkey",
DROP COLUMN "AnswerCorrect",
DROP COLUMN "Create_at",
DROP COLUMN "Group_ID",
DROP COLUMN "ID",
DROP COLUMN "Option",
DROP COLUMN "Score",
DROP COLUMN "Update_at",
ADD COLUMN     "answer_correct" TEXT NOT NULL,
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "group_id" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "option" "Option" NOT NULL,
ADD COLUMN     "score" INTEGER NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "questions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "staffs" DROP CONSTRAINT "staffs_pkey",
DROP COLUMN "Create_at",
DROP COLUMN "Email",
DROP COLUMN "ID",
DROP COLUMN "Name",
DROP COLUMN "Phone",
DROP COLUMN "Photo",
DROP COLUMN "Position",
DROP COLUMN "Update_at",
DROP COLUMN "User_ID",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL,
ADD COLUMN     "position" TEXT NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "staffs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "student" DROP CONSTRAINT "student_pkey",
DROP COLUMN "Birth",
DROP COLUMN "City",
DROP COLUMN "Create_at",
DROP COLUMN "Email",
DROP COLUMN "ID",
DROP COLUMN "Name",
DROP COLUMN "Phone",
DROP COLUMN "State",
DROP COLUMN "Street",
DROP COLUMN "Update_at",
DROP COLUMN "User_ID",
DROP COLUMN "Zip_code",
ADD COLUMN     "birth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD COLUMN     "zip_code" TEXT NOT NULL,
ADD CONSTRAINT "student_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_pkey",
DROP COLUMN "Create_at",
DROP COLUMN "ID",
DROP COLUMN "Name",
DROP COLUMN "Update_at",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "subjects_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_pkey",
DROP COLUMN "Create_at",
DROP COLUMN "Description",
DROP COLUMN "Email",
DROP COLUMN "ID",
DROP COLUMN "Name",
DROP COLUMN "Phone",
DROP COLUMN "Photo",
DROP COLUMN "Update_at",
DROP COLUMN "User_ID",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "teachers_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "Create_at",
DROP COLUMN "Email",
DROP COLUMN "Full_Name",
DROP COLUMN "ID",
DROP COLUMN "Password",
DROP COLUMN "PhoneNumber",
DROP COLUMN "Role",
DROP COLUMN "Update_at",
DROP COLUMN "is_Active",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "full_name" TEXT,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "password" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "phone_number" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "role" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "address";

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "province" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "ward" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blogs_user_id_key" ON "blogs"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "blogs_menu_id_key" ON "blogs"("menu_id");

-- CreateIndex
CREATE UNIQUE INDEX "class_students_class_id_key" ON "class_students"("class_id");

-- CreateIndex
CREATE UNIQUE INDEX "class_students_student_id_key" ON "class_students"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "courses_menu_id_key" ON "courses"("menu_id");

-- CreateIndex
CREATE UNIQUE INDEX "exams_name_key" ON "exams"("name");

-- CreateIndex
CREATE UNIQUE INDEX "historys_user_id_key" ON "historys"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "historys_exam_id_key" ON "historys"("exam_id");

-- CreateIndex
CREATE UNIQUE INDEX "historys_answer_id_key" ON "historys"("answer_id");

-- CreateIndex
CREATE UNIQUE INDEX "menus_name_key" ON "menus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "menus_sort_key" ON "menus"("sort");

-- CreateIndex
CREATE UNIQUE INDEX "parts_exam_id_key" ON "parts"("exam_id");

-- CreateIndex
CREATE UNIQUE INDEX "questions_answer_correct_key" ON "questions"("answer_correct");

-- CreateIndex
CREATE UNIQUE INDEX "staffs_user_id_key" ON "staffs"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_name_key" ON "subjects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_user_id_key" ON "teachers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- AddForeignKey
ALTER TABLE "exams" ADD CONSTRAINT "exams_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parts" ADD CONSTRAINT "parts_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_groups" ADD CONSTRAINT "question_groups_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "question_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historys" ADD CONSTRAINT "historys_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historys" ADD CONSTRAINT "historys_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historys" ADD CONSTRAINT "historys_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffs" ADD CONSTRAINT "staffs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_class_weekday_id_fkey" FOREIGN KEY ("class_weekday_id") REFERENCES "class_weekdays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_students" ADD CONSTRAINT "class_students_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_students" ADD CONSTRAINT "class_students_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
