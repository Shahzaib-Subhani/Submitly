import Evaluator from "../../models/evaluator.js";
import { hashPassword } from "../../utils/authHelper.js";
import { errorResponse, successResponse, validate, validateObjectID } from "../../utils/baseHelper.js";
import { evaluatorUpdateSchema, updateProfilePasswordSchema } from "../../utils/validations.js";

const EVALUATOR_NOT_FOUND_ERR = "Evaluator not found";
const EVALUATOR_NOT_FOUND_MESSAGE = "No evaluator exists in the database for given evaluatorID";

// function to get profile data
export const getEvaluatorProfile = async (req, res) => {
    try {
        const { evaluatorID } = req.params;
        if (!validateObjectID(res, evaluatorID, "evaluatorID")) return;
        // fetch evaluator by id
        const evaluator = await Evaluator.findById(evaluatorID)
            .select("-password -__v -updatedAt")
            .lean();

        if (!evaluator) {
            return errorResponse(res, EVALUATOR_NOT_FOUND_ERR, EVALUATOR_NOT_FOUND_MESSAGE, 404);
        }

        return successResponse(res, "Evaluator fetched successfully", evaluator);
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
        const { email, name, qualification, experience } = validatedData;

        const existingEvaluator = await Evaluator.findOne({ email, _id: { $ne: evaluatorID } });
        if (existingEvaluator) {
            return errorResponse(res, "Email already exists", "This email is already used by another evaluator", 409);
        }
        // prepare update data
        const updateData = { email, name, qualification, experience };
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

// function to update password record
export const updatePassword = async (req, res) => {
    try {
        const { evaluatorID } = req.params;
        if (!validateObjectID(res, evaluatorID, "evaluatorID")) return;
        // validate request body
        const { success, errors, validatedData } = validate(updateProfilePasswordSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { password } = validatedData;

        const hashedPassword = await hashPassword(password);

        // update evaluator record
        const updatedEvaluator = await Evaluator.findOneAndUpdate(
            { _id: evaluatorID },
            { password: hashedPassword }
        );
        if (!updatedEvaluator) return errorResponse(res, EVALUATOR_NOT_FOUND_ERR, EVALUATOR_NOT_FOUND_MESSAGE, 404);

        return successResponse(res, "Password updated successfully");
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};