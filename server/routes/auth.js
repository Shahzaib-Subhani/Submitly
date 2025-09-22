import express from "express";
import { adminLogin, adminRegister } from "../controllers/auth/adminAuthController.js";
import { teamLogin, teamRegister } from "../controllers/auth/teamAuthController.js";
import { evaluatorLogin, evaluatorRegister } from "../controllers/auth/evaluatorAuthController.js";
import { forgotPasswordOTP, passwordReset, verifyOTP } from "../controllers/auth/generalAuthController.js";


const router = express.Router();

// Admin Auth routes
router.post("/admin/register", adminRegister);
router.post("/admin/signin", adminLogin);

// Team Auth routes
router.post("/team/register", teamRegister);
router.post("/team/signin", teamLogin);

// Evaluator Auth routes
router.post("/evaluator/register", evaluatorRegister);
router.post("/evaluator/signin", evaluatorLogin);

// General Auth routes
router.post("/forgot-password", forgotPasswordOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", passwordReset);


export default router;