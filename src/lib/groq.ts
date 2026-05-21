import Groq from "groq-sdk";
import { AuditResult } from "@/types";

export async function generateSummary(audit: AuditResult): Promise<string> {
  try {
    const client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const prompt = `You are a financial advisor for tech startups. 
Analyze this AI tool spend audit and write a personalized 100-word summary paragraph.

Team size: ${audit.input.teamSize} people
Use case: ${audit.input.useCase}
Total monthly spend: $${audit.totalMonthlySpend}
Total monthly savings possible: $${audit.totalMonthlySavings}
Total annual savings possible: $${audit.totalAnnualSavings}

Top recommendations:
${audit.recommendations
  .filter((r) => r.monthlySavings > 0)
  .map(
    (r) =>
      `- ${r.toolName}: ${r.recommendedAction} — saves $${r.monthlySavings}/month. ${r.reason}`,
  )
  .join("\n")}

Write a friendly, specific, actionable 100-word paragraph. 
Start with their team size and total spend.
Mention the biggest saving opportunity by name.
End with total potential savings per year.
Do not use bullet points. Write as one flowing paragraph.`;

    const response = await client.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
    });

    return response.choices[0]?.message?.content || getFallbackSummary(audit);
  } catch (error) {
    console.error("Groq API error:", error);
    return getFallbackSummary(audit);
  }
}

function getFallbackSummary(audit: AuditResult): string {
  const topSaving = audit.recommendations
    .filter((r) => r.monthlySavings > 0)
    .sort((a, b) => b.monthlySavings - a.monthlySavings)[0];

  if (audit.totalMonthlySavings === 0) {
    return `Your ${audit.input.teamSize}-person team is spending $${audit.totalMonthlySpend}/month on AI tools. Based on your ${audit.input.useCase} use case, your current stack looks well optimized. You are already spending efficiently — no major changes recommended at this time.`;
  }

  return `Your ${audit.input.teamSize}-person team is spending $${audit.totalMonthlySpend}/month on AI tools. ${
    topSaving
      ? `Your biggest saving opportunity is ${topSaving.toolName} — ${topSaving.reason} `
      : ""
  }By following these recommendations, you could save $${audit.totalMonthlySavings}/month, which adds up to $${audit.totalAnnualSavings}/year.`;
}
