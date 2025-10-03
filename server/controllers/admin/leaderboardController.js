import Leaderboard from "../../models/leaderboard.js";
import { buildSearchQuery, errorResponse, escapeRegex, getPaginationInfo, getSkipAndLimit, successResponse } from "../../utils/baseHelper.js";
import { facetGenerator, submissionLookup, teamLookup } from "../../utils/pipelineHelper.js";


// function to get leaderboard
export const getLeaderboard = async (req, res) => {
    try {
        const { page = 1, pageSize = 10, search = "", searchType = "" } = req.query;
        const columns = {
            leaderName: { path: "team.leaderName", type: "string" },
            teamName: { path: "team.teamName", type: "string" },
            totalScore: { path: "averageScore.totalScore", type: "number" }
        };
        const query = buildSearchQuery(search, searchType, columns, true);

        const { limit, skip, pageInt, pageSizeInt } = getSkipAndLimit(page, pageSize);
        const projectFields = {
            "_id": 0,
            totalScore: "$averageScore.totalScore",
            scores: "$averageScore.scores",
            leaderName: "$team.leaderName",
            teamName: "$team.teamName"
        };
        const pipeline = [
            ...submissionLookup({ topic: 1, teamID: 1, submissionID: 1, status: 1 }),
            ...teamLookup({ teamName: 1, leaderName: 1 }, "$submission.teamID"),
            { $match: { "submission.status": "evaluation completed" } },
            ...query,
            ...facetGenerator(projectFields, skip, limit, "leaderboard", { "averageScore.totalScore": -1 }),
        ];

        // fetch leaderboard
        const result = await Leaderboard.aggregate(pipeline);
        const { leaderboard, totalRecords } = result[0];
        // build pagination record
        const paginationRecord = getPaginationInfo(totalRecords, pageInt, pageSizeInt, skip, limit);

        return successResponse(res, "Evaluators fetched successfully", {
            leaderboard,
            pagination: paginationRecord
        });
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};