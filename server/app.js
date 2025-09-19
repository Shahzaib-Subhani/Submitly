import connectDB from "./config/db.js"
import dotenv from 'dotenv'
import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.js"

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server Error" })

});

export default app;