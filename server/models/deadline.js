import mongoose from "mongoose";

const deadlineSchema = new mongoose.Schema({
    deadlineType: { type: String, required: true },
    deadlineDate: { type: Date, required: true }
}, { timestamps: true });

const Deadline = mongoose.model("Deadline", deadlineSchema);

export default Deadline;