"use client";

import { useState } from "react";
import { AuditResult } from "@/types";
import LeadCapture from "./LeadCapture";
import ShareButton from "./ShareButton";

export default function AuditResults({
  result,
  onBack,
}: {
  result: AuditResult;
  onBack: () => void;
}) {
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const hasSavings = result.totalMonthlySavings > 0;
  const bigSavings = result.totalMonthlySavings > 500;

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-white text-sm mb-8"
        >
          Back to form
        </button>

        <div
          className={`rounded-2xl p-8 mb-8 text-center border ${hasSavings ? "bg-emerald-950 border-emerald-800" : "bg-gray-900 border-gray-800"}`}
        >
          {hasSavings ? (
            <div>
              <p className="text-emerald-400 text-sm font-medium mb-2 uppercase tracking-wide">
                Potential Savings Found
              </p>
              <p className="text-5xl font-bold text-white mb-1">
                ${result.totalMonthlySavings}
                <span className="text-2xl text-gray-400">/mo</span>
              </p>
              <p className="text-emerald-400 text-xl font-semibold">
                ${result.totalAnnualSavings}/year
              </p>
            </div>
          ) : (
            <div>
              <p className="text-2xl font-bold">You are spending well</p>
              <p className="text-gray-400 mt-2">
                No major savings found for your current stack.
              </p>
            </div>
          )}
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
          <p className="text-sm text-gray-400 mb-2 uppercase tracking-wide font-medium">
            AI Analysis
          </p>
          <p className="text-gray-200 leading-relaxed">{result.summary}</p>
        </div>

        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold">Tool Breakdown</h2>
          {result.recommendations.map((rec) => (
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
              <div className="flex items-center gap-3 text-sm mb-3">
                <span className="text-gray-400">${rec.currentSpend}/mo</span>
                <span className="text-gray-600">to</span>
                <span className="text-white font-medium">
                  {rec.recommendedAction}
                </span>
              </div>
              <p className="text-sm text-gray-400">{rec.reason}</p>
            </div>
          ))}
        </div>

        {bigSavings && (
          <div className="bg-blue-950 border border-blue-800 rounded-2xl p-6 mb-6">
            <p className="font-semibold text-blue-300 mb-1">
              Save even more with Credex
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Credex sells discounted AI credits at up to 30% off. Book a free
              consultation.
            </p>
            <a
              href="https://credex.rocks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2 rounded-lg text-sm transition"
            >
              Book a free Credex consultation
            </a>
          </div>
        )}

        <div className="mb-6">
          <ShareButton auditId={result.auditId} />
        </div>

        {!leadSubmitted && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            {!showLeadCapture ? (
              <div className="text-center">
                <p className="font-semibold mb-1">
                  {hasSavings
                    ? "Want us to email you this report?"
                    : "Get notified when new optimizations apply"}
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  Free. No spam. Unsubscribe anytime.
                </p>
                <button
                  onClick={() => setShowLeadCapture(true)}
                  className="bg-white text-gray-900 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  {hasSavings ? "Email me this report" : "Notify me"}
                </button>
              </div>
            ) : (
              <LeadCapture
                auditId={result.auditId}
                onSuccess={() => setLeadSubmitted(true)}
              />
            )}
          </div>
        )}

        {leadSubmitted && (
          <div className="bg-emerald-950 border border-emerald-800 rounded-2xl p-6 text-center">
            <p className="text-emerald-400 font-semibold">Report saved!</p>
            <p className="text-gray-400 text-sm mt-1">
              We will be in touch if we can help you save more.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
