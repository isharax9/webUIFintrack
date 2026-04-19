"use client";

import { useState } from "react";
import EmptyState from "@/components/shared/EmptyState";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useBudgetGoals, useCreateBudgetGoal, useDeleteBudgetGoal } from "@/hooks/useBudgetGoals";
import { useCategories } from "@/hooks/useCategories";
import { useTransactions } from "@/hooks/useTransactions";

const now = new Date();
const month = now.getMonth() + 1;
const year = now.getFullYear();

export default function BudgetGoalsPage() {
  const [categoryId, setCategoryId] = useState("");
  const [limitAmount, setLimitAmount] = useState("");
  const categories = useCategories();
  const goals = useBudgetGoals(month, year);
  const monthStart = new Date(year, month - 1, 1).toISOString();
  const monthEnd = new Date(year, month, 0, 23, 59, 59, 999).toISOString();
  const monthlyExpenses = useTransactions({ page: 1, limit: 100, type: "EXPENSE", from: monthStart, to: monthEnd });
  const createGoal = useCreateBudgetGoal();
  const deleteGoal = useDeleteBudgetGoal();

  if (categories.isLoading || goals.isLoading || monthlyExpenses.isLoading) return <LoadingSpinner label="Loading budget goals..." />;

  const spentByCategory = (monthlyExpenses.data?.data ?? []).reduce<Record<string, number>>((acc, item) => {
    acc[item.categoryId] = (acc[item.categoryId] ?? 0) + Number(item.amount);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-outline/40 bg-surface p-6">
        <h1 className="font-headline text-2xl font-bold">Category Budget Planner</h1>
        <p className="mt-1 text-sm text-on-surface-variant">Manage your monthly spending limits by category.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="rounded-xl border-none bg-surface-high px-4 py-3 text-sm">
            <option value="">Select category</option>
            {categories.data?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input value={limitAmount} onChange={(e) => setLimitAmount(e.target.value)} placeholder="Limit amount" className="rounded-xl border-none bg-surface-high px-4 py-3 text-sm" />
          <button className="rounded-xl bg-primary px-4 py-3 font-bold text-white" onClick={() => createGoal.mutate({ categoryId, limitAmount: Number(limitAmount), month, year })}>Create Goal</button>
        </div>
      </div>

      {!goals.data?.length ? (
        <EmptyState title="No budget goals" description="Create a budget goal for this month." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {goals.data.map((goal) => (
            <div key={goal.id} className="rounded-xl border border-outline/40 bg-surface p-5">
              {(() => {
                const limit = Number(goal.limitAmount);
                const spent = spentByCategory[goal.categoryId] ?? 0;
                const progress = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
                const barColor = progress > 80 ? "bg-danger" : progress >= 60 ? "bg-warning" : "bg-primary";
                return (
                  <>
                    <h3 className="font-bold">{goal.category.name}</h3>
                    <p className="mt-1 text-sm text-on-surface-variant">${spent.toFixed(2)} / ${limit.toFixed(2)}</p>
                    <div className="mt-4 h-2 rounded-full bg-surface-high">
                      <div className={`h-full rounded-full ${barColor}`} style={{ width: `${progress}%` }} />
                    </div>
                  </>
                );
              })()}
              <button className="mt-4 text-sm font-bold text-danger" onClick={() => deleteGoal.mutate(goal.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
