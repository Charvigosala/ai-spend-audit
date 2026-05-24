# User Interviews

Three conversations conducted via WhatsApp on 2026-05-23 with college
contacts at MGIT Hyderabad who use AI tools for academic projects and
internship preparation. All three are 3rd year CSE students.

---

## Interview 1

**Name:** Tejaswini
**Role:** 3rd year CSE student, MGIT Hyderabad
**Company stage:** Academic — personal projects and internship prep

### Conversation Notes

**Q: What AI tools do you use?**
"ChatGPT, Claude, Copilot"

**Q: Do you pay for any of them?**
"No, free"

**Q: Do you know exactly how much you spend per month?**
"No"

**Q: Have you ever felt like you were wasting money or not using a tool enough?**
"No — nothing to waste since everything is free"

**Q: If a free website showed you exactly where you're overspending on AI tools,
would you use it?**
"No"

**Q: Have you ever thought about paying for ChatGPT Plus or any paid plan?**
"No"

**Q: If you joined a startup and your company had an AI tools budget, would
you want to know if they were overpaying?**
"Yes"

### Most Surprising Thing They Said

Tejaswini uses three different AI tools — ChatGPT, Claude, and Copilot —
every day, but has zero cost awareness because she has never paid for any
of them. The concept of overspending on AI simply does not exist in her
mental model yet. She said she would not use an audit tool personally right
now, but immediately said yes when the question shifted to her future
employer's budget. That sharp distinction was unexpected.

### What It Changed About My Design

This confirmed that the product's primary user is not a student — it is the
person controlling an AI tools budget at a company. I updated the landing
copy to speak directly to engineering managers and CTOs rather than
individual developers. The "notify me when optimizations apply" CTA for
free-tier users exists precisely for people like Tejaswini — capturing them
now means reaching them when they enter the workforce and start managing
budgets.

---

## Interview 2

**Name:** Charitha
**Role:** 3rd year CSE student, MGIT Hyderabad
**Company stage:** Academic — assignments and side projects

### Conversation Notes

**Q: What AI tools do you use?**
"Claude"

**Q: Do you pay for any of them?**
"Free"

**Q: Do you know exactly how much you spend per month?**
"No"

**Q: Have you ever felt like you were wasting money or not using a tool enough?**
"No"

**Q: If a free website showed you exactly where you're overspending on AI tools,
would you use it?**
"Yes"

**Q: Have you ever thought about paying for ChatGPT Plus or any paid plan?**
"No"

**Q: If you joined a startup and your company had an AI tools budget, would
you want to know if they were overpaying?**
"Yes"

### Most Surprising Thing They Said

Charitha uses only Claude — not ChatGPT, not Copilot — despite Claude being
the least well known of the three among students. When I asked why, she said
it gives better answers for coding questions. This was unexpected because
most students default to ChatGPT out of habit. It suggests that tool loyalty
is driven by perceived quality for a specific task, not by brand recognition
or pricing.

### What It Changed About My Design

I realized the audit engine should not push everyone toward the same
recommendation. Someone who has specifically chosen Claude for coding quality
should not be flagged for switching to ChatGPT just because it is more
popular. I updated the audit logic to focus on plan efficiency and overlap
detection rather than recommending tool replacements based on popularity.

---

## Interview 3

**Name:** Laith
**Role:** 3rd year CSE student, MGIT Hyderabad
**Company stage:** Academic — college projects and competitive programming

### Conversation Notes

**Q: What AI tools do you use?**
"ChatGPT, Claude"

**Q: Do you pay for any of them?**
"Free"

**Q: Do you know exactly how much you spend per month?**
"No"

**Q: Have you ever felt like you were wasting money or not using a tool enough?**
"No, since I don't pay for anything"

**Q: If a free website showed you exactly where you're overspending on AI tools,
would you use it?**
"Yes"

**Q: Have you ever thought about paying for ChatGPT Plus or any paid plan?**
"No"

**Q: If you joined a startup and your company had an AI tools budget, would
you want to know if they were overpaying?**
"Yes"

### Most Surprising Thing They Said

When I explained that some companies pay $30 per person per month for
ChatGPT Team when only 2 people use it — and that switching to Plus saves
$20/month — Laith said "wait, companies actually pay that much per person?"
The complete unawareness of what paid AI tools cost was striking. He had
assumed paid plans were maybe $5/month at most.

### What It Changed About My Design

This told me the results page needs to show the current plan price
prominently, not just the savings number. Users reviewing a company's tools
need to see the full picture to understand why the saving matters. I made
sure the per-tool breakdown shows current spend clearly before showing the
recommended action.

---

## Overall Findings

All three interviews revealed the same core pattern: students who use AI
tools daily have zero cost awareness because they exclusively use free tiers.
None had ever paid for an AI tool. None knew their monthly spend. All three
said they would want to know if their future employer was overpaying.

This validated two important product decisions:

**1. The immediate target user is not a student.** It is an engineering
manager, CTO, or tech lead who controls an AI tools budget. Students are a
future user segment — they become relevant the moment they join a team with
existing subscriptions.

**2. The zero-savings path matters.** The "notify me when new optimizations
apply" signup captures people who have no savings today but will be relevant
users tomorrow. All three interviewees fit this profile exactly.

The most consistent surprise across all three conversations was the complete
lack of awareness about what paid AI tool plans actually cost. None of them
knew ChatGPT Team was $30/seat or that Cursor Business was $40/seat. This
suggests the audit tool has value beyond just finding overspend — it also
educates users about the pricing landscape, which makes the eventual Credex
consultation more credible.
