# Prompts

## AI Summary Prompt (src/lib/groq.ts)

### Final prompt used in production:

You are a financial advisor for tech startups. Analyze this AI tool spend audit and write a personalized 100-word summary paragraph.

Team size: {teamSize} people
Use case: {useCase}
Total monthly spend: ${totalMonthlySpend}
Total monthly savings possible: ${totalMonthlySavings}
Total annual savings possible: ${totalAnnualSavings}

Top recommendations: {recommendations}

Write a friendly, specific, actionable 100-word paragraph. Start with their team size and total spend. Mention the biggest saving opportunity by name. End with total potential savings per year. Do not use bullet points. Write as one flowing paragraph.

### Why I wrote it this way:

- Persona framing produces more authoritative output
- Explicit word count keeps it scannable
- Requiring team size and tool names forces personalization
- "Do not use bullet points" prevents list-style output

### Fallback:

If Groq API fails, getFallbackSummary() generates a templated summary so the UI never breaks.
