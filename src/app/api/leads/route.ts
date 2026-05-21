import { NextRequest, NextResponse } from "next/server";
import { saveLead } from "@/lib/supabase";

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

    // Honeypot check
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
