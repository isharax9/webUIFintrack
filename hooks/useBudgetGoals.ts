"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import type { BudgetGoal } from "@/types";

export const useBudgetGoals = (month: number, year: number) =>
  useQuery({
    queryKey: ["budget-goals", month, year],
    queryFn: async () => (await api.get<BudgetGoal[]>("/api/budget-goals", { params: { month, year } })).data,
  });

export const useCreateBudgetGoal = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { categoryId: string; limitAmount: number; month: number; year: number }) => (await api.post<BudgetGoal>("/api/budget-goals", payload)).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["budget-goals"] });
      toast.success("Budget goal created");
    },
    onError: () => toast.error("Failed to create budget goal"),
  });
};

export const useUpdateBudgetGoal = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, limitAmount }: { id: string; limitAmount: number }) => (await api.put<BudgetGoal>(`/api/budget-goals/${id}`, { limitAmount })).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["budget-goals"] });
      toast.success("Budget goal updated");
    },
    onError: () => toast.error("Failed to update budget goal"),
  });
};

export const useDeleteBudgetGoal = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => api.delete(`/api/budget-goals/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["budget-goals"] });
      toast.success("Budget goal deleted");
    },
    onError: () => toast.error("Failed to delete budget goal"),
  });
};
