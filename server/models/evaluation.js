import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema({
    evaluationID: { type: Number, required: true },
    evaluatorID: { type: mongoose.Schema.Types.ObjectId, ref: "Evaluator", required: true },
    submissionID: { type: mongoose.Schema.Types.ObjectId, ref: "Submission", required: true },
    scores: {
        relevance: Number,
        innovation: Number,
        clarity: Number,
        depth: Number,
        engagement: Number,
        technology: Number,
        scalability: Number,
        ethics: Number,
        application: Number,
        videoQuality: Number,
    },
    totalScore: { type: Number },
    feedback: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

export default Evaluation;