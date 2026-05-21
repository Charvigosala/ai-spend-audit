"use client";

import { useState, useEffect } from "react";
import { AuditInput, AITool, AuditResult, UseCase } from "@/types";
import AuditResults from "@/components/AuditResults";

const TOOLS = [
  { id: "cursor", name: "Cursor" },
  { id: "github-copilot", name: "GitHub Copilot" },
  { id: "claude", name: "Claude" },
  { id: "chatgpt", name: "ChatGPT" },
  { id: "openai-api", name: "OpenAI API" },
  { id: "anthropic-api", name: "Anthropic API" },
  { id: "gemini", name: "Gemini" },
  { id: "windsurf", name: "Windsurf" },
];

const PLANS: Record<string, string[]> = {
  cursor: ["Hobby", "Pro", "Business", "Enterprise"],
  "github-copilot": ["Individual", "Business", "Enterprise"],
  claude: ["Free", "Pro", "Max", "Team", "Enterprise"],
  chatgpt: ["Free", "Plus", "Team", "Enterprise"],
  "openai-api": ["Pay as you go"],
  "anthropic-api": ["Pay as you go"],
  gemini: ["Free", "Pro", "Ultra"],
  windsurf: ["Free", "Pro", "Team"],
};

const emptyTool = (): AITool => ({
  id: "cursor",
  name: "Cursor",
  plan: "Pro",
  monthlySpend: 0,
  seats: 1,
});

export default function Home() {
  const [tools, setTools] = useState<AITool[]>([emptyTool()]);
  const [teamSize, setTeamSize] = useState(5);
  const [useCase, setUseCase] = useState<UseCase>("coding");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");

  // Persist form state across reloads
  useEffect(() => {
    const saved = localStorage.getItem("auditForm");
    if (saved) {
      const parsed = JSON.parse(saved);
      setTools(parsed.tools);
      setTeamSize(parsed.teamSize);
      setUseCase(parsed.useCase);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "auditForm",
      JSON.stringify({ tools, teamSize, useCase }),
    );
  }, [tools, teamSize, useCase]);

  function addTool() {
    setTools([...tools, emptyTool()]);
  }

  function removeTool(index: number) {
    setTools(tools.filter((_, i) => i !== index));
  }

  function updateTool(index: number, field: keyof AITool, value: any) {
    const updated = [...tools];
    if (field === "id") {
      updated[index] = {
        ...updated[index],
        id: value,
        name: TOOLS.find((t) => t.id === value)?.name || value,
        plan: PLANS[value][0],
      };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setTools(updated);
  }

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const input: AuditInput = { tools, teamSize, useCase };
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return <AuditResults result={result} onBack={() => setResult(null)} />;
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-3 text-white">AI Spend Audit</h1>
          <p className="text-gray-400 text-lg">
            Find out if your team is overpaying for AI tools. Get a free audit
            in 60 seconds.
          </p>
        </div>

        {/* Team Info */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
          <h2 className="text-lg font-semibold mb-4">Your Team</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Team Size
              </label>
              <input
                type="number"
                min={1}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Primary Use Case
              </label>
              <select
                value={useCase}
                onChange={(e) => setUseCase(e.target.value as UseCase)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
              >
                <option value="coding">Coding</option>
                <option value="writing">Writing</option>
                <option value="data">Data Analysis</option>
                <option value="research">Research</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tools */}
        <div className="space-y-4 mb-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Tool {index + 1}</h3>
                {tools.length > 1 && (
                  <button
                    onClick={() => removeTool(index)}
                    className="text-gray-500 hover:text-red-400 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Tool
                  </label>
                  <select
                    value={tool.id}
                    onChange={(e) => updateTool(index, "id", e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                  >
                    {TOOLS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Plan
                  </label>
                  <select
                    value={tool.plan}
                    onChange={(e) => updateTool(index, "plan", e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                  >
                    {PLANS[tool.id]?.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Monthly Spend ($)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={tool.monthlySpend}
                    onChange={(e) =>
                      updateTool(index, "monthlySpend", Number(e.target.value))
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Seats
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={tool.seats}
                    onChange={(e) =>
                      updateTool(index, "seats", Number(e.target.value))
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Tool */}
        <button
          onClick={addTool}
          className="w-full border border-dashed border-gray-700 rounded-2xl py-4 text-gray-400 hover:text-white hover:border-gray-500 transition mb-6"
        >
          + Add another tool
        </button>

        {error && (
          <div className="bg-red-900/30 border border-red-800 rounded-lg px-4 py-3 mb-4 text-red-400">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-gray-700 text-white font-semibold rounded-2xl py-4 text-lg transition"
        >
          {loading ? "Analyzing your spend..." : "Get My Free Audit →"}
        </button>

        <p className="text-center text-gray-600 text-sm mt-4">
          No account needed. Results in seconds.
        </p>
      </div>
    </main>
  );
}
