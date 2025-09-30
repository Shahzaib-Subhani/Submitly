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

// evaluator update validation schema
export const evaluatorUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    qualification: Joi.string().min(3).max(100).label("Qualification"),
    experience: Joi.string().min(3).max(100).label("Experience"),
    password: Joi.string().min(6).max(100).label("Password"),
    confirmPassword: Joi.string().valid(Joi.ref("password"))
        .label("Confirm Password").messages({ "any.only": "{{#label}} does not match Password" })
});

// evaluator verification validation schema
export const evaluatorVerifySchema = Joi.object({
    status: Joi.string().valid("approved", "rejected").required().label("status"),
});

// Create Submission Validation Schema
export const createSubmissionSchema = Joi.object({
    teamID: Joi.string().label("teamID"),
    topic: Joi.string().max(200).required().label("Topic"),
    videoURL: Joi.string().uri().required().label("Video Link"),
    description: Joi.string().max(1000).allow("", null).label("Description"),
    learningOutcomes: Joi.string().max(1000).allow("", null).label("Learning Outcomes")
});

// Set Deadline Validation Schema
export const setDeadlineSchema = Joi.object({
    deadlineType: Joi.string().valid("submission").required().label("Deadline Type"),
    deadlineDate: Joi.date().iso().required().label("Deadline Date")
});

// Assign Evaluator Validation Schema
export const assignEvaluatorSchema = Joi.object({
    evaluatorIDs: Joi.array()
        .items(Joi.string().length(24).hex()).min(3).required().label("evaluatorIDs array"),
});

const evaluationCriteria = {
    relevance: 5,
    innovation: 15,
    clarity: 10,
    depth: 5,
    engagement: 25,
    technology: 5,
    scalability: 10,
    ethics: 5,
    application: 10,
    videoQuality: 10,
};
const criteria = Object.fromEntries(
    Object.entries(evaluationCriteria).map(([key, max]) => [
        key,
        Joi.number().min(0).max(max).required(),
    ])
);

// evaluate submission validation schema
export const evaluateSubmissionSchema = Joi.object({
    evaluatorID: Joi.string().label("evaluatorID"),
    feedback: Joi.string().max(200).label("feedback"),
    scores: criteria
});


// update password validation schema
export const updateProfilePasswordSchema = Joi.object({
    password: Joi.string().min(6).max(100).required().label("Password"),
    confirmPassword: Joi.string().required().valid(Joi.ref("password"))
        .label("Confirm Password").messages({ "any.only": "{{#label}} does not match Password" })
});

// update admin validation schema
export const adminUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().label("Name"),
    email: Joi.string().email().required().label("Email")
});