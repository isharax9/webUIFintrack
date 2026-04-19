"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import type { PaginatedResponse, Transaction, TransactionType } from "@/types";

export interface TransactionFilters {
  page?: number;
  limit?: number;
  type?: TransactionType;
  categoryId?: string;
  from?: string;
  to?: string;
}

export const useTransactions = (filters: TransactionFilters) =>
  useQuery({
    queryKey: ["transactions", filters],
    queryFn: async () => {
      const { data } = await api.get<PaginatedResponse<Transaction>>("/api/transactions", {
        params: { page: 1, limit: 10, ...filters },
      });
      return data;
    },
  });

export const useCreateTransaction = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      title: string;
      amount: number;
      type: TransactionType;
      categoryId: string;
      date: string;
      notes?: string;
    }) => (await api.post<Transaction>("/api/transactions", payload)).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transactions"] });
      qc.invalidateQueries({ queryKey: ["summary"] });
      toast.success("Transaction created");
    },
    onError: () => toast.error("Failed to create transaction"),
  });
};

export const useUpdateTransaction = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }: { id: string; title: string; amount: number; type: TransactionType; categoryId: string; date: string; notes?: string }) =>
      (await api.put<Transaction>(`/api/transactions/${id}`, payload)).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transactions"] });
      qc.invalidateQueries({ queryKey: ["summary"] });
      toast.success("Transaction updated");
    },
    onError: () => toast.error("Failed to update transaction"),
  });
};

export const useDeleteTransaction = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => api.delete(`/api/transactions/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transactions"] });
      qc.invalidateQueries({ queryKey: ["summary"] });
      toast.success("Transaction deleted");
    },
    onError: () => toast.error("Failed to delete transaction"),
  });
};
