import apiClient from "../utils/apiClient";

// team content submission  API
export const contentSubmission = async (data) => {
    return await apiClient.post("api/team/submission", data);
};

// fetch content submission API
export const fetchSubmissionDetails = async (teamID) => {
    return await apiClient.get(`api/team/submission/${teamID}`);
};

// update content submission API
export const updateSubmission = async (teamID, data) => {
    return await apiClient.patch(`api/team/submission/${teamID}`, data);
};

// fetch evaluation details API
export const fetchEvaluationDetails = async (teamID) => {
    return await apiClient.get(`api/team/evaluations/${teamID}`);
};

// fetch evaluation details API
export const fetchTeamProfile = async (teamID) => {
    return await apiClient.get(`api/team/profile/${teamID}`);
};

// update team profile API
export const updateTeamProfile = async (teamID, data) => {
    return await apiClient.post(`api/team/profile/${teamID}/update`, data);
};
// update team password API
export const updateTeamPassword = async (teamID, data) => {
    return await apiClient.post(`api/team/profile/${teamID}/password-update`, data);
};

// fetch leaderboard  API
export const fetchTeamLeaderboard = async (page, pageSize, searchType, search) => {
    return await apiClient.get(`api/admin/leaderboard?page=${page}&pageSize=${pageSize}&search=${search}&searchType=${searchType}`);
};

// transform Evaluation Data
export const transformEvaluationData = (data, CRITERIA_KEYS) => {
    const hasEvaluations = Array.isArray(data.evaluations) && data.evaluations.length > 0;

    const getScore = (index, key) =>
        hasEvaluations ? data.evaluations[index]?.scores?.[key] ?? "-" : "-";

    const criteriaScores = CRITERIA_KEYS.map((item, index) => ({
        srNo: index + 1,
        label: item.label,
        max: item.max,
        scores: {
            evaluator1: getScore(0, item.key),
            evaluator2: getScore(1, item.key),
            evaluator3: getScore(2, item.key),
        },
        average: hasEvaluations ? data.averageScores?.scores?.[item.key] ?? "-" : "-",
    }));

    const totalRow = {
        srNo: "total",
        label: "Total",
        max: 100,
        scores: hasEvaluations
            ? {
                evaluator1: data.evaluations[0]?.totalScore ?? 0,
                evaluator2: data.evaluations[1]?.totalScore ?? 0,
                evaluator3: data.evaluations[2]?.totalScore ?? 0,
            }
            : { evaluator1: "-", evaluator2: "-", evaluator3: "-" },
        average: hasEvaluations ? data.averageScores?.totalScore ?? 0 : "-",
    };

    return {
        teamName: data.teamName || "-",
        topic: data.topic || "-",
        videoURL: data.videoURL || "-",
        description: data.description || "-",
        learningOutcomes: data.learningOutcomes || "-",
        totalScore: hasEvaluations ? data.averageScores?.totalScore ?? 0 : "-",
        evaluationRecord: [...criteriaScores, totalRow],
    };
};
