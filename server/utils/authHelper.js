import argon2 from "argon2";
import jwt from "jsonwebtoken"
import Admin from "../models/admin.js";

const DEFAULT_ADMIN = {
    name: "Super Admin",
    email: "admin@submittly.com",
    password: "admin123"
};

// function to generate JWT token
export const generateToken = (user) =>
    jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

// function to generate random OTP
export const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// function to create hashed password
export const hashPassword = async (password) => {
    return await argon2.hash(password, {
        type: argon2.argon2id,
    });
}
// function to check hashed password
export const verifyPassword = async (hashed, attemptPassword) => {
    return await argon2.verify(hashed, attemptPassword);
}

// function to create a default admin record in DB
export const createDefaultAdmin = async () => {
    try {
        const existingAdmin = await Admin.findOne({ email: DEFAULT_ADMIN.email });
        if (!existingAdmin) {
            const hashedPassword = await hashPassword(DEFAULT_ADMIN.password);

            const admin = new Admin({
                name: DEFAULT_ADMIN.name,
                email: DEFAULT_ADMIN.email,
                password: hashedPassword
            });

            await admin.save();
            console.log("Default admin created");
        } else {
            console.log("Default admin already exists");
        }
    } catch (error) {
        console.error("Error creating default admin:", error);
    }
};