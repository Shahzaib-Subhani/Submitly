import express from "express";
import { authenticateUser, authorizeRole } from "../middlewares/authMiddleware.js";
import { deleteTeam, getAllTeams, getTeamById, updateTeam } from "../controllers/admin/teamsController.js";
import { addTeamMember, deleteTeamMember, getAllTeamMembers, updateTeamMember } from "../controllers/admin/teamMemberController.js";
import { deleteEvaluator, fetchEvaluators, getAllEvaluators, getEvaluatorById, updateEvaluator, verifyEvaluator } from "../controllers/admin/evaluatorController.js";
import { assignEvaluator, deleteSubmission, getAllSubmissions, getSubmissionById } from "../controllers/admin/submissionController.js";
import { fetchDeadline, setDeadline } from "../controllers/admin/deadlineController.js";
import { getAdminProfile, updateAdmin, updatePassword } from "../controllers/admin/profileController.js";
import { getAllEvaluations, getEvaluationById } from "../controllers/admin/evaluationController.js";
import { getLeaderboard } from "../controllers/admin/leaderboardController.js";
import { fetchDashboardData } from "../controllers/admin/dashboardController.js";

const router = express.Router();

// dashboard
router.get("/dashboard", authenticateUser, authorizeRole("admin"), fetchDashboardData);

// Team Routes
router.get("/teams", authenticateUser, authorizeRole("admin"), getAllTeams);
router.get("/teams/:teamID", authenticateUser, authorizeRole("admin"), getTeamById);
router.patch("/teams/:teamID", authenticateUser, authorizeRole("admin"), updateTeam);
router.delete("/teams/:teamID", authenticateUser, authorizeRole("admin"), deleteTeam);

// Team Member Routes
router.get("/teams/:teamID/members", authenticateUser, authorizeRole("admin"), getAllTeamMembers);
router.post("/teams/:teamID/members", authenticateUser, authorizeRole("admin"), addTeamMember);
router.patch("/teams/:teamID/members/:memberID", authenticateUser, authorizeRole("admin"), updateTeamMember);
router.delete("/teams/:teamID/members/:memberID", authenticateUser, authorizeRole("admin"), deleteTeamMember);

// Evaluator Routes
router.get("/evaluators", authenticateUser, authorizeRole("admin"), getAllEvaluators);
router.get("/evaluators/:evaluatorID", authenticateUser, authorizeRole("admin"), getEvaluatorById);
router.get("/evaluators/list/name", authenticateUser, authorizeRole("admin"), fetchEvaluators);
router.patch("/evaluators/:evaluatorID", authenticateUser, authorizeRole("admin"), updateEvaluator);
router.patch("/evaluators/:evaluatorID/verify", authenticateUser, authorizeRole("admin"), verifyEvaluator);
router.delete("/evaluators/:evaluatorID", authenticateUser, authorizeRole("admin"), deleteEvaluator);

// Submission Routes
router.get("/submissions", authenticateUser, authorizeRole("admin"), getAllSubmissions);
router.get("/submissions/:submissionID", authenticateUser, authorizeRole("admin"), getSubmissionById);
router.patch("/submissions/:submissionID/assign-evaluators", authenticateUser, authorizeRole("admin"), assignEvaluator);
router.delete("/submissions/:submissionID", authenticateUser, authorizeRole("admin"), deleteSubmission);

// Evaluations
router.get("/evaluations/:evaluationID", authenticateUser, authorizeRole("admin"), getEvaluationById);
router.get("/evaluations", authenticateUser, authorizeRole("admin"), getAllEvaluations);

// deadline route
router.post("/deadline", authenticateUser, authorizeRole("admin"), setDeadline);
router.get("/deadline", authenticateUser, authorizeRole("admin"), fetchDeadline);

// Profile
router.post("/profile/:adminID/update", authenticateUser, authorizeRole("admin"), updateAdmin);
router.post("/profile/:adminID/password-update", authenticateUser, authorizeRole("admin"), updatePassword);
router.get("/profile/:adminID", authenticateUser, authorizeRole("admin"), getAdminProfile);

export default router;