
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const isProd = process.env.NODE_ENV === "production";
const fallbackFrom = "NxtInvoice <onboarding@resend.dev>";
const from = (process.env.RESEND_FROM || "").trim() || (isProd ? "" : fallbackFrom);

export async function sendPasswordResetEmail({ to, url }: { to: string; url: string }) {
  if (!from) throw new Error("Email sender not configured (RESEND_FROM missing).");

  const html = `
    <div style="font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif;line-height:1.6">
      <h2 style="margin:0 0 8px">Reset your NxtInvoice password</h2>
      <p>Click the button below to set a new password. This link expires soon.</p>
      <p style="margin:16px 0;">
        <a href="${url}" style="display:inline-block;background:#000;color:#fff;
           padding:10px 16px;border-radius:8px;text-decoration:none">
          Reset password
        </a>
      </p>
      <p style="font-size:12px;color:#6b7280">
        If you didn’t request this, you can safely ignore this email.
      </p>
    </div>`;

  const { error } = await resend.emails.send({
    from,
    to,
    subject: "Reset your password",
    html,
  });

  if (error) {
    const msg = typeof error === "string" ? error : (error as any)?.message || "Failed to send email";
    throw new Error(msg);
  }
}
