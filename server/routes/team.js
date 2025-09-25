import express from "express";
import { authenticateUser, authorizeRole, authorizeSelf } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/submission", authenticateUser, authorizeRole("team"), authorizeSelf("team"), (req, res) => {
    return res.json({ key: "value" });
});

export default router;
