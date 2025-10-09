import apiClient from "../utils/apiClient";

// fetch submission list  API
export const fetchEvaluatorSubmissions = async (evaluatorID, page, pageSize, searchType, search) => {
    return await apiClient.get(`api/evaluator/submissions/${evaluatorID}?page=${page}&pageSize=${pageSize}&search=${search}&searchType=${searchType}`);
};
// fetch submission detail  API
export const fetchEvaluatorSubmissionDetail = async (submissionID, evaluatorID) => {
    return await apiClient.get(`api/evaluator/submissions/${submissionID}/evaluate/${evaluatorID}`);
};
// evaluate submission detail  API
export const evaluateSubmission = async (submissionID, data) => {
    return await apiClient.post(`api/evaluator/submission/${submissionID}/evaluate`, data);
};

// fetch evaluations list  API
export const fetchEvaluations = async (evaluatorID, page, pageSize, searchType, search) => {
    return await apiClient.get(`api/evaluator/evaluations/${evaluatorID}?page=${page}&pageSize=${pageSize}&search=${search}&searchType=${searchType}`);
};
// fetch evaluation detail  API
export const fetchEvaluationDetail = async (evaluationID, evaluatorID) => {
    return await apiClient.get(`api/evaluator/evaluations/${evaluationID}/evaluator/${evaluatorID}`);
};

// fetch evaluation details API
export const fetchEvaluatorProfile = async (evaluatorID) => {
    return await apiClient.get(`api/evaluator/profile/${evaluatorID}`);
};

// update evaluator profile API
export const updateEvaluatorProfile = async (evaluatorID, data) => {
    return await apiClient.post(`api/evaluator/profile/${evaluatorID}/update`, data);
};
// update evaluator password API
export const updateEvaluatorPassword = async (evaluatorID, data) => {
    return await apiClient.post(`api/evaluator/profile/${evaluatorID}/password-update`, data);
};


export const formattedDate = (isoDate) => {
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    const formatted = `${formattedDate}, ${formattedTime}`;
    return formatted
}