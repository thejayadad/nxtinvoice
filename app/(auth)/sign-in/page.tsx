import { AuthForm } from "@/_components/auth/auth-form";
import { CardWrapper } from "@/_components/auth/card-wrapper";
import { HeaderText } from "@/_components/auth/header-text";
import { SocialRow } from "@/_components/auth/social-row";


export default function SignInPage() {
  return (
    <main className="min-h-dvh grid place-items-center p-6">
      <CardWrapper
        bottomLinkLabel="Need an account?"
        bottomLinkHref="/sign-up"
        SocialSlot={<SocialRow />}
      >
        <HeaderText label="Welcome back" />
        <AuthForm mode="signin" />
      </CardWrapper>
    </main>
  );
}
