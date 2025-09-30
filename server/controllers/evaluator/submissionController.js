import Evaluation from "../../models/evaluation.js";
import Submission from "../../models/submission.js";
import { buildSearchQuery, errorResponse, fetchNextId, getPaginationInfo, getSkipAndLimit, incrementCounter, successResponse, validate, validateObjectID } from "../../utils/baseHelper.js";
import { evaluateSubmissionSchema } from "../../utils/validations.js";

const SUBMISSION_NOT_FOUND_ERR = "Submission not found";
const SUBMISSION_NOT_FOUND_MESSAGE = "No submission exists in the database for given submissionID";

// function to get all submission records for evaluator
export const getAllSubmissionsForEvaluator = async (req, res) => {
    try {
        const { page = 1, pageSize = 10, search = "", searchType = "email" } = req.query;
        const columns = ["submissionID", "teamName", "topic", "totalScore", "lastUpdated"];
        const query = buildSearchQuery(search, searchType, columns, "submissionID");

        const { limit, skip, pageInt, pageSizeInt } = getSkipAndLimit(page, pageSize);

        //   fetch and count submissions
        const submissions = await Submission.find(query)
            .select("submissionID topic updatedAt status")
            .populate("teamID", "teamName")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const finalSubmissions = submissions.map(submission => {
            submission.team = submission.teamID;
            delete submission.teamID;
            return submission;
        });

        // fetch total count of model
        const totalRecords = await Submission.countDocuments(query);
        const paginationRecord = getPaginationInfo(totalRecords, pageInt, pageSizeInt, skip, limit);

        return successResponse(res, "Submissions fetched successfully", {
            finalSubmissions,
            pagination: paginationRecord
        });
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};


// function to get single submission record
export const getSubmissionById = async (req, res) => {
    try {
        const { submissionID, evaluatorID } = req.params;
        if (!validateObjectID(res, submissionID, "submissionID")) return;
        if (!validateObjectID(res, evaluatorID, "evaluatorID")) return;
        // fetch submission by id
        const submission = await Submission.findById(submissionID)
            .select(" -__v")
            .populate("teamID", "teamID teamName leaderName")
            .lean();

        if (!submission) {
            return errorResponse(res, SUBMISSION_NOT_FOUND_ERR, SUBMISSION_NOT_FOUND_MESSAGE, 404);
        }
        // check if evaluator assigned in submission.evaluators
        const evaluatorExists = submission.evaluators?.some(
            (evaluator) => evaluator.toString() === evaluatorID
        );
        if (!evaluatorExists) {
            return errorResponse(res, "Evaluator not assigned", "This evaluator is not assigned to the submission", 403);
        }
        delete submission.evaluators;
        return successResponse(res, "Submission fetched successfully", submission);
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};


// function to evaluate submission
export const evaluateSubmission = async (req, res) => {
    try {

        const { submissionID } = req.params;
        if (!validateObjectID(res, submissionID, "submissionID")) return;
        // validate request body
        const { success, errors, validatedData } = validate(evaluateSubmissionSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { scores, evaluatorID, feedback } = validatedData;

        // check existing evaluation for submissionID and evaluatorID
        const existingEvaluation = await Evaluation.findOne({ submissionID, evaluatorID });
        if (existingEvaluation) {
            return errorResponse(res, "Duplicate Evaluation", "You have already evaluated this submission", 409);
        }

        const total = Object.values(scores).reduce((sum, val) => sum + val, 0);

        const evaluationID = await fetchNextId("evaluationID");

        // save evaluation record
        const evaluation = new Evaluation({
            evaluationID,
            submissionID,
            evaluatorID,
            scores,
            feedback,
            totalScore: total,
        });
        await evaluation.save();
        await incrementCounter("evaluationID");
        return successResponse(res, "Evaluation saved successfully");
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};