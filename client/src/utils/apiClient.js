import axios from "axios";
import { clearAuthData, fetchUserType, getToken, isAuthError } from "../services/authService";

const apiClient = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const userType = fetchUserType(config);

  if (!userType || userType === "auth") {
    return config;
  }
  const token = getToken(userType);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { config } = error;
    if (isAuthError(error)) {
      const userType = fetchUserType(config);
      clearAuthData(userType);
      window.location.href = `/${userType}/signin`;
    }
    return Promise.reject(error.response?.data || error)
  }
);

export default apiClient;