import axios from "axios";
import { getToken } from "../utils/helpers";

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach token if available
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Optional: handle specific status codes
      if (error.response.status === 401) {
        console.warn("Unauthorized access - redirect to login?");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
