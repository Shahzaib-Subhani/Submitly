// lookup for Submission
export const submissionLookup = (projectFields) => [
    {
        $lookup: {
            from: "submissions", let: { submissionID: "$submissionID" }, pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$submissionID"] } } },
                { $project: projectFields }
            ], as: "submission"
        }
    },
    { $addFields: { submission: { $arrayElemAt: ["$submission", 0] } } },
];

// lookup for Evaluator
export const evaluatorLookup = (projectFields) => [
    {
        $lookup: {
            from: "evaluators", let: { evaluatorID: "$evaluatorID" }, pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$evaluatorID"] } } },
                { $project: projectFields }
            ], as: "evaluator"
        }
    },
    { $addFields: { evaluator: { $arrayElemAt: ["$evaluator", 0] } } },
];

// lookup for Team
export const teamLookup = (projectFields, localField) => [
    {
        $lookup: {
            from: "teams", let: { teamID: localField }, pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$teamID"] } } },
                { $project: projectFields }
            ], as: "team"
        }
    },
    { $addFields: { team: { $arrayElemAt: ["$team", 0] } } },
];

// facet generator 
export const facetGenerator = (projectFields, skip, limit, outputCol, sort = { createdAt: -1 }) => [
    {
        $facet: {
            [outputCol]: [
                {
                    $project: projectFields
                },
                { $sort: sort },
                { $skip: skip },
                { $limit: limit }
            ],
            totalCount: [{ $count: "total" }]
        }
    },
    {
        $project: {
            [outputCol]: 1,
            totalRecords: { $ifNull: [{ $first: "$totalCount.total" }, 0] }
        }
    }
];