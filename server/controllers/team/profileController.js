
import Team from "../../models/team.js";
import { hashPassword } from "../../utils/authHelper.js";
import { errorResponse, successResponse, validate, validateObjectID } from "../../utils/baseHelper.js";
import { adminUpdateSchema, teamUpdateSchema, updateProfilePasswordSchema } from "../../utils/validations.js";

const TEAM_NOT_FOUND_ERR = "Team not found";
const TEAM_NOT_FOUND_MESSAGE = "No team exists in the database for given teamID";

// function to get profile data
export const getTeamProfile = async (req, res) => {
    try {
        const { teamID } = req.params;
        if (!validateObjectID(res, teamID, "teamID")) return;
        // fetch team by id
        const team = await Team.findById(teamID)
            .select("teamName leaderName email")
            .lean();

        if (!team) {
            return errorResponse(res, TEAM_NOT_FOUND_ERR, TEAM_NOT_FOUND_MESSAGE, 404);
        }

        return successResponse(res, "Team fetched successfully", team);
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};

// function to update team record
export const updateTeam = async (req, res) => {
    try {
        const { teamID } = req.params;
        if (!validateObjectID(res, teamID, "teamID")) return;
        // validate request body
        const { success, errors, validatedData } = validate(teamUpdateSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { email, leaderName, teamName } = validatedData;
        // prepare update data
        const updateData = { teamName, leaderName, email };
        // update team record
        const updatedTeam = await Team.findOneAndUpdate(
            { _id: teamID },
            updateData,
            { new: true }
        ).select("teamName leaderName email");
        if (!updatedTeam) return errorResponse(res, TEAM_NOT_FOUND_ERR, TEAM_NOT_FOUND_MESSAGE, 404);

        return successResponse(res, "Admin updated successfully", updatedTeam);
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};

// function to update password record
export const updatePassword = async (req, res) => {
    try {
        const { teamID } = req.params;
        if (!validateObjectID(res, teamID, "teamID")) return;
        // validate request body
        const { success, errors, validatedData } = validate(updateProfilePasswordSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { password } = validatedData;

        const hashedPassword = await hashPassword(password);

        // update team password
        const updatedTeam = await Team.findOneAndUpdate(
            { _id: teamID },
            { password: hashedPassword }
        );
        if (!updatedTeam) return errorResponse(res, TEAM_NOT_FOUND_ERR, TEAM_NOT_FOUND_MESSAGE, 404);

        return successResponse(res, "Password updated successfully");
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};