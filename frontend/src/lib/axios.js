import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "http://52.66.22.92:5001/api",
  withCredentials: true,
});