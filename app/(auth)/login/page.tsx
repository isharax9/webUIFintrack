"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "@/hooks/useAuth";

const schema = z.object({ email: z.string().email(), password: z.string().min(6), remember: z.boolean().optional() });
type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const login = useLogin();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { remember: false } });

  return (
    <div className="grid min-h-screen place-items-center bg-[#0b2327] px-6">
      <div className="w-full max-w-md rounded-xl border border-outline/20 bg-surface p-8 shadow-soft">
        <h1 className="font-headline text-3xl font-extrabold">Budget Life</h1>
        <p className="mt-1 text-sm uppercase tracking-widest text-on-surface-variant">The Sovereign Ledger</p>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit((data) => login.mutate({ email: data.email, password: data.password }))}>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-widest">Email Address</label>
            <input {...register("email")} type="email" className="w-full rounded-xl border-none bg-surface-high px-4 py-3 text-sm focus:ring-2 focus:ring-primary" />
            {errors.email && <p className="mt-1 text-xs text-danger">{errors.email.message}</p>}
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-widest">Password</label>
              <Link href="/forgot-password" className="text-[10px] font-bold uppercase tracking-widest text-primary">Forgot Password?</Link>
            </div>
            <input {...register("password")} type="password" className="w-full rounded-xl border-none bg-surface-high px-4 py-3 text-sm focus:ring-2 focus:ring-primary" />
            {errors.password && <p className="mt-1 text-xs text-danger">{errors.password.message}</p>}
          </div>
          <label className="flex items-center gap-2 text-sm text-on-surface-variant"><input type="checkbox" {...register("remember")} />Remember me for 30 days</label>
          <button disabled={login.isPending} className="w-full rounded-xl bg-primary py-3 font-headline font-bold text-white shadow-glow disabled:opacity-60">{login.isPending ? "Logging in..." : "Log In"}</button>
        </form>
        <p className="mt-6 text-sm text-on-surface-variant">Don&apos;t have an account? <Link href="/register" className="font-bold text-primary">Sign Up</Link></p>
      </div>
    </div>
  );
}
