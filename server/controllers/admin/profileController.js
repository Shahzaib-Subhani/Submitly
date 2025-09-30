
import Admin from "../../models/admin.js";
import { hashPassword } from "../../utils/authHelper.js";
import { errorResponse, successResponse, validate, validateObjectID } from "../../utils/baseHelper.js";
import { adminUpdateSchema, updateProfilePasswordSchema } from "../../utils/validations.js";

const ADMIN_NOT_FOUND_ERR = "Admin not found";
const ADMIN_NOT_FOUND_MESSAGE = "No admin exists in the database for given adminID";

// function to get profile data
export const getAdminProfile = async (req, res) => {
    try {
        const { adminID } = req.params;
        if (!validateObjectID(res, adminID, "adminID")) return;
        // fetch evaluator by id
        const evaluator = await Admin.findById(adminID)
            .select("-password -__v -updatedAt")
            .lean();

        if (!evaluator) {
            return errorResponse(res, ADMIN_NOT_FOUND_ERR, ADMIN_NOT_FOUND_MESSAGE, 404);
        }

        return successResponse(res, "Admin fetched successfully", evaluator);
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};

// function to update admin record
export const updateAdmin = async (req, res) => {
    try {
        const { adminID } = req.params;
        if (!validateObjectID(res, adminID, "adminID")) return;
        // validate request body
        const { success, errors, validatedData } = validate(adminUpdateSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { email, name, qualification, experience } = validatedData;
        // prepare update data
        const updateData = { email, name };
        // update admin record
        const updatedAdmin = await Admin.findOneAndUpdate(
            { _id: adminID },
            updateData,
            { new: true }
        ).select("-__v -updatedAt -password");
        if (!updatedAdmin) return errorResponse(res, ADMIN_NOT_FOUND_ERR, ADMIN_NOT_FOUND_MESSAGE, 404);

        return successResponse(res, "Admin updated successfully", updatedAdmin);
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};

// function to update password record
export const updatePassword = async (req, res) => {
    try {
        const { adminID } = req.params;
        if (!validateObjectID(res, adminID, "adminID")) return;
        // validate request body
        const { success, errors, validatedData } = validate(updateProfilePasswordSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { password } = validatedData;

        const hashedPassword = await hashPassword(password);

        // update admin password
        const updatedAdmin = await Admin.findOneAndUpdate(
            { _id: adminID },
            { password: hashedPassword }
        );
        if (!updatedAdmin) return errorResponse(res, EVALUATOR_NOT_FOUND_ERR, EVALUATOR_NOT_FOUND_MESSAGE, 404);

        return successResponse(res, "Password updated successfully");
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};