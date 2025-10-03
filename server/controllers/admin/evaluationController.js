import Evaluation from "../../models/evaluation.js";
import { buildSearchQuery, errorResponse, getPaginationInfo, getSkipAndLimit, successResponse, validateObjectID } from "../../utils/baseHelper.js";
import { evaluatorLookup, facetGenerator, submissionLookup, teamLookup } from "../../utils/pipelineHelper.js";


const EVALUATION_NOT_FOUND_ERR = "Evaluation not found";
const EVALUATION_NOT_FOUND_MESSAGE = "No evaluation exists in the database for given evaluationID";

// function to get all evaluation records
export const getAllEvaluations = async (req, res) => {
    try {
        const { page = 1, pageSize = 10, search = "", searchType = "email" } = req.query;
        const columns = {
            evaluatorName: { path: "evaluator.name", type: "string" },
            evaluationID: { path: "evaluationID", type: "number" },
            teamName: { path: "team.teamName", type: "string" },
            topic: { path: "submission.topic", type: "string" },
            totalScore: { path: "totalScore", type: "number" }
        };

        const query = buildSearchQuery(search, searchType, columns, true);

        const { limit, skip, pageInt, pageSizeInt } = getSkipAndLimit(page, pageSize);
        const projectFields = {
            evaluatorName: "$evaluator.name",
            evaluationID: "$evaluationID",
            submissionID: "$submission.submissionID",
            "totalScore": 1,
            "updatedAt": 1,
            "createdAt": 1,
            topic: "$submission.topic",
            teamName: "$team.teamName"
        };

        const pipeline = [
            ...submissionLookup({ topic: 1, teamID: 1, submissionID: 1 }),
            ...evaluatorLookup({ name: 1 }),
            ...teamLookup({ teamName: 1 }, "$submission.teamID"),
            ...query,
            ...facetGenerator(projectFields, skip, limit, "evaluations"),
        ];

        //   fetch evaluations
        const result = await Evaluation.aggregate(pipeline);
        const { evaluations, totalRecords } = result[0];
        // build pagination record
        const paginationRecord = getPaginationInfo(totalRecords, pageInt, pageSizeInt, skip, limit);

        return successResponse(res, "Evaluations fetched successfully", {
            evaluations,
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