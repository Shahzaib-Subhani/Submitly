import Evaluation from "../../models/evaluation.js";
import { buildSearchQuery, errorResponse, getPaginationInfo, getSkipAndLimit, successResponse, validateObjectID } from "../../utils/baseHelper.js";

const EVALUATION_NOT_FOUND_ERR = "Evaluation not found";
const EVALUATION_NOT_FOUND_MESSAGE = "No evaluation exists in the database for given evaluationID";

// function to get all evaluations records for evaluator
export const getAllEvaluationsForEvaluator = async (req, res) => {
    try {
        const { page = 1, pageSize = 10, search = "", searchType = "email" } = req.query;
        const columns = ["topic", "Submission ID", "lastUpdated"];
        const query = buildSearchQuery(search, searchType, columns, "evaluationID");

        query.evaluatorID = req.params.evaluatorID;
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
        const { evaluationID, evaluatorID } = req.params;
        if (!validateObjectID(res, evaluationID, "evaluationID")) return;
        if (!validateObjectID(res, evaluatorID, "evaluatorID")) return;
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

        if (evaluation.evaluatorID._id.toString() !== evaluatorID) {
            return errorResponse(res, "Evaluation not assigned", "This evaluation is not evaluated by given Evaluator", 403);
        }

        const {
            evaluationID: evalId,
            evaluatorID: evaluator,
            submissionID: submission,
            scores,
            totalScore,
            feedback,
            createdAt,
            updatedAt,
        } = evaluation;

        const formattedEvaluation = {
            evaluationID: evalId,
            evaluatorName: evaluator?.name,
            submissionId: submission?.submissionID,
            teamName: submission?.teamID?.teamName,
            topic: submission?.topic,
            scores,
            totalScore,
            feedback,
            createdAt,
            updatedAt,
        };
        return successResponse(res, "Evaluation fetched successfully", formattedEvaluation);
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};
