import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    submissionID: { type: Number, required: true },
    teamID: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    topic: { type: String, required: true },
    videoURL: { type: String, required: true },
    description: { type: String },
    learningOutcomes: { type: String },
    status: { type: String, default: "pending" },
    evaluators: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Evaluator" }
    ]
}, { timestamps: true });

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;