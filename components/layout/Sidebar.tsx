"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Goal, LayoutDashboard, ReceiptText, Settings, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transactions", label: "Transactions", icon: ReceiptText },
  { href: "/budget-goals", label: "Budget Goals", icon: Goal },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-64 shrink-0 border-r border-outline/40 bg-background lg:flex lg:flex-col">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white">
          <Wallet className="h-5 w-5" />
        </div>
        <div>
          <p className="font-headline text-lg font-bold">FinTrack</p>
          <p className="text-xs uppercase tracking-widest text-on-surface-variant">Sovereign Ledger</p>
        </div>
      </div>
      <nav className="space-y-1 px-3">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition",
                active ? "bg-primary/20 text-white" : "text-on-surface-variant hover:bg-surface-high/40 hover:text-on-surface",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
