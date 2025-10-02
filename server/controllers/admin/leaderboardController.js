import Leaderboard from "../../models/leaderboard.js";
import { buildSearchQuery, errorResponse, escapeRegex, getPaginationInfo, getSkipAndLimit, successResponse } from "../../utils/baseHelper.js";


// function to get leaderboard
export const getLeaderboard = async (req, res) => {
    try {
        const { page = 1, pageSize = 10, search = "", searchType = "email" } = req.query;
        const columns = {
            leaderName: "team.leaderName",
            teamName: "team.teamName",
            totalScore: "averageScore.totalScore"
        };
        const query = buildSearchQuery(search, searchType, columns, true);
        console.log(query);

        const { limit, skip, pageInt, pageSizeInt } = getSkipAndLimit(page, pageSize);

        const pipeline = [
            { $lookup: { from: "submissions", localField: "submissionID", foreignField: "_id", as: "submission" } },
            { $unwind: { path: "$submission", preserveNullAndEmptyArrays: true } },
            { $lookup: { from: "teams", localField: "submission.teamID", foreignField: "_id", as: "team" } },
            { $unwind: { path: "$team", preserveNullAndEmptyArrays: true } },
            { $match: { "submission.status": "evaluation completed" } },
            ...query,
            {
                $project: {
                    "_id" : 0,
                    "averageScore.totalScore": 1,
                    "averageScore.scores": 1,
                    "team.leaderName": 1,
                    "team.teamName": 1
                }
            },
            { $skip: skip },
            { $limit: limit }

        ];

        // fetch leaderboard
        const leaderboard = await Leaderboard.aggregate(pipeline);

        // fetch total count of model
        const totalRecords = await Leaderboard.countDocuments();
        const paginationRecord = getPaginationInfo(totalRecords, pageInt, pageSizeInt, skip, limit);

        return successResponse(res, "Evaluators fetched successfully", {
            leaderboard,
            pagination: paginationRecord
        });
    } catch (err) {
        return errorResponse(res, "Server error", err.message, 500);
    }
};