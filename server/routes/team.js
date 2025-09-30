import express from "express";
import { authenticateUser, authorizeRole, authorizeSelf } from "../middlewares/authMiddleware.js";
import { createSubmission, getSubmissionById, updateSubmission } from "../controllers/team/submissionController.js";
import { getTeamProfile, updatePassword, updateTeam } from "../controllers/team/profileController.js";
import { getEvaluationForTeam } from "../controllers/team/evaluationController.js";

const router = express.Router();

router.post("/submission", authenticateUser, authorizeRole("team"), authorizeSelf("team"), createSubmission);
router.get("/submission/:teamID", authenticateUser, authorizeRole("team"), authorizeSelf("team"), getSubmissionById);
router.patch("/submission/:submissionID", authenticateUser, authorizeRole("team"), authorizeSelf("team"), updateSubmission);
router.get("/evaluations/:teamID", authenticateUser, authorizeRole("team"), authorizeSelf("team"), getEvaluationForTeam);


// Profile
router.post("/profile/:teamID/update", authenticateUser, authorizeRole("team"), authorizeSelf("team"), updateTeam);
router.post("/profile/:teamID/password-update", authenticateUser, authorizeRole("team"), authorizeSelf("team"), updatePassword);
router.get("/profile/:teamID", authenticateUser, authorizeRole("team"), authorizeSelf("team"), getTeamProfile);

export default router;
