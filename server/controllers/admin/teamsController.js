import Team from "../../models/team.js";
import { errorResponse, successResponse } from "../../utils/baseHelper.js";

// function to get all teams records
export const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find() .select("-password -__v -updatedAt").sort({ createdAt: -1 });

        if (!teams || teams.length === 0) {
            return successResponse(res, "No teams found", 200, []);
        }

        return successResponse(res, "Teams fetched successfully", teams, 200);
    } catch (err) {
        return errorResponse(res, "Server error", { error: err.message }, 500);
    }
};