"use client";

import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useCategoryReport, useSummary, useTrend } from "@/hooks/useReports";

const now = new Date();

export default function ReportsPage() {
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const summary = useSummary(month, year);
  const category = useCategoryReport(month, year);
  const trend = useTrend();

  if (summary.isLoading || category.isLoading || trend.isLoading) return <LoadingSpinner label="Loading reports..." />;

  return (
    <div className="space-y-6">
      <h1 className="font-headline text-2xl font-bold">Financial Analytics & Insights</h1>

      <div className="grid gap-4 md:grid-cols-4">
        <Card title="Income" value={summary.data?.totalIncome ?? 0} />
        <Card title="Expense" value={summary.data?.totalExpense ?? 0} />
        <Card title="Savings" value={summary.data?.netSavings ?? 0} />
        <Card title="Savings Rate" value={`${summary.data?.savingsRate ?? 0}%`} raw />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-outline/40 bg-surface p-6">
          <h2 className="font-headline text-lg font-bold">By Category</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={category.data ?? []} dataKey="amount" nameKey="categoryName" innerRadius={70} outerRadius={110}>
                  {(category.data ?? []).map((entry) => <Cell key={entry.categoryId} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-outline/40 bg-surface p-6">
          <h2 className="font-headline text-lg font-bold">6-Month Trend</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trend.data ?? []}>
                <XAxis dataKey="month" stroke="#97BDC4" />
                <YAxis stroke="#97BDC4" />
                <Tooltip />
                <Bar dataKey="income" fill="#4CAF50" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expense" fill="#E63946" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, raw = false }: { title: string; value: number | string; raw?: boolean }) {
  return (
    <div className="rounded-xl border border-outline/40 bg-surface p-5">
      <p className="text-sm text-on-surface-variant">{title}</p>
      <p className="mt-1 font-headline text-2xl font-bold">{raw ? value : `$${Number(value).toFixed(2)}`}</p>
    </div>
  );
}
