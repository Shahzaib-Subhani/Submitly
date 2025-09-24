import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    teamID: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    leaderName: { type: String, required: true },
    teamName: { type: String, required: true },
    password: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "TeamMember" }]
}, { timestamps: true });

const Team = mongoose.model("Team", teamSchema);

export default Team;