"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Toaster } from "sonner";
import { queryClient } from "@/lib/queryClient";
import { useSilentRefresh } from "@/hooks/useAuth";

function AuthBootstrap() {
  const refresh = useSilentRefresh();
  const attemptedRef = useRef(false);

  useEffect(() => {
    if (attemptedRef.current || refresh.isPending) return;
    attemptedRef.current = true;
    refresh.mutate();
  }, [refresh]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthBootstrap />
      {children}
      <Toaster theme="dark" richColors position="top-right" />
    </QueryClientProvider>
  );
}
