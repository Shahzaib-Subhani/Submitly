import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    userType: { type: String, required: true, enum: ["admin", "team", "evaluator"] },
    otp: { type: String, required: true },
    resetToken: { type: String },
    expiresAt: { type: Date, required: true },
});

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;