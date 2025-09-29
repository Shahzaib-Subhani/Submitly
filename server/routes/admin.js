import express from "express";
import { authenticateUser, authorizeRole } from "../middlewares/authMiddleware.js";
import { deleteTeam, getAllTeams, getTeamById, updateTeam } from "../controllers/admin/teamsController.js";
import { addTeamMember, deleteTeamMember, getAllTeamMembers, updateTeamMember } from "../controllers/admin/teamMemberController.js";
import { deleteEvaluator, fetchEvaluators, getAllEvaluators, getEvaluatorById, updateEvaluator, verifyEvaluator } from "../controllers/admin/evaluatorController.js";
import { assignEvaluator, deleteSubmission, getAllSubmissions, getSubmissionById } from "../controllers/admin/submissionController.js";
import { setDeadline } from "../controllers/admin/deadlineController.js";

const router = express.Router();

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

// deadline route
router.post("/deadline", authenticateUser, authorizeRole("admin"), setDeadline);

export default router;