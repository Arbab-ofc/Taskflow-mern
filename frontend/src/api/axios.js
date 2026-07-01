import axios from "axios";
import { clearStoredAuth, getStoredToken } from "../utils/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && getStoredToken()) {
      clearStoredAuth();
    }

    const message = error.response?.data?.message || error.message || "Something went wrong";
    const normalizedError = new Error(message);
    normalizedError.status = error.response?.status;
    return Promise.reject(normalizedError);
  }
);

export default api;
