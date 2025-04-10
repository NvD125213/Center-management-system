import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface SubjectType {
  name: string;
}

export const SubjectController = {
  get: async (req: Request, res: Response): Promise<any> => {
    try {
      const subjects = await prisma.subject.findMany({
        where: {
          deleted_at: null, // Chỉ lấy các subject chưa bị xoá
        },
      });

      if (subjects.length === 0) {
        return res.status(200).json({
          message: "Không có dữ liệu",
        });
      }

      return res.status(200).json(subjects);
    } catch (err: any) {
      return res.status(500).json({
        error: err.message,
      });
    }
  },

  getByID: async (req: Request, res: Response): Promise<any> => {
    const subjectId = parseInt(req.params.id);
    if (isNaN(subjectId)) {
      return res.status(400).json({ error: "Invalid subject ID" });
    }

    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
    });

    if (!subject || subject.deleted_at) {
      return res.status(404).json({ error: "Subject not found!" });
    }

    return res.status(200).json(subject);
  },

  create: async (
    req: Request<{}, {}, SubjectType>,
    res: Response
  ): Promise<any> => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(422).json({ error: "Name is required!" });
      }

      const existing = await prisma.subject.findUnique({
        where: { name },
      });

      if (existing && !existing.deleted_at) {
        return res.status(409).json({
          error: `${name} already exists!`,
        });
      }

      const subject = await prisma.subject.create({
        data: {
          name,
        },
      });

      return res.status(201).json(subject);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },

  update: async (req: Request, res: Response): Promise<any> => {
    const subjectId = parseInt(req.params.id);
    const { name } = req.body;

    if (isNaN(subjectId)) {
      return res.status(400).json({ error: "Invalid subject ID" });
    }

    const existingSubject = await prisma.subject.findUnique({
      where: { id: subjectId },
    });

    if (!existingSubject || existingSubject.deleted_at) {
      return res.status(404).json({ error: "Subject not found!" });
    }

    if (!name) {
      return res.status(422).json({ error: "Name is required!" });
    }

    const duplicateName = await prisma.subject.findUnique({ where: { name } });
    if (duplicateName && duplicateName.id !== subjectId) {
      return res.status(409).json({ error: `${name} already exists!` });
    }

    const updatedSubject = await prisma.subject.update({
      where: { id: subjectId },
      data: { name },
    });

    return res.status(200).json(updatedSubject);
  },

  delete: async (req: Request, res: Response): Promise<any> => {
    try {
      const subjectId = parseInt(req.params.id);
      if (isNaN(subjectId)) {
        return res.status(400).json({ error: "Invalid subject ID" });
      }

      const subject = await prisma.subject.findUnique({
        where: { id: subjectId },
      });

      if (!subject) {
        return res.status(404).json({ error: "Subject not found!" });
      }

      if (subject.deleted_at) {
        return res.status(410).json({ error: "Subject already deleted!" });
      }

      const deletedSubject = await prisma.subject.update({
        where: { id: subjectId },
        data: { deleted_at: new Date() },
      });

      return res.status(200).json({
        message: "Subject was deleted!",
        data: deletedSubject,
      });
    } catch (err: any) {
      return res.status(500).json({
        error: err.message,
      });
    }
  },
};
