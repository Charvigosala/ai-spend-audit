export type AITool = {
  id: string;
  name: string;
  plan: string;
  monthlySpend: number;
  seats: number;
};

export type UseCase = "coding" | "writing" | "data" | "research" | "mixed";

export type AuditInput = {
  tools: AITool[];
  teamSize: number;
  useCase: UseCase;
};

export type ToolRecommendation = {
  toolId: string;
  toolName: string;
  currentPlan: string;
  currentSpend: number;
  recommendedAction: string;
  recommendedPlan: string;
  estimatedSpend: number;
  monthlySavings: number;
  reason: string;
};

export type AuditResult = {
  auditId: string;
  input: AuditInput;
  recommendations: ToolRecommendation[];
  totalMonthlySpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  summary: string;
  createdAt: string;
};
