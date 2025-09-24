import express from "express";
import { authenticateUser, authorizeRole } from "../middlewares/authMiddleware.js";
import { deleteTeam, getAllTeams, getTeamById, updateTeam } from "../controllers/admin/teamsController.js";
import { addTeamMember, deleteTeamMember, getAllTeamMembers, updateTeamMember } from "../controllers/admin/teamMemberController.js";

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

export default router;