export type Plan = {
  name: string;
  pricePerSeat: number;
  minSeats: number;
  maxSeats: number | null;
  description: string;
};

export type ToolPricing = {
  id: string;
  name: string;
  category: "coding" | "writing" | "data" | "research" | "mixed";
  plans: Plan[];
  sourceUrl: string;
  verifiedDate: string;
};

export const PRICING_DATA: ToolPricing[] = [
  {
    id: "cursor",
    name: "Cursor",
    category: "coding",
    sourceUrl: "https://cursor.sh/pricing",
    verifiedDate: "2026-05-21",
    plans: [
      {
        name: "Hobby",
        pricePerSeat: 0,
        minSeats: 1,
        maxSeats: 1,
        description: "Free tier, limited usage",
      },
      {
        name: "Pro",
        pricePerSeat: 20,
        minSeats: 1,
        maxSeats: null,
        description: "Unlimited completions",
      },
      {
        name: "Business",
        pricePerSeat: 40,
        minSeats: 1,
        maxSeats: null,
        description: "Team features, SSO",
      },
      {
        name: "Enterprise",
        pricePerSeat: 80,
        minSeats: 20,
        maxSeats: null,
        description: "Custom contracts",
      },
    ],
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    category: "coding",
    sourceUrl: "https://github.com/features/copilot#pricing",
    verifiedDate: "2026-05-21",
    plans: [
      {
        name: "Individual",
        pricePerSeat: 10,
        minSeats: 1,
        maxSeats: null,
        description: "Personal use",
      },
      {
        name: "Business",
        pricePerSeat: 19,
        minSeats: 1,
        maxSeats: null,
        description: "Team management",
      },
      {
        name: "Enterprise",
        pricePerSeat: 39,
        minSeats: 1,
        maxSeats: null,
        description: "Enterprise security",
      },
    ],
  },
  {
    id: "claude",
    name: "Claude",
    category: "mixed",
    sourceUrl: "https://www.anthropic.com/pricing",
    verifiedDate: "2026-05-21",
    plans: [
      {
        name: "Free",
        pricePerSeat: 0,
        minSeats: 1,
        maxSeats: 1,
        description: "Limited usage",
      },
      {
        name: "Pro",
        pricePerSeat: 20,
        minSeats: 1,
        maxSeats: null,
        description: "Priority access",
      },
      {
        name: "Max",
        pricePerSeat: 100,
        minSeats: 1,
        maxSeats: null,
        description: "Maximum usage limits",
      },
      {
        name: "Team",
        pricePerSeat: 30,
        minSeats: 5,
        maxSeats: null,
        description: "Team collaboration",
      },
      {
        name: "Enterprise",
        pricePerSeat: 60,
        minSeats: 10,
        maxSeats: null,
        description: "Enterprise features",
      },
    ],
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "mixed",
    sourceUrl: "https://openai.com/chatgpt/pricing",
    verifiedDate: "2026-05-21",
    plans: [
      {
        name: "Free",
        pricePerSeat: 0,
        minSeats: 1,
        maxSeats: null,
        description: "Basic access",
      },
      {
        name: "Plus",
        pricePerSeat: 20,
        minSeats: 1,
        maxSeats: null,
        description: "GPT-4 access",
      },
      {
        name: "Team",
        pricePerSeat: 30,
        minSeats: 2,
        maxSeats: null,
        description: "Team workspace",
      },
      {
        name: "Enterprise",
        pricePerSeat: 60,
        minSeats: 10,
        maxSeats: null,
        description: "Enterprise security",
      },
    ],
  },
  {
    id: "openai-api",
    name: "OpenAI API",
    category: "mixed",
    sourceUrl: "https://openai.com/api/pricing",
    verifiedDate: "2026-05-21",
    plans: [
      {
        name: "Pay as you go",
        pricePerSeat: 0,
        minSeats: 1,
        maxSeats: null,
        description: "Usage based billing",
      },
    ],
  },
  {
    id: "anthropic-api",
    name: "Anthropic API",
    category: "mixed",
    sourceUrl: "https://www.anthropic.com/pricing",
    verifiedDate: "2026-05-21",
    plans: [
      {
        name: "Pay as you go",
        pricePerSeat: 0,
        minSeats: 1,
        maxSeats: null,
        description: "Usage based billing",
      },
    ],
  },
  {
    id: "gemini",
    name: "Gemini",
    category: "mixed",
    sourceUrl: "https://one.google.com/about/plans",
    verifiedDate: "2026-05-21",
    plans: [
      {
        name: "Free",
        pricePerSeat: 0,
        minSeats: 1,
        maxSeats: null,
        description: "Basic Gemini access",
      },
      {
        name: "Pro",
        pricePerSeat: 20,
        minSeats: 1,
        maxSeats: null,
        description: "Gemini Advanced",
      },
      {
        name: "Ultra",
        pricePerSeat: 30,
        minSeats: 1,
        maxSeats: null,
        description: "Maximum features",
      },
    ],
  },
  {
    id: "windsurf",
    name: "Windsurf",
    category: "coding",
    sourceUrl: "https://windsurf.com/pricing",
    verifiedDate: "2026-05-21",
    plans: [
      {
        name: "Free",
        pricePerSeat: 0,
        minSeats: 1,
        maxSeats: null,
        description: "Basic usage",
      },
      {
        name: "Pro",
        pricePerSeat: 15,
        minSeats: 1,
        maxSeats: null,
        description: "Unlimited AI flows",
      },
      {
        name: "Team",
        pricePerSeat: 35,
        minSeats: 1,
        maxSeats: null,
        description: "Team features",
      },
    ],
  },
];

export function getToolById(id: string): ToolPricing | undefined {
  return PRICING_DATA.find((t) => t.id === id);
}

export function getCheaperPlan(
  tool: ToolPricing,
  currentPlanName: string,
  seats: number,
): Plan | null {
  const currentPlan = tool.plans.find((p) => p.name === currentPlanName);
  if (!currentPlan) return null;

  const cheaper = tool.plans.filter(
    (p) =>
      p.pricePerSeat < currentPlan.pricePerSeat &&
      p.minSeats <= seats &&
      (p.maxSeats === null || p.maxSeats >= seats),
  );

  if (cheaper.length === 0) return null;
  return cheaper.sort((a, b) => b.pricePerSeat - a.pricePerSeat)[0];
}
