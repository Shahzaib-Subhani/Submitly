import Joi from "joi";

// team registration validation schema
export const teamRegisterSchema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    leaderName: Joi.string().min(3).max(100).required().label("Leader Name"),
    teamName: Joi.string().min(3).max(100).required().label("Team Name"),
    password: Joi.string().min(6).max(100).required().label("Password"),
    confirmPassword: Joi.string().required().valid(Joi.ref("password"))
        .label("Confirm Password").messages({ "any.only": "{{#label}} does not match Password" })
});

// login validation schema
export const loginSchema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Password")
});

// evaluator registration validation schema
export const evaluatorRegisterSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    qualification: Joi.string().min(3).max(100).label("Qualification"),
    experience: Joi.string().min(3).max(100).label("Experience"),
    password: Joi.string().min(6).max(100).required().label("Password"),
    confirmPassword: Joi.string().required().valid(Joi.ref("password"))
        .label("Confirm Password").messages({ "any.only": "{{#label}} does not match Password" })
});

// admin registration validation schema
export const adminRegisterSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).max(100).required().label("Password"),
    confirmPassword: Joi.string().required().valid(Joi.ref("password"))
        .label("Confirm Password").messages({ "any.only": "{{#label}} does not match Password" })
});

// forgot password validation schema
export const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    userType: Joi.string().valid("admin", "team", "evaluator").required().label("Type")
});

// otp Verify validation schema
export const otpVerifySchema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    otp: Joi.string().length(6).pattern(/^[0-9]+$/).required().label("OTP").messages({
        "string.pattern.base": `otp must contain only numbers`,
    }),
    userType: Joi.string().valid("admin", "team", "evaluator").required().label("Type")
});

// update Password validation schema
export const updatePasswordSchema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    resetToken: Joi.string().length(64).required().label("Reset Token"),
    userType: Joi.string().valid("admin", "team", "evaluator").required().label("Type"),
    password: Joi.string().min(6).max(100).required().label("Password"),
    confirmPassword: Joi.string().required().valid(Joi.ref("password"))
        .label("Confirm Password").messages({ "any.only": "{{#label}} does not match Password" })
});

// team update validation schema
export const teamUpdateSchema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    leaderName: Joi.string().min(3).max(100).required().label("Leader Name"),
    teamName: Joi.string().min(3).max(100).required().label("Team Name"),
    password: Joi.string().min(6).max(100).label("Password"),
    confirmPassword: Joi.string().valid(Joi.ref("password"))
        .label("Confirm Password").messages({ "any.only": "{{#label}} does not match Password" })
});

// team member update validation schema
export const teamMemberUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    role: Joi.string().min(3).max(100).required(),
});

