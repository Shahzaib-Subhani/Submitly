import express from "express";
import { adminLogin, adminRegister } from "../controllers/admin/adminAuthController.js";
import { teamLogin, teamRegister } from "../controllers/admin/teamAuthController.js";
import { evaluatorLogin, evaluatorRegister } from "../controllers/admin/evaluatorAuthController.js";
import { forgotPasswordOTP, passwordReset, verifyOTP } from "../controllers/admin/generalAuthController.js";


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