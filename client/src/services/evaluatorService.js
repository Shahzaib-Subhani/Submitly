import apiClient from "../utils/apiClient";

// fetch submission  API
export const fetchEvaluatorSubmissions = async (evaluatorID, page, pageSize, searchType, search) => {
    return await apiClient.get(`api/evaluator/submissions/${evaluatorID}?page=${page}&pageSize=${pageSize}&search=${search}&searchType=${searchType}`);
};