"use client";

import { useState } from "react";

export default function LeadCapture({
  auditId,
  onSuccess,
}: {
  auditId: string;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  async function handleSubmit() {
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auditId,
          email,
          companyName,
          role,
          website, // honeypot field
        }),
      });
      if (!res.ok) throw new Error("Failed");
      onSuccess();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <p className="font-semibold mb-4">Save your report</p>
      {/* Honeypot - hidden from real users */}
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />
      <div className="space-y-3">
        <input
          type="email"
          placeholder="your@email.com *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Company name (optional)"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="Your role (optional)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          onClick={handleSubmit}
          disabled={loading || !email}
          className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-gray-700 text-white font-semibold py-2 rounded-lg transition"
        >
          {loading ? "Saving..." : "Save my report"}
        </button>
      </div>
    </div>
  );
}
