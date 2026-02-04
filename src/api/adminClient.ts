import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const adminClient = axios.create({
  baseURL: API_URL,
});

adminClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ADMIN_ACCESS_TOKEN");
  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

adminClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("ADMIN_ACCESS_TOKEN");
      localStorage.removeItem("ADMIN_USER_DATA");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  },
);
