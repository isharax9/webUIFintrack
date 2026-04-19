import VerifyOtpForm from "./verify-otp-form";

export default function VerifyOtpPage({ searchParams }: { searchParams: { email?: string } }) {
  return <VerifyOtpForm email={searchParams.email ?? ""} />;
}
