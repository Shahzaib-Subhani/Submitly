import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
    submissionID: { type: mongoose.Schema.Types.ObjectId, ref: "Submission", required: true },
    evaluations: [
        {
            evaluatorID: { type: mongoose.Schema.Types.ObjectId, ref: "Evaluator", required: true },
            scores: { type: Map, of: Number },
            totalScore: Number,
            feedback: { type: String },
        }
    ],
    averageScore: {
        scores: { type: Map, of: Number },
        totalScore: Number
    },
}, { timestamps: true });


const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

export default Leaderboard;