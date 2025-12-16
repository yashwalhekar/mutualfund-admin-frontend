import axios from "axios";

const API = axios.create({
  baseURL: "https://mutualfund-admin-frontend.vercel.app/api",
});

// ⬇️ Add this to send token with ALL protected requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export default API;
