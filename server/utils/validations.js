import Joi from "joi";

// team registration validation schema
export const teamRegisterSchema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    leaderName: Joi.string().min(3).required().label("Leader Name"),
    teamName: Joi.string().min(3).required().label("Team Name"),
    password: Joi.string().min(6).required().label("Password")
});

// login validation schema
export const loginSchema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Password")
});


// evaluator registration validation schema
export const evaluatorRegisterSchema = Joi.object({
    name: Joi.string().min(3).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
    qualification: Joi.string().min(3).label("Qualification"),
    experience: Joi.string().min(3).label("Experience"),
});
// admin registration validation schema
export const adminRegisterSchema = Joi.object({
    name: Joi.string().min(3).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
});

