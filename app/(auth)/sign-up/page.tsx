import { AuthForm } from "@/_components/auth/auth-form";
import { CardWrapper } from "@/_components/auth/card-wrapper";
import { HeaderText } from "@/_components/auth/header-text";


export const metadata = { title: "Create your account" };

export default function SignUpPage() {
  return (
    <main className="min-h-dvh grid place-items-center p-6">
      <CardWrapper
        bottomLinkLabel="Already have an account?"
        bottomLinkHref="/sign-in"
      >
        <HeaderText label="Create your account" />
        <AuthForm mode="signup" />
      </CardWrapper>
    </main>
  );
}
