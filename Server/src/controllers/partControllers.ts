// import { PrismaClient } from "@prisma/client";
// import { Request, Response } from "express";

// const prisma = new PrismaClient();

// interface PartType {
//   name: string;
//   subject_id: number;
// }

// export const PartController = {
//   get: async (req: Request, res: Response): Promise<any> => {
//     try {
//       const parts = await prisma.part.findMany({
//         where: {
//           deleted_at: null,
//         },
//       });

//       if (parts.length === 0) {
//         return res.status(200).json({
//           message: "Không có dữ liệu",
//         });
//       }

//       return res.status(200).json(parts);
//     } catch (err: any) {
//       return res.status(500).json({
//         error: err.message,
//       });
//     }
//   },

//   getByID: async (req: Request, res: Response): Promise<any> => {},

//   create: async (
//     req: Request<{}, {}, PartType>,
//     res: Response
//   ): Promise<any> => {
//     try {
//       const { name, subject_id } = req.body;

//       if (!name) {
//         return res.status(422).json({ error: "Name is required!" });
//       }

//       const existing = await prisma.part.findUnique({
//         where: { name },
//       });

//       if (existing && !existing.deleted_at) {
//         return res.status(409).json({
//           error: `${name} already exists!`,
//         });
//       }

//       if (!subject_id) {
//         return res.status(422).json({
//           error: "Subject id is required!",
//         });
//       } else {
//         if (!(await prisma.subject.findUnique({ where: { id: subject_id } }))) {
//           return res.status(404).json({
//             error: "Subject not found!",
//           });
//         }
//       }

//       const newExam = await prisma.exam.create({
//         data: req.body,
//       });

//       return res.status(201).json(newExam);
//     } catch (err: any) {
//       return res.status(500).json({ error: err.message });
//     }
//   },

//   update: async (req: Request, res: Response): Promise<any> => {
//     try {
//       const examId = Number(req.params.id);
//       const { name, subject_id } = req.body;

//       if (!name) {
//         return res.status(422).json({ error: "Name is required!" });
//       }

//       const exam = await prisma.exam.findUnique({ where: { id: examId } });

//       if (!exam || exam.deleted_at) {
//         return res.status(404).json({ error: "Exam not found!" });
//       }

//       const existingByName = await prisma.exam.findFirst({
//         where: {
//           name,
//           NOT: { id: examId },
//           deleted_at: null,
//         },
//       });

//       if (existingByName) {
//         return res.status(409).json({
//           error: `${name} already exists!`,
//         });
//       }

//       if (!subject_id) {
//         return res.status(422).json({
//           error: "Subject id is required!",
//         });
//       }

//       const subjectExists = await prisma.subject.findUnique({
//         where: { id: subject_id },
//       });

//       if (!subjectExists) {
//         return res.status(404).json({
//           error: "Subject not found!",
//         });
//       }

//       const updatedExam = await prisma.exam.update({
//         where: { id: examId },
//         data: {
//           name,
//           subject_id,
//         },
//       });

//       return res.status(200).json(updatedExam);
//     } catch (err: any) {
//       return res.status(500).json({ error: err.message });
//     }
//   },

//   delete: async (req: Request, res: Response): Promise<any> => {
//     try {
//       const examId = parseInt(req.params.id);
//       if (isNaN(examId)) {
//         return res.status(400).json({ error: "Invalid subject ID" });
//       }

//       const exam = await prisma.exam.findUnique({
//         where: { id: examId },
//       });

//       if (!exam) {
//         return res.status(404).json({ error: "Exam not found!" });
//       }

//       if (exam.deleted_at) {
//         return res.status(410).json({ error: "Exam already deleted!" });
//       }

//       const deletedSubject = await prisma.exam.update({
//         where: { id: examId },
//         data: { deleted_at: new Date() },
//       });

//       return res.status(200).json({
//         message: "Exam was deleted!",
//         data: deletedSubject,
//       });
//     } catch (err: any) {
//       return res.status(500).json({
//         error: err.message,
//       });
//     }
//   },
// };
