import express from "express";
import { authenticateUser, authorizeRole, authorizeSelf } from "../middlewares/authMiddleware.js";
import { createSubmission, getSubmissionById, updateSubmission } from "../controllers/team/submissionController.js";

const router = express.Router();

router.post("/submission", authenticateUser, authorizeRole("team"), authorizeSelf("team"), createSubmission);
router.get("/submission/:teamID", authenticateUser, authorizeRole("team"), authorizeSelf("team"), getSubmissionById);
router.patch("/submission/:submissionID", authenticateUser, authorizeRole("team"), authorizeSelf("team"), updateSubmission);

export default router;
