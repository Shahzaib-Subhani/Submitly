import express from "express";
import { teamLogin, teamRegister } from "../controllers/teamAuthController.js";

const router = express.Router();

router.post("/team-register", teamRegister);
router.post("/team-signin", teamLogin);


export default router;