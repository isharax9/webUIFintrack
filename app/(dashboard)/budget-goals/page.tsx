"use client";

import { useState } from "react";
import EmptyState from "@/components/shared/EmptyState";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useBudgetGoals, useCreateBudgetGoal, useDeleteBudgetGoal } from "@/hooks/useBudgetGoals";
import { useCategories } from "@/hooks/useCategories";

const now = new Date();
const month = now.getMonth() + 1;
const year = now.getFullYear();

export default function BudgetGoalsPage() {
  const [categoryId, setCategoryId] = useState("");
  const [limitAmount, setLimitAmount] = useState("");
  const categories = useCategories();
  const goals = useBudgetGoals(month, year);
  const createGoal = useCreateBudgetGoal();
  const deleteGoal = useDeleteBudgetGoal();

  if (categories.isLoading || goals.isLoading) return <LoadingSpinner label="Loading budget goals..." />;

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
              <h3 className="font-bold">{goal.category.name}</h3>
              <p className="mt-1 text-sm text-on-surface-variant">Limit: ${Number(goal.limitAmount).toFixed(2)}</p>
              <div className="mt-4 h-2 rounded-full bg-surface-high"><div className="h-full w-1/2 rounded-full bg-primary" /></div>
              <button className="mt-4 text-sm font-bold text-danger" onClick={() => deleteGoal.mutate(goal.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
