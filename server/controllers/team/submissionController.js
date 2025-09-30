import Submission from "../../models/submission.js";
import { checkDeadline, errorResponse, fetchNextId, incrementCounter, successResponse, validate, validateObjectID } from "../../utils/baseHelper.js";
import { createSubmissionSchema } from "../../utils/validations.js";

// Create Submission function
export const createSubmission = async (req, res) => {
    try {
        // validate request body
        const { success, errors, validatedData } = validate(createSubmissionSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { topic, videoURL, description, learningOutcomes } = validatedData;

        if (!(await checkDeadline())) return errorResponse(res, "Deadline Exceeded", "Submission deadline has passed");

        const teamID = req.user.id;
        // fetch submission and check if exists already
        const existingSubmission = await Submission.findOne({ teamID });
        if (existingSubmission) return errorResponse(res, "Duplicate Submission Error", "Submission already exists.");

        // Create Submission
        const submissionID = await fetchNextId("submissionID");

        const newSubmission = new Submission({ submissionID, topic, teamID, videoURL, description, learningOutcomes });
        await newSubmission.save();
        await incrementCounter("submissionID");

        return successResponse(res, "Submission created successfully");
    } catch (error) {
        return errorResponse(res, "Server error", error.message, 500);
    }
};

// function to get submission record
export const getSubmissionById = async (req, res) => {
    try {
        const { teamID } = req.params;
        if (!validateObjectID(res, teamID, "teamID")) return;

        // fetch submission by id
        const submission = await Submission.find({ teamID }).select("topic videoURL description learningOutcomes").lean();

        if (!submission) {
            return errorResponse(res, "Submission not found", "no submission exists with this id", 404);
        }
        return successResponse(res, "Submission fetched successfully", submission);
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};

// Create Submission function
export const updateSubmission = async (req, res) => {
    try {
        const { submissionID } = req.params;
        if (!validateObjectID(res, submissionID, "submissionID")) return;
        // validate request body
        const { success, errors, validatedData } = validate(createSubmissionSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { topic, videoURL, description, learningOutcomes } = validatedData;
        if (!(await checkDeadline())) return errorResponse(res, "Deadline Exceeded", "Submission deadline has passed");
        // fetch submission and update
        const updatedSubmission = await Submission.findByIdAndUpdate(
            submissionID,
            { topic, videoURL, description, learningOutcomes, status: "updated" },
            { new: true }
        );
        if (!updatedSubmission) return errorResponse(res, "Submission not found", "no submission exists with this id", 404);
        return successResponse(res, "Submission updated successfully");
    } catch (error) {
        return errorResponse(res, "Server error", error.message, 500);
    }
};