import Deadline from "../../models/deadline.js";
import { checkDeadline, errorResponse, successResponse, validate } from "../../utils/baseHelper.js";
import { setDeadlineSchema } from "../../utils/validations.js";

// function to set deadline
export const setDeadline = async (req, res) => {
    try {
        // validate request body
        const { success, errors, validatedData } = validate(setDeadlineSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { deadlineType, deadlineDate } = validatedData;

        checkDeadline(deadlineDate);
        // create or update deadline
      await Deadline.findOneAndUpdate(
            { deadlineType },
            { deadlineType, deadlineDate },
            { new: true, upsert: true }
        );

        return successResponse(res, "Deadline set successfully");
    } catch (error) {
        return errorResponse(res, "Server error", error.message, 500);
    }
};