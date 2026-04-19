"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";

export default function SettingsPage() {
  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [name, setName] = useState(user?.name ?? "");
  const [currency, setCurrency] = useState(user?.currency ?? "USD");

  const update = useMutation({
    mutationFn: async () => (await api.put("/api/user/me", { name, currency })).data,
    onSuccess: (data) => {
      const token = useAuthStore.getState().accessToken;
      if (token) setAuth(token, data);
      toast.success("Settings updated");
    },
    onError: () => toast.error("Failed to update settings"),
  });

  const remove = useMutation({
    mutationFn: async () => api.delete("/api/user/me"),
    onSuccess: () => {
      clearAuth();
      toast.success("Account deleted");
      window.location.href = "/login";
    },
    onError: () => toast.error("Failed to delete account"),
  });

  return (
    <div className="space-y-6">
      <h1 className="font-headline text-2xl font-bold">Settings & Notifications</h1>
      <section className="rounded-xl border border-outline/40 bg-surface p-6">
        <h2 className="font-headline text-lg font-bold">Profile</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl border-none bg-surface-high px-4 py-3" placeholder="Full name" />
          <input value={currency} onChange={(e) => setCurrency(e.target.value.toUpperCase())} maxLength={3} className="rounded-xl border-none bg-surface-high px-4 py-3" placeholder="USD" />
        </div>
        <button onClick={() => update.mutate()} className="mt-4 rounded-xl bg-primary px-5 py-2.5 font-bold text-white">Save Changes</button>
      </section>

      <section className="rounded-xl border border-danger/40 bg-danger/10 p-6">
        <h2 className="font-headline text-lg font-bold text-danger">Danger Zone</h2>
        <p className="mt-1 text-sm text-on-surface-variant">Delete your account and all associated data permanently.</p>
        <button onClick={() => remove.mutate()} className="mt-4 rounded-xl bg-danger px-5 py-2.5 font-bold text-white">Delete Account</button>
      </section>
    </div>
  );
}
