import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "http://13.205.219.220:5001/api",
  withCredentials: true,
});

// Add token to every request automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt-token");
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
});