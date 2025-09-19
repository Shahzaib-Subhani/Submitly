import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
    teamMemberID: { type: Number, required: true },
    teamID: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
}, { timestamps: true });

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember;