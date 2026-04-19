"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";
import type { AuthResponse, User } from "@/types";

export const useSilentRefresh = () => {
  const { setAuth, clearAuth, setBootstrapped } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/refresh", { method: "POST", credentials: "include" });
      if (!response.ok) throw new Error("Not authenticated");
      return (await response.json()) as { accessToken: string };
    },
    onSuccess: async ({ accessToken }) => {
      const me = await api.get<User>("/api/user/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setAuth(accessToken, me.data);
      setBootstrapped(true);
    },
    onError: () => {
      clearAuth();
      setBootstrapped(true);
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Invalid credentials");
      return (await response.json()) as AuthResponse;
    },
    onSuccess: (data) => {
      setAuth(data.accessToken, data.user);
      toast.success("Logged in successfully");
      router.push("/dashboard");
    },
    onError: () => toast.error("Invalid credentials"),
  });
};

export const useRegister = () => {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: async (payload: { name: string; email: string; password: string }) => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Unable to register");
      return (await response.json()) as AuthResponse;
    },
    onSuccess: (data) => {
      setAuth(data.accessToken, data.user);
      toast.success("Account created");
      router.push("/dashboard");
    },
    onError: () => toast.error("Unable to register"),
  });
};
