import Evaluation from "../models/evaluation.js";
import Leaderboard from "../models/leaderboard.js";
import Submission from "../models/submission.js";

// Submission status update function
export const updateSubmissionStatus = async (submissionID, evaluationCount) => {
    const status = evaluationCount < 3 ? "partially evaluated" : "evaluation completed";
    return await Submission.findByIdAndUpdate(
        submissionID,
        { status },
        { new: true }
    );
};

// function to update leaderboard on submission evaluation
export const updateLeaderboard = async (submissionID) => {
    //  Fetch all evaluations for submissionID
    const evaluations = await Evaluation.find({ submissionID }).lean();
    if (!evaluations.length) return null;

    const evaluatorRecords = evaluations.map(e => ({
        evaluatorID: e.evaluatorID,
        scores: e.scores,
        totalScore: e.totalScore,
        feedback: e.feedback
    }));

    // Calculate average 
    const criteriaKeys = [
        "relevance",
        "innovation",
        "clarity",
        "depth",
        "engagement",
        "technology",
        "scalability",
        "ethics",
        "application",
        "videoQuality"
    ];

    const averageScores = {};
    criteriaKeys.forEach(key => {
        const sum = evaluations.reduce((acc, evalItem) => acc + (evalItem.scores[key] || 0), 0);
        averageScores[key] = parseFloat((sum / evaluations.length).toFixed(2));
    });

    // Calculate average totalScore
    const totalScoreSum = evaluations.reduce((acc, evalItem) => acc + (evalItem.totalScore || 0), 0);
    const averageTotalScore = parseFloat((totalScoreSum / evaluations.length).toFixed(2));

    const averageScore = {
        scores: averageScores,
        totalScore: averageTotalScore
    }

    // upsert leaderboard
    await Leaderboard.findOneAndUpdate(
        { submissionID },
        { submissionID, evaluations: evaluatorRecords, averageScore },
        { upsert: true, new: true }
    );

    return await updateSubmissionStatus(submissionID, evaluations.length);
};
