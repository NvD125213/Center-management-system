import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { validateRegister, validateLogin } from "../validates/authValidate";
import { handleValidation } from "../middlewares/handleValidation";

const router = Router();

router.post(
  "/register",
  validateRegister,
  handleValidation,
  AuthController.register
);

router.post("/login", validateLogin, handleValidation, AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/verify-otp", AuthController.verifyOtp);
router.post("/resendVerify-otp", AuthController.resendVerifyOtp);

export default router;
