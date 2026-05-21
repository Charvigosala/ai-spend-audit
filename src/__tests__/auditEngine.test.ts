import { runAudit } from "@/lib/auditEngine";
import { AuditInput } from "@/types";

const basicInput: AuditInput = {
  teamSize: 5,
  useCase: "coding",
  tools: [
    {
      id: "cursor",
      name: "Cursor",
      plan: "Pro",
      monthlySpend: 100,
      seats: 5,
    },
  ],
};

// Test 1: Audit runs and returns a result
test("audit returns a result with auditId", () => {
  const result = runAudit(basicInput);
  expect(result.auditId).toBeDefined();
  expect(result.recommendations.length).toBeGreaterThan(0);
});

// Test 2: Total spend is calculated correctly
test("total monthly spend is sum of all tools", () => {
  const result = runAudit(basicInput);
  expect(result.totalMonthlySpend).toBe(100);
});

// Test 3: Annual savings = monthly savings x 12
test("annual savings equals monthly savings times 12", () => {
  const result = runAudit(basicInput);
  expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12);
});

// Test 4: Overlapping coding tools flagged
test("flags redundant coding tools when cursor and copilot both present", () => {
  const input: AuditInput = {
    teamSize: 3,
    useCase: "coding",
    tools: [
      { id: "cursor", name: "Cursor", plan: "Pro", monthlySpend: 60, seats: 3 },
      {
        id: "github-copilot",
        name: "GitHub Copilot",
        plan: "Business",
        monthlySpend: 57,
        seats: 3,
      },
    ],
  };
  const result = runAudit(input);
  const copilot = result.recommendations.find(
    (r) => r.toolId === "github-copilot",
  );
  expect(copilot?.monthlySavings).toBeGreaterThan(0);
});

// Test 5: Team plan overkill for small team
test("flags team plan as overkill for less than 3 users", () => {
  const input: AuditInput = {
    teamSize: 2,
    useCase: "writing",
    tools: [
      {
        id: "chatgpt",
        name: "ChatGPT",
        plan: "Team",
        monthlySpend: 60,
        seats: 2,
      },
    ],
  };
  const result = runAudit(input);
  const chatgpt = result.recommendations.find((r) => r.toolId === "chatgpt");
  expect(chatgpt?.monthlySavings).toBeGreaterThan(0);
});

// Test 6: No savings for optimized spend
// Test 6: No savings for optimized spend
test("returns zero savings for already optimal spend", () => {
  const input: AuditInput = {
    teamSize: 1,
    useCase: "coding",
    tools: [
      {
        id: "cursor",
        name: "Cursor",
        plan: "Hobby",
        monthlySpend: 0,
        seats: 1,
      },
    ],
  };
  const result = runAudit(input);
  expect(result.totalMonthlySavings).toBe(0);
});

// Test 7: Summary is always returned as a string
test("summary is always a non-empty string", () => {
  const result = runAudit(basicInput);
  expect(typeof result.summary).toBe("string");
  expect(result.summary.length).toBeGreaterThan(0);
});
