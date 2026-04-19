"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegister } from "@/hooks/useAuth";

const schema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6), confirmPassword: z.string().min(6) }).refine((v) => v.password === v.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match" });
type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const registerUser = useRegister();
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  return (
    <div className="grid min-h-screen place-items-center bg-background px-6">
      <div className="w-full max-w-md rounded-xl border border-outline/20 bg-surface p-8 shadow-soft">
        <h1 className="font-headline text-3xl font-extrabold">Create Account</h1>
        <p className="mt-1 text-sm text-on-surface-variant">Join the Sovereign Ledger to master your finances.</p>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit((data) => registerUser.mutate({ name: data.name, email: data.email, password: data.password }))}>
          <input {...register("name")} placeholder="Full Name" className="w-full rounded-xl border-none bg-surface-high px-4 py-3 text-sm focus:ring-2 focus:ring-primary" />
          {errors.name && <p className="-mt-2 text-xs text-danger">{errors.name.message}</p>}
          <input {...register("email")} placeholder="Email Address" className="w-full rounded-xl border-none bg-surface-high px-4 py-3 text-sm focus:ring-2 focus:ring-primary" />
          {errors.email && <p className="-mt-2 text-xs text-danger">{errors.email.message}</p>}
          <div className="grid grid-cols-2 gap-3">
            <input type="password" {...register("password")} placeholder="Password" className="rounded-xl border-none bg-surface-high px-4 py-3 text-sm focus:ring-2 focus:ring-primary" />
            <input type="password" {...register("confirmPassword")} placeholder="Confirm" className="rounded-xl border-none bg-surface-high px-4 py-3 text-sm focus:ring-2 focus:ring-primary" />
          </div>
          {errors.confirmPassword && <p className="-mt-2 text-xs text-danger">{errors.confirmPassword.message}</p>}
          <button disabled={registerUser.isPending} className="w-full rounded-xl bg-primary py-3 font-bold text-white shadow-glow">{registerUser.isPending ? "Creating..." : "Create Account"}</button>
        </form>
        <p className="mt-6 text-sm text-on-surface-variant">Already have an account? <Link href="/login" className="font-bold text-primary">Log In</Link></p>
      </div>
    </div>
  );
}
