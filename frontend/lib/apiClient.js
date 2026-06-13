import axios from "axios";

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://moorland.onrender.com/api").replace(/\/+$/, "");

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

export function getApiBaseUrl() {
  return apiBaseUrl;
}
