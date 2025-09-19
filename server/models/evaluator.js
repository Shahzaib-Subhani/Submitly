import mongoose from "mongoose";

const evaluatorSchema = new mongoose.Schema({
    evaluatorID: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    qualification: { type: String },
    experience: { type: String },
    status: { type: String, default: "pending" }
}, { timestamps: true });


const Evaluator = mongoose.model("Evaluator", evaluatorSchema);

export default Evaluator;