import { Router } from "express";
import { ExamController } from "../controllers/examControllers";

const router = Router();

router.get("/", ExamController.get);
router.get("/:id", ExamController.getByID);
router.post("/", ExamController.create);
router.put("/:id", ExamController.update);
router.delete("/:id", ExamController.delete);

export default router;
