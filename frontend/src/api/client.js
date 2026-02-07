import axios from "axios";

const api = axios.create({
  // Use the Vercel variable in production and localhost in development
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  // Ensure withCredentials is false or removed to match the backend wildcard origins
  withCredentials: false, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
