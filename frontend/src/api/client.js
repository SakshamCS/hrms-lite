import axios from "axios";

const api = axios.create({
  // This will use the Vercel variable in production and localhost in development
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
