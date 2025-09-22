import express from "express";
import { authenticateUser, authorizeRole } from "../middlewares/authMiddleware.js";
import { getAllTeams } from "../controllers/admin/teamsController.js";

const router = express.Router();

router.get("/teams", authenticateUser, authorizeRole("admin"), getAllTeams);

export default router;