"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { api } from "@/lib/axios";

const schema = z.object({ password: z.string().min(6), confirm: z.string().min(6) }).refine((v) => v.password === v.confirm, { message: "Passwords do not match", path: ["confirm"] });

export default function ResetPasswordPage() {
  const router = useRouter();
  const token = useSearchParams().get("token") ?? "";
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: async (payload: z.infer<typeof schema>) => api.post("/api/auth/reset-password", { resetToken: token, newPassword: payload.password }),
    onSuccess: () => {
      toast.success("Password reset successful");
      router.push("/login");
    },
    onError: () => toast.error("Failed to reset password"),
  });

  return (
    <div className="grid min-h-screen place-items-center px-6">
      <form onSubmit={handleSubmit((values) => mutation.mutate(values))} className="w-full max-w-md rounded-xl border border-outline/30 bg-surface p-8">
        <h1 className="font-headline text-2xl font-bold">Reset Password</h1>
        <input type="password" {...register("password")} className="mt-6 w-full rounded-xl border-none bg-surface-high px-4 py-3" placeholder="New password" />
        <input type="password" {...register("confirm")} className="mt-3 w-full rounded-xl border-none bg-surface-high px-4 py-3" placeholder="Confirm password" />
        {errors.confirm && <p className="mt-2 text-xs text-danger">{errors.confirm.message}</p>}
        <button className="mt-6 w-full rounded-xl bg-primary py-3 font-bold text-white">Update Password</button>
      </form>
    </div>
  );
}
