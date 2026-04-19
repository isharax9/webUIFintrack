import { useSummary, useTrend } from "@/hooks/useReports";

export const useReportsSummaryAndTrend = (month: number, year: number) => {
  const summary = useSummary(month, year);
  const trend = useTrend();

  return {
    summary: summary.data,
    trend: trend.data,
    loading: summary.isLoading || trend.isLoading,
  };
};
