import toast from "react-hot-toast";
import apiClient from "../utils/apiClient";

// handle register team API
export const registerTeam = async (teamData) => {
    return await apiClient.post("api/auth/team/register", teamData);
};

// handle team login API
export const loginTeam = async (teamData) => {
    return await apiClient.post("api/auth/team/signin", teamData);
};

// handle register evaluator API
export const registerEvaluator = async (data) => {
    return await apiClient.post("api/auth/evaluator/register", data);
};

// handle login evaluator API
export const loginEvaluator = async (data) => {
    return await apiClient.post("api/auth/evaluator/signin", data);
};
// handle login admin API
export const loginAdmin = async (data) => {
    return await apiClient.post("api/auth/admin/signin", data);
};

export const users = {
    team: { token: "teamJwtToken", user: "team" },
    evaluator: { token: "evaluatorJwtToken", user: "evaluator" },
    admin: { token: "adminJwtToken", user: "admin" },
}

// save auth token 
export const saveToken = (token, tokenType, user = null, userType = null) => {

    localStorage.setItem(tokenType, token);
    if (user) {
        localStorage.setItem(userType, JSON.stringify(user));
    }
};
// get auth token
export const getToken = (userType) => localStorage.getItem(users[userType].token);

// handle logout
export const logout = (navigate, userType) => {
    clearAuthData(userType);
    navigate("/login");
};

// handle login Success
export const handleLoginSuccess = (response, navigate, redirectPath = "/team", authType, setUser) => {

    const token = response.data.jwtToken;
    const user = response.data.user;
    const userType = users[authType].user;
    const tokenType = users[authType].token;
    user.role = userType;

    saveToken(token, tokenType, user, userType);
    if (setUser) setUser(user);
    const successMsg = {
        main: response?.message || "form submitted",
        sub: false
    };

    toast.success(successMsg);
    setTimeout(() => {
        navigate(redirectPath, { replace: true });
    }, 1000);
};

export const clearAuthData = (userType = "team") => {
    if (!users[userType]) return;

    const tokenKey = users[userType].token;
    const userKey = users[userType].user;

    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);
};



// Check AUth token
export const isAuthError = (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message?.toLowerCase?.() || "";
    return (
        status === 401 &&
        (message.includes("jwt expired") ||
            message.includes("invalid token") ||
            message.includes("invalid signature") ||
            message.includes("unauthorized"))
    );
};


export const fetchUserType = (config) => {
    const segments = config.url.split("/").filter(Boolean);
    const userTypes = {
        team: "team",
        evaluator: "evaluator",
        admin: "admin",
    }
    return userTypes[segments[1]] || "";
}