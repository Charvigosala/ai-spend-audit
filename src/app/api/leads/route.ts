import { NextRequest, NextResponse } from "next/server";
import { saveLead } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 5;
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < windowMs);
  if (recent.length >= maxRequests) return true;
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const { auditId, email, companyName, role, teamSize } = body;

    if (!email || !auditId) {
      return NextResponse.json(
        { error: "Email and auditId required" },
        { status: 400 },
      );
    }

    await saveLead(auditId, email, companyName, role, teamSize);

    // Send confirmation email
    try {
      await resend.emails.send({
        from: "AI Spend Audit <onboarding@resend.dev>",
        to: email,
        subject: "Your AI Spend Audit Report",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <h1 style="color: #10b981;">Your AI Spend Audit is saved!</h1>
            <p>Hi there,</p>
            <p>Thanks for using AI Spend Audit. Your report has been saved and you can access it anytime at:</p>
            <p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/results/${auditId}" 
                 style="background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;">
                View My Report
              </a>
            </p>
            <p style="color: #6b7280; font-size: 14px; margin-top: 32px;">
              If you have questions, reply to this email.<br/>
              — The Credex Team
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Email send failed:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
