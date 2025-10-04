import { ForgotPasswordForm } from "@/_components/auth/forgot-password-form";

export const metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-dvh grid place-items-center p-6">
      <div className="w-full max-w-md rounded-2xl border bg-white/60 p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-semibold">Forgot your password?</h1>
        <p className="mb-6 text-sm text-neutral-600">
          Enter your email and we’ll send you a secure link to reset it.
        </p>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
