import apiClient from "../utils/apiClient";

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