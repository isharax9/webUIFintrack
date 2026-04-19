"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { api } from "@/lib/axios";

const schema = z.object({ otp: z.string().length(6) });

export default function VerifyOtpForm({ email }: { email: string }) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: async (payload: z.infer<typeof schema>) => (await api.post<{ resetToken: string }>("/api/auth/verify-otp", { email, otp: payload.otp })).data,
    onSuccess: ({ resetToken }) => {
      toast.success("OTP verified");
      router.push(`/reset-password?token=${encodeURIComponent(resetToken)}`);
    },
    onError: () => toast.error("Invalid or expired OTP"),
  });

  return (
    <div className="grid min-h-screen place-items-center px-6">
      <form onSubmit={handleSubmit((values) => mutation.mutate(values))} className="w-full max-w-md rounded-xl border border-outline/30 bg-surface p-8">
        <h1 className="font-headline text-2xl font-bold">Verify OTP</h1>
        <p className="mt-2 text-sm text-on-surface-variant">Enter the 6-digit code sent to {email || "your email"}.</p>
        <input {...register("otp")} maxLength={6} className="mt-6 w-full rounded-xl border-none bg-surface-high px-4 py-3 tracking-[0.3em]" placeholder="000000" />
        {errors.otp && <p className="mt-2 text-xs text-danger">{errors.otp.message}</p>}
        <button className="mt-6 w-full rounded-xl bg-primary py-3 font-bold text-white">Verify Code</button>
      </form>
    </div>
  );
}
