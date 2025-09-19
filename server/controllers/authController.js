import argon2 from "argon2";
import Team from "../models/team.js";
import { errorResponse, fetchNextId, incrementCounter, successResponse, validate } from "../utils/baseHelper.js";
import { teamRegisterSchema } from "../utils/validations.js";
import { verifyPassword } from "../utils/authHelper.js";

// Team Registration function
export const teamRegister = async (req, res) => {

    const { success, errors, value } = validate(teamRegisterSchema, req.body);
    if (!success) return errorResponse(res, "Validation error", errors);
    const { email, leaderName, teamName, password } = req.body;

    const existingTeam = await Team.findOne({ email });

    if (existingTeam) return errorResponse(res, "Email already exists.");

    const teamID = await fetchNextId("teamID");


    const newTeam = new Team({ teamID: 2, email, leaderName, teamName, password: hashedPassword });
    await newTeam.save();
    await incrementCounter("teamID");
    return successResponse(res, "Team registered successfully");
};

// Team Login function
export const teamLogin = async (req, res) => {

    const { success, errors, value } = validate(teamLoginSchema, req.body);
    if (!success) return errorResponse(res, "Validation error", errors);
    const { email, password } = req.body;

    const team = await Team.findOne({ email });
    if (!user) return errorResponse(res, "no team found for this email");

    const match = verifyPassword(password, team.password);
    console.log(team, match);
    
    const newTeam = new Team({ teamID: 2, email, leaderName, teamName, password: hashedPassword });
    await newTeam.save();
    await incrementCounter("teamID");
    return successResponse(res, "Team registered successfully");
};
