"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useBudgetGoals } from "@/hooks/useBudgetGoals";
import { useReportsSummaryAndTrend } from "@/lib/dashboard-composite";
import { useTransactions } from "@/hooks/useTransactions";

const now = new Date();

export default function DashboardPage() {
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const { summary, trend, loading } = useReportsSummaryAndTrend(month, year);
  const tx = useTransactions({ page: 1, limit: 5 });
  const goals = useBudgetGoals(month, year);

  if (loading || tx.isLoading || goals.isLoading) return <LoadingSpinner label="Loading dashboard..." />;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Total Balance" value={`$${summary?.netSavings?.toFixed(2) ?? "0.00"}`} />
        <Card title="Monthly Income" value={`$${summary?.totalIncome?.toFixed(2) ?? "0.00"}`} />
        <Card title="Monthly Expense" value={`$${summary?.totalExpense?.toFixed(2) ?? "0.00"}`} />
      </div>

      <section className="grid gap-6 xl:grid-cols-12">
        <div className="space-y-6 xl:col-span-8">
          <div className="rounded-xl border border-outline/40 bg-surface p-6">
            <h2 className="font-headline text-xl font-bold">Spending Trend (6 months)</h2>
            <div className="mt-5 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend ?? []}>
                  <XAxis dataKey="month" stroke="#97BDC4" />
                  <YAxis stroke="#97BDC4" />
                  <Tooltip />
                  <Line type="monotone" dataKey="income" stroke="#4CAF50" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="expense" stroke="#E63946" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-outline/40 bg-surface">
            <div className="border-b border-outline/30 p-6">
              <h2 className="font-headline text-xl font-bold">Recent Transactions</h2>
            </div>
            <div className="divide-y divide-outline/20">
              {tx.data?.data.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-4 text-sm">
                  <div>
                    <p className="font-semibold">{t.title}</p>
                    <p className="text-xs text-on-surface-variant">{new Date(t.date).toLocaleString()} • {t.category.name}</p>
                  </div>
                  <p className={t.type === "INCOME" ? "text-success font-bold" : "text-danger font-bold"}>
                    {t.type === "INCOME" ? "+" : "-"}${Number(t.amount).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6 xl:col-span-4">
          <div className="rounded-xl border border-outline/40 bg-surface p-6">
            <h3 className="font-headline text-lg font-bold">Budget Progress</h3>
            <div className="mt-4 space-y-4">
              {goals.data?.map((goal) => (
                <div key={goal.id}>
                  <div className="mb-1 flex justify-between text-xs text-on-surface-variant">
                    <span>{goal.category.name}</span>
                    <span>${Number(goal.limitAmount).toFixed(2)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-high">
                    <div className="h-full rounded-full bg-primary" style={{ width: "50%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full rounded-xl bg-primary py-3 font-bold text-white shadow-glow">Add Transaction</button>
        </div>
      </section>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-outline/40 bg-surface p-6">
      <p className="text-sm text-on-surface-variant">{title}</p>
      <p className="mt-2 font-headline text-3xl font-extrabold">{value}</p>
    </div>
  );
}
