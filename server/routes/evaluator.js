import express from "express";
import { authenticateUser, authorizeRole, authorizeSelf } from "../middlewares/authMiddleware.js";
import { evaluateSubmission, getAllSubmissionsForEvaluator, getSubmissionById } from "../controllers/evaluator/submissionController.js";
import { getAllEvaluationsForEvaluator, getEvaluationById } from "../controllers/evaluator/evaluationController.js";
import { getEvaluatorProfile, updateEvaluator, updatePassword } from "../controllers/evaluator/profileController.js";
import { fetchDashboardData } from "../controllers/evaluator/dashboardController.js";


const router = express.Router();

// Dashboard
router.get("/dashboard", authenticateUser, authorizeRole("evaluator"), fetchDashboardData);

// Submissions
router.get("/submissions/:submissionID/evaluate/:evaluatorID", authenticateUser, authorizeRole("evaluator"), authorizeSelf("evaluator"), getSubmissionById);
router.get("/submissions/:evaluatorID", authenticateUser, authorizeRole("evaluator"), authorizeSelf("evaluator"), getAllSubmissionsForEvaluator);
router.post("/submission/:submissionID/evaluate", authenticateUser, authorizeRole("evaluator"), authorizeSelf("evaluator"), evaluateSubmission);

// Evaluations
router.get("/evaluations/:evaluationID/evaluator/:evaluatorID", authenticateUser, authorizeRole("evaluator"), authorizeSelf("evaluator"), getEvaluationById);
router.get("/evaluations/:evaluatorID", authenticateUser, authorizeRole("evaluator"), authorizeSelf("evaluator"), getAllEvaluationsForEvaluator);

// Profile
router.post("/profile/:evaluatorID/update", authenticateUser, authorizeRole("evaluator"), authorizeSelf("evaluator"), updateEvaluator);
router.post("/profile/:evaluatorID/password-update", authenticateUser, authorizeRole("evaluator"), authorizeSelf("evaluator"), updatePassword);
router.get("/profile/:evaluatorID", authenticateUser, authorizeRole("evaluator"), authorizeSelf("evaluator"), getEvaluatorProfile);


export default router;
