import { AuthForm } from "@/_components/auth/auth-form";
import { CardWrapper } from "@/_components/auth/card-wrapper";
import { HeaderText } from "@/_components/auth/header-text";
import { MagicLinkForm } from "@/_components/auth/magic-link-form";
import { SocialRow } from "@/_components/auth/social-row";


export const metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <main className="min-h-dvh grid place-items-center p-6">
      <CardWrapper
        bottomLinkLabel="Need an account?"
        bottomLinkHref="/sign-up"
        SocialSlot={<SocialRow />}
      >
        <HeaderText label="Welcome back" />

        {/* FORM #1 — email + password */}
        <AuthForm mode="signin" />

        {/* Divider */}
        <div className="my-2 h-px w-full bg-neutral-200" />

        {/* FORM #2 — magic link */}
        <MagicLinkForm />
      </CardWrapper>
    </main>
  );
}
