import express from "express";
import { teamRegister } from "../controllers/authController.js";

const router = express.Router();

router.post("/register-team", teamRegister);


export default router;