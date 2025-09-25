import Admin from "../models/admin.js";
import Evaluator from "../models/evaluator.js";
import Team from "../models/team.js";
import { verifyJwtToken } from "../utils/authHelper.js";
import { errorResponse } from "../utils/baseHelper.js";

// function to authenticate user
export const authenticateUser = async (req, res, next) => {
    try {
        // Check for Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer "))
            return errorResponse(res, "Unauthorized: Token missing", null, 401);

        const token = authHeader.split(" ")[1];

        // Verify token
        const { userId, role } = verifyJwtToken(token);

        const UserModels = { admin: Admin, team: Team, evaluator: Evaluator };
        const User = UserModels[role];

        if (!User) {
            return errorResponse(res, "Unauthorized: Invalid user type", null, 401);
        }

        const user = await User.findById(userId);

        if (!user) {
            return errorResponse(res, "Unauthorized: User not found", null, 401);
        }

        req.user = { id: userId, role, email: user.email };
        next();

    } catch (err) {
        return errorResponse(res, err.message, null, 401);
    }
};

// function to authorize user for current route
export const authorizeRole = allowedRole => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== allowedRole) {
            return errorResponse(res, "Forbidden: Access denied", null, 403)
        };
        next();
    };
};

export const authorizeSelf = role => {
    return (req, res, next) => {
        const resourceID = req.body[`${role}ID`];
        if (!resourceID) {
            return errorResponse(res, `Bad request: missing ${role}ID`, null, 400);
        }
        if (resourceID !== req.user.id) {
            return errorResponse(res, "Forbidden: Access denied", null, 403);
        }
        next();
    };
};