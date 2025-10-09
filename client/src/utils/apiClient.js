import axios from "axios";
import { getToken } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const segments = config.url.split("/").filter(Boolean);
  const userType = segments[1] || "team";
  if (userType === "auth") {
    return config;

  }
  const token = getToken(userType);

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response?.data || error)
);

export default apiClient;