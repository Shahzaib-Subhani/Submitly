
import { errorResponse, fetchNextId, incrementCounter, successResponse, validate } from "../utils/baseHelper.js";
import { evaluatorRegisterSchema, loginSchema } from "../utils/validations.js";
import { generateJwtToken, hashPassword, verifyPassword } from "../utils/authHelper.js";
import Evaluator from "../models/evaluator.js";

// Evaluator Registration function
export const evaluatorRegister = async (req, res) => {
    try {
        const { success, errors, validatedData } = validate(evaluatorRegisterSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { email, name, qualification, experience, password } = validatedData;

        const existingEvaluator = await Evaluator.findOne({ email });

        if (existingEvaluator) return errorResponse(res, "Email already exists.");

        const evaluatorID = await fetchNextId("evaluatorID");
        const hashedPassword = await hashPassword(password);

        const newEvaluator = new Evaluator({ evaluatorID, email, name, qualification, experience, password: hashedPassword });
        await newEvaluator.save();
        await incrementCounter("evaluatorID");
        return successResponse(res, "Evaluator registered successfully");
    } catch (error) {
        return errorResponse(res, "Server error", { error: error.message });
    }
};

// Evaluator Login function
export const evaluatorLogin = async (req, res) => {
    try {
        const { success, errors, validatedData } = validate(loginSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { email, password } = validatedData;

        const evaluator = await Evaluator.findOne({ email });
        if (!evaluator) return errorResponse(res, "no evaluator found for this email");

        const match = await verifyPassword(evaluator.password, password);
        if (!match) {
            return errorResponse(res, "Password Error", "Incorrect Password");
        }
        const token = generateJwtToken({ id: evaluator._id, role: "evaluator" });
        console.log(token);

        return successResponse(res, "Evaluator Logged in successfully", { jwtToken: token });
    } catch (error) {
        return errorResponse(res, "Server error", { error: error.message }, 500);
    }
};
