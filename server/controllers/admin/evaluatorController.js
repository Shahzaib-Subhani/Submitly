import Evaluator from "../../models/evaluator.js";
import { hashPassword } from "../../utils/authHelper.js";
import { buildSearchQuery, errorResponse, getPaginationInfo, getSkipAndLimit, successResponse, validate, validateObjectID } from "../../utils/baseHelper.js";
import { evaluatorUpdateSchema, evaluatorVerifySchema } from "../../utils/validations.js";


const EVALUATOR_NOT_FOUND_ERR = "Evaluator not found";
const EVALUATOR_NOT_FOUND_MESSAGE = "No evaluator exists in the database for given evaluatorID";

// function to get all evaluator records
export const getAllEvaluators = async (req, res) => {
    try {
        const { page = 1, pageSize = 10, search = "", searchType = "" } = req.query;
        const columns = {
            evaluatorID: { path: "evaluatorID", type: "number" },
            name: { path: "name", type: "string" },
            email: { path: "email", type: "string" },
            qualification: { path: "qualification", type: "string" },
            experience: { path: "experience", type: "string" },
            status: { path: "status", type: "string" }
        };

        const query = buildSearchQuery(search, searchType, columns);

        const { limit, skip, pageInt, pageSizeInt } = getSkipAndLimit(page, pageSize);

        //   fetch and count evaluators
        const evaluators = await Evaluator.find(query)
            .select("-password -__v -updatedAt")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // fetch total count of model
        const totalRecords = await Evaluator.countDocuments(query);
        const paginationRecord = getPaginationInfo(totalRecords, pageInt, pageSizeInt, skip, limit);

        return successResponse(res, "Evaluators fetched successfully", {
            evaluators,
            pagination: paginationRecord
        });
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};


// function to get single evaluator record
export const getEvaluatorById = async (req, res) => {
    try {
        const { evaluatorID } = req.params;
        if (!validateObjectID(res, evaluatorID, "evaluatorID")) return;
        // fetch evaluator by id
        const evaluator = await Evaluator.findById(evaluatorID).select("-password -__v -updatedAt");

        if (!evaluator) {
            return errorResponse(res, EVALUATOR_NOT_FOUND_ERR, EVALUATOR_NOT_FOUND_MESSAGE, 404);
        }
        return successResponse(res, "Evaluator fetched successfully", evaluator);
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};

// function to delete single evaluator record
export const deleteEvaluator = async (req, res) => {
    try {
        const { evaluatorID } = req.params;
        if (!validateObjectID(res, evaluatorID, "evaluatorID")) return;
        // fetch evaluator
        const evaluator = await Evaluator.findByIdAndDelete(evaluatorID);
        if (!evaluator) return errorResponse(res, EVALUATOR_NOT_FOUND_ERR, EVALUATOR_NOT_FOUND_MESSAGE, 404);
        return successResponse(res, "Evaluator deleted successfully");
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};

// function to update evaluator record
export const updateEvaluator = async (req, res) => {
    try {
        const { evaluatorID } = req.params;
        if (!validateObjectID(res, evaluatorID, "evaluatorID")) return;
        // validate request body
        const { success, errors, validatedData } = validate(evaluatorUpdateSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { email, name, qualification, experience, password } = validatedData;

        const existingEvaluator = await Evaluator.findOne({ email, _id: { $ne: evaluatorID } });
        if (existingEvaluator) {
            return errorResponse(res, "Email already exists", "This email is already used by another evaluator", 409);
        }

        // prepare update data
        const updateData = { email, name, qualification, experience };
        if (password) {
            const hashedPassword = await hashPassword(password);
            updateData.password = hashedPassword;
        }
        // update evaluator record
        const updatedEvaluator = await Evaluator.findOneAndUpdate(
            { _id: evaluatorID },
            updateData,
            { new: true }
        ).select("-__v -updatedAt -password");
        if (!updatedEvaluator) return errorResponse(res, EVALUATOR_NOT_FOUND_ERR, EVALUATOR_NOT_FOUND_MESSAGE, 404);

        return successResponse(res, "Evaluator updated successfully", updatedEvaluator);
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};


// function to verify evaluator 
export const verifyEvaluator = async (req, res) => {
    try {
        const { evaluatorID } = req.params;
        if (!validateObjectID(res, evaluatorID, "evaluatorID")) return;
        // validate request body
        const { success, errors, validatedData } = validate(evaluatorVerifySchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { status } = validatedData;
        // update evaluator record
        const updatedEvaluator = await Evaluator.findOneAndUpdate(
            { _id: evaluatorID },
            { status: status },
            { new: true }
        ).select("-__v -updatedAt -password");
        if (!updatedEvaluator) return errorResponse(res, EVALUATOR_NOT_FOUND_ERR, EVALUATOR_NOT_FOUND_MESSAGE, 404);

        return successResponse(res, "Evaluator verified successfully");
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};

// function to get all evaluators for assignment
export const fetchEvaluators = async (req, res) => {
    try {
        const evaluators = await Evaluator.find({ status: "approved" }, "_id evaluatorID name");

        return successResponse(res, "Evaluators fetched successfully", evaluators);
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};