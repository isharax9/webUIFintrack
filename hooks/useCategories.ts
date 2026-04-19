"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { Category } from "@/types";

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await api.get<Category[]>("/api/categories")).data,
  });
