import argon2 from "argon2";
import jwt from "jsonwebtoken"

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