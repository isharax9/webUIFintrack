"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useAuthStore } from "@/store/authStore";

export default function RootPage() {
  const router = useRouter();
  const { user, isBootstrapped } = useAuthStore();

  useEffect(() => {
    if (!isBootstrapped) return;
    router.replace(user ? "/dashboard" : "/login");
  }, [isBootstrapped, router, user]);

  return (
    <div className="grid min-h-screen place-items-center">
      <LoadingSpinner label="Initializing FinTrack..." />
    </div>
  );
}
