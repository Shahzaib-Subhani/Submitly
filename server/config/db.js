import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected DB.");
        
    } catch (err) {
        console.log("DB connection failed");
        process.exit(1);
    }
}

export default connectDB;