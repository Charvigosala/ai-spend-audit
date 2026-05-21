import { NextRequest, NextResponse } from "next/server";
import { generateSummary } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const audit = await req.json();
    const summary = await generateSummary(audit);
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Summary error:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 },
    );
  }
}
