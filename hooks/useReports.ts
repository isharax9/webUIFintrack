"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { CategoryReport, ReportSummary, TrendData } from "@/types";

export const useSummary = (month: number, year: number) =>
  useQuery({
    queryKey: ["summary", month, year],
    queryFn: async () => (await api.get<ReportSummary>("/api/reports/summary", { params: { month, year } })).data,
  });

export const useTrend = () =>
  useQuery({
    queryKey: ["trend"],
    queryFn: async () => (await api.get<TrendData[]>("/api/reports/trend")).data,
  });

export const useCategoryReport = (month: number, year: number) =>
  useQuery({
    queryKey: ["category-report", month, year],
    queryFn: async () => (await api.get<CategoryReport[]>("/api/reports/by-category", { params: { month, year } })).data,
  });
