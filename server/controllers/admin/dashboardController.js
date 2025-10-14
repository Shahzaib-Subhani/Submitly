import Evaluation from "../../models/evaluation.js";
import Evaluator from "../../models/evaluator.js";
import Submission from "../../models/submission.js";
import Team from "../../models/team.js";
import { errorResponse, formatNumber, successResponse } from "../../utils/baseHelper.js";

// function to fetch deadline
export const fetchDashboardData = async (req, res) => {
    try {
        // fetch teams
        const teams = await Team.countDocuments();

        // fetch Evaluators 
        const evaluators = await Evaluator.countDocuments();

        // fetch Submissions 
        const submissions = await Submission.countDocuments();

        // fetch Submissions 
        const evaluations = await Evaluation.countDocuments();

        const data = {
            teams: formatNumber(teams),
            evaluators: formatNumber(evaluators),
            submissions: formatNumber(submissions),
            evaluations: formatNumber(evaluations)
        }

        return successResponse(res, "Dashboard data fetched successfully", data);
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};