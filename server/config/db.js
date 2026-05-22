import mongoose from "mongoose";


let isConnected = false;

const connectDB = async () => {
   
    if (isConnected) {
        console.log("Using cached MongoDB connection.");
        return;
    }
    console.log(process.env.MONGO_URI);
    
    try {
        console.log("Connecting to MongoDB URI:", process.env.MONGO_URI ? "Found" : "Missing");
        
        const db = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, 
        });
        
        isConnected = db.connections[0].readyState === 1;
        console.log("DB Connected successfully.");
        
    } catch (err) {
        console.error("MongoDB Connection Attempt Failed:", err.message);
        throw err; 
    }
}

export default connectDB;