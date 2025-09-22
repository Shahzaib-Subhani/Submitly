import connectDB from "./config/db.js"
import dotenv from 'dotenv'
import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.js"
import adminRoutes from "./routes/admin.js"
import { errorResponse } from "./utils/baseHelper.js"
import { createDefaultAdmin } from "./utils/authHelper.js"

dotenv.config();
connectDB();
await createDefaultAdmin();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    if (req.method === "POST") {
        if (!req.body || Object.keys(req.body).length === 0) {
            return errorResponse(res, "Request body is missing or empty");
        }
    }
    next();
});

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use((err, req, res, next) => {
    const errMessage = err.message || "Internal server Error";
    return errorResponse(res, errMessage, {}, 500)

});

export default app;