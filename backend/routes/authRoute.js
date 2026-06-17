import express from "express";
import { login, signup,logout,verifyEmail,refreshToken,forgotPassword,resetPassword} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login",login);
router.post("/signup",signup);
router.post("/logout",authMiddleware,logout);
router.post("/refreshToken",refreshToken);
router.get("/verifyEmail",verifyEmail);
router.post("/forgotPassword",forgotPassword);
router.post("/resetPassword",resetPassword);
export default router;