"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { queryClient } from "@/lib/queryClient";
import { useSilentRefresh } from "@/hooks/useAuth";

export default function Providers({ children }: { children: React.ReactNode }) {
  const refresh = useSilentRefresh();

  useEffect(() => {
    refresh.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster theme="dark" richColors position="top-right" />
    </QueryClientProvider>
  );
}
