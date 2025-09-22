import argon2 from "argon2";
import Team from "../models/team.js";
import { errorResponse, fetchNextId, incrementCounter, successResponse, validate } from "../utils/baseHelper.js";
import { loginSchema, teamRegisterSchema } from "../utils/validations.js";
import { generateToken, hashPassword, verifyPassword } from "../utils/authHelper.js";

// Team Registration function
export const teamRegister = async (req, res) => {
    try {
        const { success, errors, validatedData } = validate(teamRegisterSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { email, leaderName, teamName, password } = validatedData;


        const existingTeam = await Team.findOne({ email });

        if (existingTeam) return errorResponse(res, "Email already exists.");

        const teamID = await fetchNextId("teamID");
        const hashedPassword = await hashPassword(password);

        const newTeam = new Team({ teamID, email, leaderName, teamName, password: hashedPassword });
        await newTeam.save();
        await incrementCounter("teamID");
        return successResponse(res, "Team registered successfully");
    } catch (error) {
        return errorResponse(res, "Server error", { error: error.message });
    }
};

// Team Login function
export const teamLogin = async (req, res) => {
    try {
        const { success, errors, validatedData } = validate(loginSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { email, password } = validatedData;

        const team = await Team.findOne({ email });
        if (!team) return errorResponse(res, "no team found for this email");

        const match = await verifyPassword(team.password, password);
        if (!match) {
            return errorResponse(res, "Password Error", "Incorrect Password");
        }
        const token = generateToken({ id: team._id, role: "team" });
        return successResponse(res, "Team Logged in successfully", { jwtToken: token });
    } catch (error) {
        return errorResponse(res, "Server error", { error: error.message }, 500);
    }
};
