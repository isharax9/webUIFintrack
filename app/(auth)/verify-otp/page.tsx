import VerifyOtpForm from "./verify-otp-form";

export default async function VerifyOtpPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;
  return <VerifyOtpForm email={params.email ?? ""} />;
}
