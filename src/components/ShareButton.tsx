"use client";

import { useState } from "react";

export default function ShareButton({ auditId }: { auditId: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const url = `${window.location.origin}/results/${auditId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="w-full border border-gray-700 hover:border-gray-500 rounded-2xl py-3 text-gray-400 hover:text-white transition text-sm"
    >
      {copied ? "✓ Link copied!" : "🔗 shareable link"}
    </button>
  );
}
