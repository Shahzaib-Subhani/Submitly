import mongoose from "mongoose";
import Team from "../../models/team.js";
import { errorResponse, fetchNextId, incrementCounter, successResponse, validate } from "../../utils/baseHelper.js";
import TeamMember from "../../models/teamMember.js";
import { teamMemberUpdateSchema } from "../../utils/validations.js";

// function to get all team Members 
export const getAllTeamMembers = async (req, res) => {
    try {
        const { teamID } = req.params;
        if (!mongoose.Types.ObjectId.isValid(teamID)) return errorResponse(res, "Invalid ID format", null, 400);

        // fetch team by id
        const team = await Team.findById(teamID).select("-__v -createdAt -updatedAt -password")
            .populate(
                "members",
                "-__v -createdAt -updatedAt"
            );
        if (!team) return successResponse(res, "No teams found", []);

        return successResponse(res, "Teams fetched successfully", team);
    } catch (err) {
        return errorResponse(res, "Server error", { error: err.message }, 500);
    }
};

// function to add team Member
export const addTeamMember = async (req, res) => {
    try {
        const { teamID } = req.params;
        if (!mongoose.Types.ObjectId.isValid(teamID)) {
            return errorResponse(res, "Invalid ID format", null, 400)
        };

        // validate request body
        const { success, errors, validatedData } = validate(teamMemberUpdateSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { email, name, role } = validatedData;

        // Fetch Team by teamID
        const team = await Team.findById(teamID);
        if (!team) return errorResponse(res, "Team not found", null, 404);

        // Check team members max size
        if (team.members.length >= 5) {
            return errorResponse(res, "A team cannot have more than 5 members", null, 400);
        }
        // Create new team member
        const teamMemberID = await fetchNextId("teamMemberID");
        const newMember = await TeamMember.create({ teamMemberID, name, email, role });
        await incrementCounter("teamMemberID");
        team.members.push(newMember._id);
        await team.save();

        return successResponse(res, "Team Member created successfully");
    } catch (err) {
        return errorResponse(res, "Server error", { error: err.message }, 500);
    }
};

// function to update team Member
export const updateTeamMember = async (req, res) => {
    try {
        const { teamID, memberID } = req.params;
        if (!mongoose.Types.ObjectId.isValid(teamID) || !mongoose.Types.ObjectId.isValid(memberID)) {
            return errorResponse(res, "Invalid ID format", null, 400)
        };
        // validate request body
        const { success, errors, validatedData } = validate(teamMemberUpdateSchema, req.body);
        if (!success) return errorResponse(res, "Validation error", errors);
        const { email, name, role } = validatedData;

        // Fetch Team by teamID
        const team = await Team.findById(teamID);
        if (!team) return errorResponse(res, "Team not found", null, 404);

        // Check if memberID relates to team
        if (!team.members.includes(memberID)) {
            return errorResponse(res, "Member does not belong to this team", null, 400);
        }
        // Update Team Member
        const teamMember = await TeamMember.findByIdAndUpdate(
            memberID,
            { name, email, role },
            { new: true }
        ).select("-__v -createdAt -updatedAt");

        if (!teamMember) return errorResponse(res, "Team Member not found", null);

        return successResponse(res, "Team Member updated successfully", teamMember);
    } catch (err) {
        return errorResponse(res, "Server error", { error: err.message }, 500);
    }
};

// function to delete team Member
export const deleteTeamMember = async (req, res) => {
    try {
        const { teamID, memberID } = req.params;
        if (!mongoose.Types.ObjectId.isValid(teamID) || !mongoose.Types.ObjectId.isValid(memberID)) {
            return errorResponse(res, "Invalid ID format", null, 400)
        };

        // Fetch Team by teamID
        const team = await Team.findById(teamID);
        if (!team) return errorResponse(res, "Team not found", null, 404);

        // Check if memberID relates to team
        if (!team.members.includes(memberID)) {
            return errorResponse(res, "Member does not belong to this team", null, 400);
        }
        // Delete Team Member
        const teamMember = await TeamMember.findByIdAndDelete(memberID);
        team.members = team.members.filter(
            (memberId) => memberId.toString() !== memberID.toString()
        );
        await team.save();
        if (!teamMember) return errorResponse(res, "Team Member not found", null);

        return successResponse(res, "Team Member deleted successfully", null);
    } catch (err) {
        return errorResponse(res, "Server error", { error: err.message }, 500);
    }
};