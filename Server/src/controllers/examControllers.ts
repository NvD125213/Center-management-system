import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface ExamType {
  name: string;
  subject_id: number;
}

export const ExamController = {
  get: async (req: Request, res: Response): Promise<any> => {
    try {
      const exams = await prisma.exam.findMany({
        where: {
          deleted_at: null,
        },
      });

      if (exams.length === 0) {
        return res.status(200).json({
          message: "Không có dữ liệu",
        });
      }

      return res.status(200).json(exams);
    } catch (err: any) {
      return res.status(500).json({
        error: err.message,
      });
    }
  },

  getByID: async (req: Request, res: Response): Promise<any> => {},

  create: async (
    req: Request<{}, {}, ExamType>,
    res: Response
  ): Promise<any> => {
    try {
      const { subject_id, name } = req.body;

      if (!subject_id || !name) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const existingName = await prisma.exam.findUnique({
        where: {
          name: name,
        },
      });

      if (existingName) {
        return res.status(409).json({
          message: "Exam already exists",
        });
      }
      // 1. Tạo Exam
      const newExam = await prisma.exam.create({
        data: {
          subject_id: Number(subject_id),
          name,
        },
      });

      // 2. Lấy tất cả các Part còn hoạt động (chưa bị soft-delete)
      const parts = await prisma.part.findMany({
        where: {
          deleted_at: null,
        },
      });

      // 3. Tạo các ExamPart tương ứng
      const examPartsData = parts.map((part) => ({
        exam_id: newExam.id,
        part_id: part.id,
      }));

      await prisma.examPart.createMany({
        data: examPartsData,
        skipDuplicates: true, // để tránh lỗi nếu có dữ liệu trùng
      });

      return res.status(201).json({
        message: "Exam created successfully.",
        exam: newExam,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },

  update: async (req: Request, res: Response): Promise<any> => {
    try {
      const examId = Number(req.params.id);
      const { name, subject_id } = req.body;

      if (!name) {
        return res.status(422).json({ error: "Name is required!" });
      }

      const exam = await prisma.exam.findUnique({ where: { id: examId } });

      if (!exam || exam.deleted_at) {
        return res.status(404).json({ error: "Exam not found!" });
      }

      const existingByName = await prisma.exam.findFirst({
        where: {
          name,
          NOT: { id: examId },
          deleted_at: null,
        },
      });

      if (existingByName) {
        return res.status(409).json({
          error: `${name} already exists!`,
        });
      }

      if (!subject_id) {
        return res.status(422).json({
          error: "Subject id is required!",
        });
      }

      const subjectExists = await prisma.subject.findUnique({
        where: { id: subject_id },
      });

      if (!subjectExists) {
        return res.status(404).json({
          error: "Subject not found!",
        });
      }

      const updatedExam = await prisma.exam.update({
        where: { id: examId },
        data: {
          name,
          subject_id,
        },
      });

      return res.status(200).json(updatedExam);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },

  delete: async (req: Request, res: Response): Promise<any> => {
    try {
      const examId = parseInt(req.params.id);
      if (isNaN(examId)) {
        return res.status(400).json({ error: "Invalid subject ID" });
      }

      const exam = await prisma.exam.findUnique({
        where: { id: examId },
      });

      if (!exam) {
        return res.status(404).json({ error: "Exam not found!" });
      }

      if (exam.deleted_at) {
        return res.status(410).json({ error: "Exam already deleted!" });
      }

      const deletedSubject = await prisma.exam.update({
        where: { id: examId },
        data: { deleted_at: new Date() },
      });

      return res.status(200).json({
        message: "Exam was deleted!",
        data: deletedSubject,
      });
    } catch (err: any) {
      return res.status(500).json({
        error: err.message,
      });
    }
  },
};
