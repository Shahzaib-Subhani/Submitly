import express from "express";
import { getLeaderboard } from "../controllers/admin/leaderboardController.js";

const router = express.Router();
router.get("/leaderboard", getLeaderboard);

export default router;
