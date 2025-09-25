import argon2 from "argon2";
import Team from "../../models/team.js";
import { errorResponse, fetchNextId, incrementCounter, successResponse, validate } from "../../utils/baseHelper.js";
import { loginSchema, teamRegisterSchema } from "../../utils/validations.js";
import { generateJwtToken, hashPassword, verifyPassword } from "../../utils/authHelper.js";
import TeamMember from "../../models/teamMember.js";

// Team Registration function
export const teamRegister = async (req, res) => {
    try {
        // validate request body
        const { success, errors, validatedData } = validate(teamRegisterSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { email, leaderName, teamName, password } = validatedData;

        // fetch team and check if exists already
        const existingTeam = await Team.findOne({ email });
        if (existingTeam) return errorResponse(res, "Duplicate Email Error", "Email already exists.");

        // Register Team
        const teamID = await fetchNextId("teamID");
        const hashedPassword = await hashPassword(password);

        const newTeam = new Team({ teamID, email, leaderName, teamName, password: hashedPassword });
        await newTeam.save();
        await incrementCounter("teamID");

        // Register Team Member
        const memberID = await fetchNextId("teamMemberID");
        const leaderMember = new TeamMember({
            teamMemberID: memberID,
            name: leaderName,
            email: email,
            role: "Leader"
        });
        await leaderMember.save();
        newTeam.members.push(leaderMember._id);
        await newTeam.save();

        await incrementCounter("teamMemberID");

        return successResponse(res, "Team registered successfully");
    } catch (error) {
        return errorResponse(res, "Server error", error.message, 500);
    }
};

// Team Login function
export const teamLogin = async (req, res) => {
    try {
        // validate request body
        const { success, errors, validatedData } = validate(loginSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { email, password } = validatedData;

        // fetch and check team credentials
        const team = await Team.findOne({ email });
        if (!team) return errorResponse(res, "team not found", "no team found for this email");

        const match = await verifyPassword(team.password, password);
        if (!match) {
            return errorResponse(res, "Password Error", "Incorrect Password for email");
        }
        const token = generateJwtToken({ userId: team.id, role: "team" });
        return successResponse(res, "Team Logged in successfully", { jwtToken: token });
    } catch (error) {
        return errorResponse(res, "Server error", error.message, 500);
    }
};
