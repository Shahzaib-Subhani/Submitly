import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema({
    evaluatorID: { type: mongoose.Schema.Types.ObjectId, ref: "Evaluator", required: true },
    submissionID: { type: mongoose.Schema.Types.ObjectId, ref: "Submission", required: true },
    criteriaScores: { type: Object },
    totalScore: { type: String },
    feedback: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

export default Evaluation;