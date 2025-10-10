import apiClient from "../utils/apiClient";

// fetch teams list  API
export const fetchTeams = async (page, pageSize, searchType, search) => {
    return await apiClient.get(`api/admin/teams?page=${page}&pageSize=${pageSize}&search=${search}&searchType=${searchType}`);
};

// -----------------Teams--------------------

// fetch team by ID  API
export const fetchTeamDetails = async (teamID) => {
    return await apiClient.get(`api/admin/teams/${teamID}`);
};
// update team  API
export const updateTeamDetails = async (teamID, data) => {
    return await apiClient.patch(`api/admin/teams/${teamID}`, data);
};
// delete team  API
export const deleteTeam = async (teamID) => {
    return await apiClient.delete(`api/admin/teams/${teamID}`);
};
// add team Member  API
export const createTeamMember = async (teamID, data) => {
    return await apiClient.post(`api/admin/teams/${teamID}/members`, data);
};
// update team Member  API
export const updateTeamMember = async (teamID, memberID, data) => {
    return await apiClient.patch(`api/admin/teams/${teamID}/members/${memberID}`, data);
};
// delete team Member  API
export const deleteTeamMember = async (teamID, memberID) => {
    return await apiClient.delete(`api/admin/teams/${teamID}/members/${memberID}`);
};

// -------------Evaluators--------------------

// fetch evaluators list  API
export const fetchEvaluators = async (page, pageSize, searchType, search) => {
    return await apiClient.get(`api/admin/evaluators?page=${page}&pageSize=${pageSize}&search=${search}&searchType=${searchType}`);
};

//  fetch evaluator by ID  API
export const fetchEvaluatorDetails = async (evaluatorID) => {
    return await apiClient.get(`api/admin/evaluators/${evaluatorID}`);
};

// update evaluator  API
export const updateEvaluatorDetails = async (evaluatorID, data) => {
    return await apiClient.patch(`api/admin/evaluators/${evaluatorID}`, data);
};
// delete evaluator  API
export const deleteEvaluator = async (evaluatorID) => {
    return await apiClient.delete(`api/admin/evaluators/${evaluatorID}`);
};
// approve evaluator  API
export const approveEvaluator = async (evaluatorID, data) => {
    return await apiClient.patch(`api/admin/evaluators/${evaluatorID}/verify`, data);
};

// ---------------Submissions--------------------

// fetch submission list  API
export const fetchSubmissions = async (page, pageSize, searchType, search) => {
    return await apiClient.get(`api/admin/submissions?page=${page}&pageSize=${pageSize}&search=${search}&searchType=${searchType}`);
};

//  fetch submission by ID  API
export const fetchSubmissionDetails = async (submissionID) => {
    return await apiClient.get(`api/admin/submissions/${submissionID}`);
};
//  fetch evaluators for submission
export const fetchEvaluatorsForSubmission = async () => {
    return await apiClient.get(`api/admin/evaluators/list/name`);
};

// assign evaluator submission  API
export const assignSubmission = async (submissionID, data) => {
    return await apiClient.patch(`api/admin/submissions/${submissionID}/assign-evaluators`, data);
};
// delete submission  API
export const deleteSubmission = async (submissionID) => {
    return await apiClient.delete(`api/admin/submissions/${submissionID}`);
};

// ---------------Evaluations--------------------

// fetch evaluations list  API
export const fetchEvaluations = async (page, pageSize, searchType, search) => {
    return await apiClient.get(`api/admin/evaluations?page=${page}&pageSize=${pageSize}&search=${search}&searchType=${searchType}`);
};

//  fetch evaluation by ID  API
export const fetchEvaluationDetails = async (evaluationID) => {
    return await apiClient.get(`api/admin/evaluations/${evaluationID}`);
};

// fetch admin profile API
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