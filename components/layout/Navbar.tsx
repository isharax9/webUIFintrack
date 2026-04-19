"use client";

import { Bell, Search } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-outline/40 bg-background/50 px-6 backdrop-blur-md">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
        <input className="w-full rounded-xl border-none bg-surface-high px-10 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:ring-2 focus:ring-primary" placeholder="Search transactions..." />
      </div>
      <div className="ml-4 flex items-center gap-4">
        <button className="rounded-lg bg-surface p-2 text-on-surface-variant"><Bell className="h-4 w-4" /></button>
        <div className="hidden text-right sm:block">
          <p className="text-sm font-bold">{user?.name ?? "User"}</p>
          <p className="text-xs text-on-surface-variant">{user?.email ?? ""}</p>
        </div>
      </div>
    </header>
  );
}
