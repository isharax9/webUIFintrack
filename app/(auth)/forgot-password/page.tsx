"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { api } from "@/lib/axios";

const schema = z.object({ email: z.string().email() });

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: async (payload: z.infer<typeof schema>) => api.post("/api/auth/forgot-password", payload),
    onSuccess: (_, values) => {
      toast.success("OTP sent");
      router.push(`/verify-otp?email=${encodeURIComponent(values.email)}`);
    },
    onError: () => toast.error("Unable to send OTP"),
  });

  return (
    <div className="grid min-h-screen place-items-center px-6">
      <form onSubmit={handleSubmit((values) => mutation.mutate(values))} className="w-full max-w-md rounded-xl border border-outline/30 bg-surface p-8">
        <h1 className="font-headline text-2xl font-bold">Forgot Password</h1>
        <p className="mt-2 text-sm text-on-surface-variant">Enter your email to receive a 6-digit OTP.</p>
        <input {...register("email")} className="mt-6 w-full rounded-xl border-none bg-surface-high px-4 py-3" placeholder="name@example.com" />
        {errors.email && <p className="mt-2 text-xs text-danger">{errors.email.message}</p>}
        <button className="mt-6 w-full rounded-xl bg-primary py-3 font-bold text-white">Send OTP</button>
      </form>
    </div>
  );
}
