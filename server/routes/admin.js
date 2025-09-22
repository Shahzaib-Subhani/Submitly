import express from "express";
import { authenticateUser, authorizeRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/teams", authenticateUser, authorizeRole("admin"), (req, res) => { console.log("success");
 });

export default router;