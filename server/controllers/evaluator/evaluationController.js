import mongoose from "mongoose";
import Evaluation from "../../models/evaluation.js";
import { buildSearchQuery, errorResponse, getPaginationInfo, getSkipAndLimit, successResponse, validateObjectID } from "../../utils/baseHelper.js";
import { evaluatorLookup, facetGenerator, submissionLookup, teamLookup } from "../../utils/pipelineHelper.js";

const EVALUATION_NOT_FOUND_ERR = "Evaluation not found";
const EVALUATION_NOT_FOUND_MESSAGE = "No evaluation exists in the database for given evaluationID";

// function to get all evaluations records for evaluator
export const getAllEvaluationsForEvaluator = async (req, res) => {
    try {
        const { page = 1, pageSize = 10, search = "", searchType = "email" } = req.query;
        const columns = {
            topic: { path: "topic", type: "string" },
            submissionID: { path: "submissionID", type: "number" },
            evaluatorName: { path: "evaluator.name", type: "string" },
            evaluationID: { path: "evaluationID", type: "number" },
            teamName: { path: "team.teamName", type: "string" },
            totalScore: { path: "totalScore", type: "number" }
        };
        const query = buildSearchQuery(search, searchType, columns, true);

        query.push({ $match: { evaluatorID: new mongoose.Types.ObjectId(req.params.evaluatorID) } })
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
        //   fetch  evaluations
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
            submissionID: submission?.submissionID,
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
