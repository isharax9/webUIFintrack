"use client";

export default function ConfirmDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-xl border border-outline/40 bg-surface p-6 shadow-soft">
        <h3 className="font-headline text-lg font-bold">{title}</h3>
        <p className="mt-2 text-sm text-on-surface-variant">{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button className="rounded-xl border border-outline/40 px-4 py-2 text-sm" onClick={onCancel}>Cancel</button>
          <button className="rounded-xl bg-danger px-4 py-2 text-sm font-bold text-white" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
