import Evaluation from "../../models/evaluation.js";
import { buildSearchQuery, errorResponse, getPaginationInfo, getSkipAndLimit, successResponse, validateObjectID } from "../../utils/baseHelper.js";


const EVALUATION_NOT_FOUND_ERR = "Evaluation not found";
const EVALUATION_NOT_FOUND_MESSAGE = "No evaluation exists in the database for given evaluationID";

// function to get all evaluation records
export const getAllEvaluations = async (req, res) => {
    try {
        const { page = 1, pageSize = 10, search = "", searchType = "email" } = req.query;
        const columns = ["evaluatorName", "submissionID", "teamName", "topic", "totalScore", "lastUpdated"];
        const query = buildSearchQuery(search, searchType, columns, "evaluationID");

        const { limit, skip, pageInt, pageSizeInt } = getSkipAndLimit(page, pageSize);

        //   fetch and count evaluations
        const evaluation = await Evaluation.find(query)
            .select("-password -__v -updatedAt")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // fetch total count of model
        const totalRecords = await Evaluation.countDocuments(query);
        const paginationRecord = getPaginationInfo(totalRecords, pageInt, pageSizeInt, skip, limit);

        return successResponse(res, "Evaluations fetched successfully", {
            evaluation,
            pagination: paginationRecord
        });
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};


// function to get single evaluation record
export const getEvaluationById = async (req, res) => {
    try {
        const { evaluationID } = req.params;
        if (!validateObjectID(res, evaluationID, "evaluationID")) return;
        // fetch evaluation by id
        const evaluator = await Evaluation.findById(evaluationID).select("-__v -updatedAt");

        if (!evaluator) {
            return errorResponse(res, EVALUATION_NOT_FOUND_ERR, EVALUATION_NOT_FOUND_MESSAGE, 404);
        }
        return successResponse(res, "Evaluation fetched successfully", evaluator);
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};