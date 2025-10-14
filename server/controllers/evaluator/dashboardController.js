import mongoose from "mongoose";
import Evaluation from "../../models/evaluation.js";
import Evaluator from "../../models/evaluator.js";
import Submission from "../../models/submission.js";
import Team from "../../models/team.js";
import { errorResponse, formatNumber, successResponse } from "../../utils/baseHelper.js";

// function to fetch deadline
export const fetchDashboardData = async (req, res) => {
    try {
        // fetch Submissions 
        const submissions = await Submission.countDocuments({
            evaluators: new mongoose.Types.ObjectId(req.user.id),
        });

        // fetch Evaluations 
        const evaluations = await Evaluation.countDocuments({
            evaluatorID: new mongoose.Types.ObjectId(req.user.id),
        });

        const data = {
            submissions: formatNumber(submissions),
            evaluations: formatNumber(evaluations),
            pendingSubmissions: formatNumber(submissions - evaluations),
        }

        return successResponse(res, "Dashboard data fetched successfully", data);
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};