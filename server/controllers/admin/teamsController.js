import Team from "../../models/team.js";
import { buildSearchQuery, errorResponse, getPaginationInfo, getSkipAndLimit, successResponse, validate, validateObjectID } from "../../utils/baseHelper.js";
import TeamMember from "../../models/teamMember.js";
import { teamUpdateSchema } from "../../utils/validations.js";
import { hashPassword } from "../../utils/authHelper.js";

const TEAM_NOT_FOUND_ERR = "Team not found";
const TEAM_NOT_FOUND_MESSAGE = "No team exists in the database for given teamID";

// function to get all teams records
export const getAllTeams = async (req, res) => {
    try {

        const { page = 1, pageSize = 10, search = "", searchType = "email" } = req.query;
        const columns = ["email", "leaderName", "teamName"];
        const query = buildSearchQuery(search, searchType, columns, "teamID");

        const { limit, skip, pageInt, pageSizeInt } = getSkipAndLimit(page, pageSize);

        //   fetch and count teams
        const teams = await Team.find(query)
            .select("-password -__v -updatedAt -members")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // fetch total count of model
        const totalRecords = await Team.countDocuments(query);
        const paginationRecord = getPaginationInfo(totalRecords, pageInt, pageSizeInt, skip, limit);

        return successResponse(res, "Teams fetched successfully", {
            teams,
            pagination: paginationRecord
        });
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};

// function to get single team record
export const getTeamById = async (req, res) => {
    try {
        const { teamID } = req.params;
        if (!validateObjectID(res, teamID, "teamID")) return;
        // fetch team by id
        const team = await Team.findById(teamID).select("-password -__v -updatedAt").populate("members", "-__v -createdAt -updatedAt");

        if (!team) {
            return errorResponse(res, TEAM_NOT_FOUND_ERR, TEAM_NOT_FOUND_MESSAGE, 404);
        }
        return successResponse(res, "Team fetched successfully", team);
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};

// function to delete single team record
export const deleteTeam = async (req, res) => {
    try {
        const { teamID } = req.params;
        if (!validateObjectID(res, teamID, "teamID")) return;
        // fetch team
        const team = await Team.findById(teamID);
        if (!team) return errorResponse(res, TEAM_NOT_FOUND_ERR, TEAM_NOT_FOUND_MESSAGE, 404);
        // delete all team members 
        await TeamMember.deleteMany({ _id: { $in: team.members } });
        // delete team
        await Team.findByIdAndDelete(teamID);

        return successResponse(res, "Team deleted successfully");
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
        const { email, leaderName, teamName, password } = validatedData;
        // prepare update data
        const updateData = { teamName, leaderName, email };
        if (password) {
            const hashedPassword = await hashPassword(password);
            updateData.password = hashedPassword;
        }
        // update team record
        const updatedTeam = await Team.findOneAndUpdate(
            { _id: teamID },
            updateData,
            { new: true }
        ).select("-__v -updatedAt -members -password");
        if (!updatedTeam) return errorResponse(res, TEAM_NOT_FOUND_ERR, TEAM_NOT_FOUND_MESSAGE, 404);

        return successResponse(res, "Team updated successfully", updatedTeam);
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};