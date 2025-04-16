import { Router } from "express";
import { QuestionController } from "../controllers/questionController";

const router = Router();

router.get(
  "/getQuestionByPartAndExam",
  QuestionController.getQuestionByPartAndExam
);

export default router;
