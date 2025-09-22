
import { errorResponse, fetchNextId, incrementCounter, successResponse, validate } from "../../utils/baseHelper.js";
import { adminRegisterSchema, loginSchema } from "../../utils/validations.js";
import { generateJwtToken, hashPassword, verifyPassword } from "../../utils/authHelper.js";
import Admin from "../../models/admin.js";

// Evaluator Registration function
export const adminRegister = async (req, res) => {
    try {
        const { success, errors, validatedData } = validate(adminRegisterSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { email, password, name } = validatedData;

        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) return errorResponse(res, "Email already exists.");

        const adminID = await fetchNextId("adminID");
        const hashedPassword = await hashPassword(password);

        const newAdmin = new Admin({ adminID, email, name, password: hashedPassword });
        await newAdmin.save();
        await incrementCounter("adminID");
        return successResponse(res, "Admin registered successfully");
    } catch (error) {
        return errorResponse(res, "Server error", { error: error.message });
    }
};

// Admin Login function
export const adminLogin = async (req, res) => {
    try {
        const { success, errors, validatedData } = validate(loginSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { email, password } = validatedData;

        const admin = await Admin.findOne({ email });
        if (!admin) return errorResponse(res, "no admin found for this email");

        const match = await verifyPassword(admin.password, password);
        if (!match) {
            return errorResponse(res, "Password Error", "Incorrect Password");
        }
        const token = generateJwtToken({ userId: admin.id, role: "admin" });

        return successResponse(res, "Admin Logged in successfully", { jwtToken: token });
    } catch (error) {
        return errorResponse(res, "Server error", { error: error.message }, 500);
    }
};