import axios from "axios";
import useAuthStore from "./stores/useAuthStore.js";

export const makeRequest = axios.create({
  baseURL: "/api",
});

// Interceptor: attach the latest token from the Zustand store on every request.
// This fixes two things:
//  1. The token is read live, not once at module load time.
//  2. Works correctly after login/logout without recreating the axios instance.
makeRequest.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});