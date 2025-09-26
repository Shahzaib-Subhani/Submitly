import mongoose from "mongoose";
import Counter from "../models/counter.js";
import Deadline from "../models/deadline.js";

// function to return success response
export const successResponse = (res, message, data = null, statusCode = 200) => {
    return res.status(statusCode).json({
        status: true,
        message,
        data
    });
};

// function to return error response
export const errorResponse = (res, message, error = null, statusCode = 400) => {
    return res.status(statusCode).json({
        status: false,
        message,
        error: error || message
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
    return { success: true, validatedData: value };
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

// function to get page, pageSize, skip and limit in int
export const getSkipAndLimit = (page, pageSize) => {
    const pageInt = parseInt(page);
    const pageSizeInt = parseInt(pageSize);
    const skip = (page - 1) * pageSize;

    return { skip, limit: pageSizeInt, pageInt, pageSizeInt };
}

// function to escape user input for search
export const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");


// function to build query for DB search 
export const buildSearchQuery = (search, searchType, columns, columnID) => {
    const query = {};
    if (!search) return query;
    // condition to exact match columnID
    if (columnID === searchType) {
        const num = Number(search);
        if (isNaN(num)) throw new Error("Invalid Search: teamID must be a number");
        query[columnID] = num;
    }
    else {
        // condition to regex partial match for string columns
        if (!columns.includes(searchType)) throw new Error("Invalid Search Type");
        const safeSearch = escapeRegex(search);
        query[searchType] = { $regex: safeSearch, $options: "i" };
    }
    return query;
}

// function to get pagination detail for model
export const getPaginationInfo = (totalRecords, currentPage, pageSize, skip, limit) => {
    const totalPages = Math.ceil(totalRecords / pageSize);
    const fromRecord = totalRecords === 0 ? 0 : skip + 1;
    const toRecord = Math.min(skip + limit, totalRecords);

    return {
        totalRecords,
        totalPages,
        currentPage: currentPage,
        pageSize: pageSize,
        fromRecord,
        toRecord,
    };
}

// check valid MongoDB ObjectId
export const validateObjectID = (res, id, name) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return errorResponse(
            res,
            `Invalid ${name} Format`,
            `The provided ${name} is not a valid MongoDB ObjectId`,
            400
        );
    }
    return true;
};

// check deadline 
export const checkDeadline = async () => {
    const now = new Date();

    const deadline = await Deadline.findOne({ deadlineType: "submission" }).lean();
    if (!deadline) return false; 

    const deadlineDate = new Date(deadline.deadlineDate);
    deadlineDate.setHours(23, 59, 59, 999); 

    return now <= deadlineDate;
};
