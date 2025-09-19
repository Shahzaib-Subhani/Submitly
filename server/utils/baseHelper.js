import Counter from "../models/counter.js";

// function to return success response
export const successResponse = (res, message, data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
        status: true,
        message,
        data
    });
};

// function to return error response
export const errorResponse = (res, message, errors = [], statusCode = 400) => {
    return res.status(statusCode).json({
        status: false,
        message,
        errors
    });
};

// Function to validate request w.r.t schema
export const validate = (schema, data) => {
    const { error, value } = schema.validate(data, { abortEarly: false });

    if (error) {
        return {
            success: false,
            errors: error.details.map((err) => ({ [err.context.key]: err.message.replace(/["\\]/g, "") }))
        };
    }
    return { success: true, value };
};

// function to get module ID from DB
export const fetchNextId = async (idName) => {
    const counter = await Counter.findOne({ idName });
    return counter ? counter.seq + 1 : 1;
};

// function to increment Module ID
export const incrementCounter = async (idName) => {
  const counter = await Counter.findOneAndUpdate(
    { idName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
};