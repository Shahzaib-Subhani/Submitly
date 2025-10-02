import Evaluation from "../../models/evaluation.js";
import Leaderboard from "../../models/leaderboard.js";
import Submission from "../../models/submission.js";
import { errorResponse, successResponse, validateObjectID } from "../../utils/baseHelper.js";


// function to get evaluation record
export const getEvaluationForTeam = async (req, res) => {
    try {
        const { teamID } = req.params;
        if (!validateObjectID(res, teamID, "teamID")) return;

        // fetch submission
        const submission = await Submission.findOne({ teamID })
            .select("_id topic description learningOutcomes status videoURL")
            .populate("teamID", "teamName leaderName")
            .lean();

        if (!submission) {
            return errorResponse(res, "Submission not found", "no submission exists with this id", 404);
        }

        // fetch evaluations from leaderboard by submissionID
        const leaderboard = await Leaderboard.findOne({ submissionID: submission._id })
        .select("evaluations averageScore")
        .lean();

        const result = {
            teamName: submission?.teamID?.teamName,
            topic: submission?.topic,
            videoURL: submission?.videoURL,
            description: submission?.description,
            learningOutcomes: submission?.learningOutcomes,
            status: submission?.status,
            evaluations: leaderboard.evaluations,
            averageScores:leaderboard.averageScore
        };
        return successResponse(res, "Evaluation fetched successfully", result);
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};