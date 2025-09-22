import Admin from "../models/admin.js";
import Evaluator from "../models/evaluator.js";
import OTP from "../models/otp.js";
import Team from "../models/team.js";
import { generateOTP, generateRandomToken, hashPassword } from "../utils/authHelper.js";
import { errorResponse, successResponse, validate } from "../utils/baseHelper.js";
import { forgotPasswordSchema, otpVerifySchema, updatePasswordSchema } from "../utils/validations.js";

export const forgotPasswordOTP = async (req, res) => {
    try {
        const { success, errors, validatedData } = validate(forgotPasswordSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);

        const { email, userType } = validatedData;
        const UserModels = { admin: Admin, team: Team, evaluator: Evaluator };
        const User = UserModels[userType];


        const user = await User.findOne({ email });
        if (!user) return errorResponse(res, "no user found for this email");

        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await OTP.findOneAndUpdate(
            { email, userType },
            { otp, expiresAt },
            { upsert: true, new: true }
        );

        return successResponse(res, "OTP sent successfully to registered email", { otp });
    } catch (error) {
        return errorResponse(res, "Server error", { error: error.message }, 500);
    }
};


// check OTP for Password Reset
export const verifyOTP = async (req, res) => {
    try {
        const { success, errors, validatedData } = validate(otpVerifySchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);

        const { email, userType, otp } = validatedData;

        const otpRecord = await OTP.findOne({ email, userType, otp });
        if (!otpRecord) return errorResponse(res, "Invalid OTP");
        if (otpRecord.expiresAt < new Date()) return errorResponse(res, "OTP Expired");

        const resetToken = generateRandomToken();
        const updatedEntry = await OTP.findOneAndUpdate(
            { email, userType, otp },
            { resetToken },
            { new: true }
        );

        console.log(updatedEntry, resetToken);

        return successResponse(res, "OTP verified successfully", { resetToken });
    } catch (error) {
        return errorResponse(res, "Server error", { error: error.message }, 500);
    }
};


// Password update after verification
export const passwordReset = async (req, res) => {
    try {
        const { success, errors, validatedData } = validate(updatePasswordSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);

        const { email, userType, resetToken, password } = validatedData;

        const otpRecord = await OTP.findOne({ email, userType, resetToken });
        if (!otpRecord) return errorResponse(res, "Invalid Reset Token");
        if (otpRecord.expiresAt < new Date()) return errorResponse(res, "OTP Expired");

        const UserModels = { admin: Admin, team: Team, evaluator: Evaluator };
        const User = UserModels[userType];

        const hashedPassword = await hashPassword(password);
        await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true }
        );
        await OTP.deleteOne({ email, userType, resetToken });

        return successResponse(res, "Password updated successfully");
    } catch (error) {
        return errorResponse(res, "Server error", { error: error.message }, 500);
    }
};