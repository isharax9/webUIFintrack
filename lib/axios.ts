import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/authStore";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

interface RetryConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

const refreshAccessToken = async () => {
  const response = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) throw new Error("Refresh failed");

  return (await response.json()) as { accessToken: string };
};

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig;

    if (error.response?.status === 401 && original && !original._retry) {
      original._retry = true;
      try {
        const { accessToken } = await refreshAccessToken();
        useAuthStore.setState({ accessToken });
        original.headers = {
          ...(original.headers || {}),
          Authorization: `Bearer ${accessToken}`,
        };
        return api(original);
      } catch {
        useAuthStore.getState().clearAuth();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    throw error;
  },
);
