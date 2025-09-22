import express from "express";
import { teamLogin, teamRegister } from "../controllers/teamAuthController.js";
import { evaluatorLogin, evaluatorRegister } from "../controllers/evaluatorAuthController.js";
import { adminLogin, adminRegister } from "../controllers/generalAuthController.js";

const router = express.Router();

// Admin Auth routes
router.post("/admin-register", adminRegister);
router.post("/admin-signin", adminLogin);

// Team Auth routes
router.post("/team-register", teamRegister);
router.post("/team-signin", teamLogin);

// Evaluator Auth routes
router.post("/evaluator-register", evaluatorRegister);
router.post("/evaluator-signin", evaluatorLogin);

export default router;