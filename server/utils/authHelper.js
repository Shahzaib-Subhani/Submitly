import jwt from "jsonwebtoken"

// function to generate JWT token
const generateToken = (user) =>
    jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

// function to generate random OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// function to create hashed password
export const hashPassword = async (password) => {
    return await argon2.hash(password);
}
// function to check hashed password
export const verifyPassword = async (hashed, attemptPassword) => {
    return await argon2.verify(hashed, attemptPassword);
}