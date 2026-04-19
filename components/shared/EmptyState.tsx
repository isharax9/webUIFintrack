import { Inbox } from "lucide-react";

export default function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-outline/40 bg-surface p-8 text-center">
      <Inbox className="mx-auto mb-3 text-primary" />
      <h3 className="font-headline text-lg font-bold">{title}</h3>
      <p className="mt-1 text-sm text-on-surface-variant">{description}</p>
    </div>
  );
}
