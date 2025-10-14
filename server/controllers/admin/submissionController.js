import Evaluator from "../../models/evaluator.js";
import Submission from "../../models/submission.js";
import { buildSearchQuery, errorResponse, getPaginationInfo, getSkipAndLimit, successResponse, validate, validateObjectID } from "../../utils/baseHelper.js";
import { facetGenerator, teamLookup } from "../../utils/pipelineHelper.js";
import { assignEvaluatorSchema } from "../../utils/validations.js";

const SUBMISSION_NOT_FOUND_ERR = "Submission not found";
const SUBMISSION_NOT_FOUND_MESSAGE = "No submission exists in the database for given submissionID";

// function to get all submission records
export const getAllSubmissions = async (req, res) => {
    try {
        const { page = 1, pageSize = 10, search = "", searchType = "" } = req.query;
        const columns = {
            topic: { path: "topic", type: "string" },
            teamName: { path: "team.teamName", type: "string" },
            status: { path: "status", type: "string" },
            submissionID: { path: "submissionID", type: "number" }
        };
        const query = buildSearchQuery(search, searchType, columns, true);

        const { limit, skip, pageInt, pageSizeInt } = getSkipAndLimit(page, pageSize);

        const projectFields = {
            submissionID: 1,
            topic: 1,
            status: 1,
            updatedAt: 1,
            createdAt: 1,
            teamName: "$team.teamName",
        };
        const pipeline = [

            ...teamLookup({ teamName: 1 }, "$teamID"),
            ...query,
            ...facetGenerator(projectFields, skip, limit, "submissions"),
        ];

        //   fetch submissions
        const result = await Submission.aggregate(pipeline);
        const { submissions, totalRecords } = result[0];

        // build pagination record
        const paginationRecord = getPaginationInfo(totalRecords, pageInt, pageSizeInt, skip, limit);

        return successResponse(res, "Submissions fetched successfully", {
            submissions,
            pagination: paginationRecord
        });
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};


// function to get single submission record
export const getSubmissionById = async (req, res) => {
    try {
        const { submissionID } = req.params;
        if (!validateObjectID(res, submissionID, "submissionID")) return;
        // fetch submission by id
        const submission = await Submission.findById(submissionID).select(" -__v ").populate("teamID", "teamID teamName leaderName");

        if (!submission) {
            return errorResponse(res, SUBMISSION_NOT_FOUND_ERR, SUBMISSION_NOT_FOUND_MESSAGE, 404);
        }
        return successResponse(res, "Submission fetched successfully", submission);
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};

// function to delete single submission record
export const deleteSubmission = async (req, res) => {
    try {
        const { submissionID } = req.params;
        if (!validateObjectID(res, submissionID, "submissionID")) return;
        // fetch evaluator
        const submission = await Submission.findByIdAndDelete(submissionID);
        if (!submission) return errorResponse(res, SUBMISSION_NOT_FOUND_ERR, SUBMISSION_NOT_FOUND_MESSAGE, 404);
        return successResponse(res, "Submission deleted successfully");
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};

// function to assign evaluator to submission
export const assignEvaluator = async (req, res) => {
    try {
        const { submissionID } = req.params;
        if (!validateObjectID(res, submissionID, "submissionID")) return;
        // validate request body
        const { success, errors, validatedData } = validate(assignEvaluatorSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { evaluatorIDs } = validatedData;

        const existingEvaluators = await Evaluator.find({
            _id: { $in: evaluatorIDs }
        }).select("_id");

        if (existingEvaluators.length !== evaluatorIDs.length) {
            return errorResponse(res, "Invalid Evaluator ID", "One or more evaluator IDs are invalid")
        }
        // update evaluator record
        const updatedSubmission = await Submission.findByIdAndUpdate(
            submissionID,
            { evaluators: evaluatorIDs },
            { new: true }
        ).select(" -__v -updatedAt").populate("teamID", "teamID teamName leaderName");
        if (!updatedSubmission) return errorResponse(res, "Submission not found", "Submission not found", 404);

        return successResponse(res, "Evaluator(s) assigned successfully", updatedSubmission);
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};
