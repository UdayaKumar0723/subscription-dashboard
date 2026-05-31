import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.post("/api/auth/refresh");
        const nextToken = response.data.data.accessToken;
        useAuthStore.getState().setAccessToken(nextToken);
        originalRequest.headers.Authorization = `Bearer ${nextToken}`;
        return api(originalRequest);
      } catch {
        useAuthStore.getState().clearAuth();
      }
    }

    return Promise.reject(error);
  }
);

export const getApiError = (error, fallback = "Something went wrong") => {
  return error.response?.data?.message || fallback;
};
