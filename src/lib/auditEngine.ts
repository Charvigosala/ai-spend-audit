import { AuditInput, AuditResult, ToolRecommendation } from "@/types";
import { PRICING_DATA, getCheaperPlan, getToolById } from "./pricingData";

export function runAudit(input: AuditInput): AuditResult {
  const recommendations: ToolRecommendation[] = [];

  // Check for overlapping coding tools
  const codingTools = input.tools.filter((t) => {
    const pricing = getToolById(t.id);
    return pricing?.category === "coding";
  });

  for (const tool of input.tools) {
    const pricingInfo = getToolById(tool.id);
    if (!pricingInfo) continue;

    const currentSpend = tool.monthlySpend;
    let recommendedAction = "Keep current plan";
    let recommendedPlan = tool.plan;
    let estimatedSpend = currentSpend;
    let reason = "Your current plan is well suited for your usage.";
    let monthlySavings = 0;

    // Rule 1: Check if cheaper plan exists from same vendor
    const cheaperPlan = getCheaperPlan(pricingInfo, tool.plan, tool.seats);
    if (cheaperPlan) {
      const newSpend = cheaperPlan.pricePerSeat * tool.seats;
      if (newSpend < currentSpend) {
        monthlySavings = currentSpend - newSpend;
        estimatedSpend = newSpend;
        recommendedPlan = cheaperPlan.name;
        recommendedAction = `Downgrade to ${cheaperPlan.name}`;
        reason = `${cheaperPlan.name} plan supports your team size of ${tool.seats} at $${cheaperPlan.pricePerSeat}/seat, saving $${monthlySavings}/month.`;
      }
    }

    // Rule 2: Team size mismatch — too few people for team plan
    if (tool.plan.toLowerCase().includes("team") && tool.seats < 3) {
      const individualPlan = pricingInfo.plans.find(
        (p) =>
          p.name.toLowerCase().includes("pro") ||
          p.name.toLowerCase().includes("plus"),
      );
      if (individualPlan) {
        const newSpend = individualPlan.pricePerSeat * tool.seats;
        if (newSpend < currentSpend) {
          monthlySavings = currentSpend - newSpend;
          estimatedSpend = newSpend;
          recommendedPlan = individualPlan.name;
          recommendedAction = `Switch to ${individualPlan.name}`;
          reason = `Team plan is overkill for ${tool.seats} users. ${individualPlan.name} at $${individualPlan.pricePerSeat}/seat saves $${monthlySavings}/month.`;
        }
      }
    }

    // Rule 3: Overlapping coding tools (Cursor + Copilot together = waste)
    if (
      codingTools.length > 1 &&
      (tool.id === "github-copilot" || tool.id === "windsurf") &&
      input.tools.some((t) => t.id === "cursor")
    ) {
      monthlySavings = currentSpend;
      estimatedSpend = 0;
      recommendedAction = "Consider removing this tool";
      recommendedPlan = "None";
      reason = `You already pay for Cursor which overlaps heavily with ${pricingInfo.name} for coding. Removing it saves $${currentSpend}/month.`;
    }

    // Rule 4: API direct usage — check if they overpay vs subscription
    if (
      (tool.id === "openai-api" || tool.id === "anthropic-api") &&
      tool.monthlySpend > 100 &&
      tool.seats > 5
    ) {
      recommendedAction = "Consider switching to Team plan";
      recommendedPlan = "Team";
      reason = `At $${tool.monthlySpend}/month with ${tool.seats} users, a Team subscription may be cheaper than API usage. Compare your per-call costs.`;
      monthlySavings = Math.round(tool.monthlySpend * 0.2);
      estimatedSpend = currentSpend - monthlySavings;
    }

    // Rule 5: Use case mismatch
    if (
      input.useCase === "coding" &&
      tool.id === "gemini" &&
      tool.plan !== "Free"
    ) {
      recommendedAction = "Downgrade to Free tier";
      recommendedPlan = "Free";
      estimatedSpend = 0;
      monthlySavings = currentSpend;
      reason = `For a coding-focused team, Gemini adds limited value over Cursor or Copilot. Downgrading to Free saves $${currentSpend}/month.`;
    }

    recommendations.push({
      toolId: tool.id,
      toolName: pricingInfo.name,
      currentPlan: tool.plan,
      currentSpend,
      recommendedAction,
      recommendedPlan,
      estimatedSpend,
      monthlySavings,
      reason,
    });
  }

  const totalMonthlySpend = input.tools.reduce(
    (sum, t) => sum + t.monthlySpend,
    0,
  );
  const totalMonthlySavings = recommendations.reduce(
    (sum, r) => sum + r.monthlySavings,
    0,
  );
  const totalAnnualSavings = totalMonthlySavings * 12;

  const summary = generateFallbackSummary(
    input,
    totalMonthlySpend,
    totalMonthlySavings,
    recommendations,
  );

  return {
    auditId: crypto.randomUUID(),
    input,
    recommendations,
    totalMonthlySpend,
    totalMonthlySavings,
    totalAnnualSavings,
    summary,
    createdAt: new Date().toISOString(),
  };
}

function generateFallbackSummary(
  input: AuditInput,
  totalSpend: number,
  totalSavings: number,
  recommendations: ToolRecommendation[],
): string {
  const topSaving = recommendations
    .filter((r) => r.monthlySavings > 0)
    .sort((a, b) => b.monthlySavings - a.monthlySavings)[0];

  if (totalSavings === 0) {
    return `Your ${input.teamSize}-person team is spending $${totalSpend}/month on AI tools. Based on your ${input.useCase} use case, your current stack looks well optimized. No major savings opportunities were found — you're spending well.`;
  }

  return `Your ${input.teamSize}-person team is spending $${totalSpend}/month on AI tools. ${
    topSaving
      ? `Your biggest saving opportunity is ${topSaving.toolName} — ${topSaving.reason}`
      : ""
  } In total, you could save $${totalSavings}/month ($${totalSavings * 12}/year) by following our recommendations.`;
}
