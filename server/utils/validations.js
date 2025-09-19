import Joi from "joi";

// team registration validation schema
export const teamRegisterSchema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    leaderName: Joi.string().min(3).required().label("Leader Name"),
    teamName: Joi.string().min(3).required().label("Team Name"),
    password: Joi.string().min(6).required().label("Password")
});

// team login validation schema
export const teamLoginSchema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Password")
});