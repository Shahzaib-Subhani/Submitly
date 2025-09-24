import connectDB from "./config/db.js"
import dotenv from 'dotenv'
import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.js"
import adminRoutes from "./routes/admin.js"
import { errorResponse } from "./utils/baseHelper.js"
import { createDefaultAdmin } from "./utils/authHelper.js"

// load .env variables
dotenv.config();
// connect to mongoDB
connectDB();
// create a default admin in DB
await createDefaultAdmin();

// initialize express app
const app = express();

app.use(cors());
// parse request into json
app.use(express.json());

// check for POST and PATCH requests having empty request body
app.use((req, res, next) => {
    if (req.method === "POST" || req.method === "PATCH") {
        if (!req.body || Object.keys(req.body).length === 0) {
            return errorResponse(res, "Request body is missing or empty");
        }
    }
    next();
});

// Auth Routes
app.use("/api/auth", authRoutes);
// Admin Routes
app.use("/api/admin", adminRoutes);

// Route for capturing errors
app.use((err, req, res, next) => {
    const errMessage = err.message || "Internal server Error";
    return errorResponse(res, errMessage, {}, 500)

});

export default app;