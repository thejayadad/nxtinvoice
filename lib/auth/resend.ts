// src/lib/email/resend.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const isProd = process.env.NODE_ENV === "production";
const fallbackFrom = "NxtInvoice <onboarding@resend.dev>"; // dev-safe
const from = (process.env.RESEND_FROM || "").trim() || (isProd ? "" : fallbackFrom);

export async function sendMagicLinkEmail({ to, url }: { to: string; url: string }) {
  if (!from) {
    console.error("RESEND_FROM missing or empty in production.");
    throw new Error("Email sender not configured.");
  }

  const html = `
    <div style="font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif;line-height:1.6">
      <h2 style="margin:0 0 8px">Sign in to NxtInvoice</h2>
      <p>Click the button below to finish signing in. This link expires soon.</p>
      <p style="margin:16px 0;">
        <a href="${url}" style="display:inline-block;background:#000;color:#fff;
           padding:10px 16px;border-radius:8px;text-decoration:none">
          Sign in
        </a>
      </p>
      <p style="font-size:12px;color:#6b7280">
        If you didn’t request this, you can safely ignore this email.
      </p>
    </div>
  `;

  try {
    // ✅ Destructure to avoid the "never" issue
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: "Your sign-in link",
      html,
    });

    if (error) {
      console.error("Resend send error:", JSON.stringify(error, null, 2));
      throw new Error(error.message ?? "Failed to send email");
    }

    return data?.id ?? null;
  } catch (e: any) {
    // Network/SDK exceptions land here
    console.error("Resend send threw:", e);
    throw new Error(e?.message ?? "Failed to send email");
  }
}
