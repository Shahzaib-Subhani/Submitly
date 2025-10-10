import apiClient from "../utils/apiClient";

// fetch teams list  API
export const fetchTeams = async (page, pageSize, searchType, search) => {
    return await apiClient.get(`api/admin/teams?page=${page}&pageSize=${pageSize}&search=${search}&searchType=${searchType}`);
};

// fetch team by ID  API
export const fetchTeamDetails = async (teamID) => {
    return await apiClient.get(`api/admin/teams/${teamID}`);
};

// update team  API
export const updateTeamDetails = async (teamID, data) => {
    return await apiClient.patch(`api/admin/teams/${teamID}`, data);
};

// fetch evaluation details API
export const fetchAdminProfile = async (adminID) => {
    return await apiClient.get(`api/admin/profile/${adminID}`);
};

// update admin profile API
export const updateAdminProfile = async (adminID, data) => {
    return await apiClient.post(`api/admin/profile/${adminID}/update`, data);
};
// update admin password API
export const updateAdminPassword = async (adminID, data) => {
    return await apiClient.post(`api/admin/profile/${adminID}/password-update`, data);
};