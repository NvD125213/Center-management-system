import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface GroupQuestionType {}

export const QuestionController = {
  getQuestionByPartAndExam: async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { exam_id, part_id } = req.query;

    if (!exam_id || !part_id) {
      return res.status(400).json({
        error: "Exam or part is required!",
      });
    }
    try {
      const examPart = await prisma.examPart.findUnique({
        where: {
          exam_id_part_id: {
            exam_id: Number(exam_id),
            part_id: Number(part_id),
          },
        },
      });

      if (!examPart) {
        return res.status(404).json({
          error: "Exam or part not found!",
        });
      } else {
        const groupQuestions = await prisma.questionGroup.findMany({
          where: {
            part_id: Number(part_id),
          },
          include: {
            questions: {
              where: {
                deleted_at: null,
              },
            },
          },
        });

        return res.status(200).json({
          exam_id: exam_id,
          part_id: part_id,
          data: groupQuestions,
        });
      }
    } catch (err: any) {
      return res.status(500).json({
        message: err.message,
      });
    }
  },

  create: async (
    req: Request<{}, {}, GroupQuestionType>,
    res: Response
  ): Promise<any> => {},

  update: async (req: Request, res: Response): Promise<any> => {},

  delete: async (req: Request, res: Response): Promise<any> => {},
};
