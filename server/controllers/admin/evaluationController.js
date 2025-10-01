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
        const evaluations = await Evaluation.find(query)
            .select("createdAt totalScore evaluationID")
            .populate({
                path: "submissionID",
                select: "teamID submissionID topic",
                populate: {
                    path: "teamID",
                    select: "teamName -_id",
                },
            })
            .populate("evaluatorID", "name -_id")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
        const finalEvaluations = evaluations.map(({ _id, evaluatorID, submissionID, evaluationID, totalScore, ...rest }) => ({
            id: _id,
            evaluationID: evaluationID,
            evaluatorName: evaluatorID?.name,
            submissionID: submissionID?.submissionID,
            teamName: submissionID?.teamID?.teamName,
            topic: submissionID?.topic,
            totalScore,
            ...rest,
        }));
        // fetch total count of model
        const totalRecords = await Evaluation.countDocuments(query);
        const paginationRecord = getPaginationInfo(totalRecords, pageInt, pageSizeInt, skip, limit);

        return successResponse(res, "Evaluations fetched successfully", {
            evaluations: finalEvaluations,
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
        const evaluation = await Evaluation.findById(evaluationID)
            .select(" -__v")
            .populate({
                path: "submissionID",
                select: "teamID submissionID topic",
                populate: {
                    path: "teamID",
                    select: "teamName -_id",
                },
            })
            .populate("evaluatorID", "name _id")
            .lean();

        if (!evaluation) {
            return errorResponse(res, EVALUATION_NOT_FOUND_ERR, EVALUATION_NOT_FOUND_MESSAGE, 404);
        }

        const formattedEvaluation = {
            evaluationID: evaluation.evaluationID,
            evaluatorName: evaluation.evaluatorID?.name,
            submissionId: evaluation.submissionID?.submissionID,
            teamName: evaluation.submissionID?.teamID?.teamName,
            topic: evaluation.submissionID?.topic,
            scores: evaluation.scores,
            totalScore: evaluation.totalScore,
            feedback: evaluation.feedback,
            createdAt: evaluation.createdAt,
            updatedAt: evaluation.updatedAt,
        };
        return successResponse(res, "Evaluation fetched successfully", formattedEvaluation);
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};