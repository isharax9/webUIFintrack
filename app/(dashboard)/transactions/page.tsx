"use client";

import { useState } from "react";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import EmptyState from "@/components/shared/EmptyState";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useCategories } from "@/hooks/useCategories";
import { useCreateTransaction, useDeleteTransaction, useTransactions } from "@/hooks/useTransactions";

export default function TransactionsPage() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const tx = useTransactions({ page: 1, limit: 10 });
  const categories = useCategories();
  const createTx = useCreateTransaction();
  const deleteTx = useDeleteTransaction();

  if (tx.isLoading || categories.isLoading) return <LoadingSpinner label="Loading transactions..." />;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-outline/40 bg-surface p-6">
        <h1 className="font-headline text-2xl font-bold">Transactions</h1>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="rounded-xl border-none bg-surface-high px-4 py-3 text-sm" />
          <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" className="rounded-xl border-none bg-surface-high px-4 py-3 text-sm" />
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="rounded-xl border-none bg-surface-high px-4 py-3 text-sm">
            <option value="">Select category</option>
            {categories.data?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button
            className="rounded-xl bg-primary px-4 py-3 font-bold text-white"
            onClick={() => createTx.mutate({ title, amount: Number(amount), type: "EXPENSE", categoryId, date: new Date().toISOString() })}
          >
            Add
          </button>
        </div>
      </div>

      {!tx.data?.data.length ? (
        <EmptyState title="No transactions yet" description="Create your first transaction to get started." />
      ) : (
        <div className="overflow-hidden rounded-xl border border-outline/40 bg-surface">
          <table className="w-full text-sm">
            <thead className="bg-surface-high/40 text-left text-on-surface-variant">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Type</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {tx.data?.data.map((item) => (
                <tr key={item.id} className="border-t border-outline/20">
                  <td className="p-4">{item.title}</td>
                  <td className="p-4">{item.category.name}</td>
                  <td className="p-4">{item.type}</td>
                  <td className="p-4 text-right">${Number(item.amount).toFixed(2)}</td>
                  <td className="p-4">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="p-4"><button onClick={() => setDeleteId(item.id)} className="text-danger">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete transaction"
        description="This action cannot be undone."
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteTx.mutate(deleteId);
          setDeleteId(null);
        }}
      />
    </div>
  );
}
