import { getAudit } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { AuditResult } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: { auditId: string };
}) {
  try {
    const data = await getAudit(params.auditId);
    const audit: AuditResult = data.audit_data;
    return {
      title: `AI Spend Audit — Save $${data.total_monthly_savings}/month`,
      description: `This team could save $${data.total_annual_savings}/year on AI tools.`,
      openGraph: {
        title: `AI Spend Audit — Save $${data.total_monthly_savings}/month`,
        description: `This team could save $${data.total_annual_savings}/year on AI tools.`,
        type: "website",
      },
      twitter: {
        card: "summary",
        title: `AI Spend Audit — Save $${data.total_monthly_savings}/month`,
        description: `This team could save $${data.total_annual_savings}/year on AI tools.`,
      },
    };
  } catch {
    return { title: "AI Spend Audit" };
  }
}

export default async function ResultsPage({
  params,
}: {
  params: { auditId: string };
}) {
  let data;
  try {
    data = await getAudit(params.auditId);
  } catch {
    notFound();
  }

  const audit: AuditResult = data.audit_data;

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <p className="text-gray-400 text-sm mb-2">AI Spend Audit Report</p>
          <h1 className="text-3xl font-bold">Shared Audit Results</h1>
        </div>

        <div
          className={`rounded-2xl p-8 mb-8 text-center border ${
            data.total_monthly_savings > 0
              ? "bg-emerald-950 border-emerald-800"
              : "bg-gray-900 border-gray-800"
          }`}
        >
          {data.total_monthly_savings > 0 ? (
            <div>
              <p className="text-emerald-400 text-sm font-medium mb-2 uppercase tracking-wide">
                Potential Savings Found
              </p>
              <p className="text-5xl font-bold text-white mb-1">
                ${data.total_monthly_savings}
                <span className="text-2xl text-gray-400">/mo</span>
              </p>
              <p className="text-emerald-400 text-xl font-semibold">
                ${data.total_annual_savings}/year
              </p>
            </div>
          ) : (
            <div>
              <p className="text-2xl font-bold">Spending well</p>
              <p className="text-gray-400 mt-2">No major savings found.</p>
            </div>
          )}
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
          <p className="text-sm text-gray-400 mb-2 uppercase tracking-wide font-medium">
            AI Analysis
          </p>
          <p className="text-gray-200 leading-relaxed">{audit.summary}</p>
        </div>

        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold">Tool Breakdown</h2>
          {audit.recommendations.map((rec) => (
            <div
              key={rec.toolId}
              className="bg-gray-900 rounded-2xl p-5 border border-gray-800"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold">{rec.toolName}</p>
                  <p className="text-sm text-gray-400">
                    {rec.currentPlan} plan
                  </p>
                </div>
                {rec.monthlySavings > 0 ? (
                  <span className="bg-emerald-900 text-emerald-400 text-sm font-medium px-3 py-1 rounded-full">
                    Save ${rec.monthlySavings}/mo
                  </span>
                ) : (
                  <span className="bg-gray-800 text-gray-400 text-sm px-3 py-1 rounded-full">
                    Optimal
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400">{rec.reason}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
          <p className="font-semibold mb-1">Audit your own AI spend</p>
          <p className="text-gray-400 text-sm mb-4">
            Free. No account needed. Results in seconds.
          </p>

          <a
            href="/"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Get my free audit
          </a>
        </div>
      </div>
    </main>
  );
}
