import Evaluation from "../../models/evaluation.js";
import Submission from "../../models/submission.js";
import { errorResponse, successResponse, validateObjectID } from "../../utils/baseHelper.js";

const EVALUATION_NOT_FOUND_ERR = "Evaluation not found";
const EVALUATION_NOT_FOUND_MESSAGE = "No evaluation exists in the database for given evaluationID";

// function to get evaluation record
export const getEvaluationForTeam = async (req, res) => {
    try {
        const { teamID } = req.params;
        if (!validateObjectID(res, teamID, "teamID")) return;

        // fetch submission
        const submission = await Submission.findOne({ teamID })
            .select("_id")
            .populate("teamID", "teamName leaderName _id description learningOutcomes status videoURL")
            .lean();

        if (!submission) {
            return errorResponse(res, "Submission not found", "no submission exists with this id", 404);
        }

        // fetch evaluation by teamID
        const evaluations = await Evaluation.find({ submissionID: submission._id })
            .select("scores totalScore feedback")
            .lean();

        const criteriaKeys = [
            "relevance",
            "innovation",
            "clarity",
            "depth",
            "engagement",
            "technology",
            "scalability",
            "ethics",
            "application",
            "videoQuality"
        ];

        const averageScores = {};
        criteriaKeys.forEach(key => {
            const sum = evaluations.reduce((acc, evalItem) => acc + (evalItem.scores[key] || 0), 0);
            averageScores[key] = parseFloat((sum / evaluations.length).toFixed(2));
        });

        // Calculate average totalScore
        const totalScoreSum = evaluations.reduce((acc, evalItem) => acc + (evalItem.totalScore || 0), 0);
        const averageTotalScore = parseFloat((totalScoreSum / evaluations.length).toFixed(2));

        const formattedEvaluations = evaluations.map((e, i) => {
            let evaluator = `evaluator${++i}`;
            return {
                [evaluator]: {
                    score: e.scores,
                    totalScore: e.totalScore,
                    feedback: e.feedback
                }
            }
        });

        const result = {
            teamName: submission?.teamID?.teamName,
            topic: submission?.topic,
            videoURL: submission?.videoURL,
            description: submission?.description,
            learningOutcomes: submission?.learningOutcomes,
            evaluations: formattedEvaluations,
            averageScores: { score: averageScores, totalScore: averageTotalScore }
        };
        return successResponse(res, "Evaluation fetched successfully", result);
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};