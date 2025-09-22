import express from "express";
import { teamLogin, teamRegister } from "../controllers/teamAuthController.js";
import { evaluatorLogin, evaluatorRegister } from "../controllers/evaluatorAuthController.js";

const router = express.Router();

// Team Auth routes
router.post("/team-register", teamRegister);
router.post("/team-signin", teamLogin);

// Evaluator Auth routes
router.post("/evaluator-register", evaluatorRegister);
router.post("/evaluator-signin", evaluatorLogin);

export default router;