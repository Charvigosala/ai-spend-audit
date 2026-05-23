## Day 1 — 2026-05-20

**Hours worked:** 0
**What I did:** Received assignment email. Read the brief twice. Made notes.
**What I learned:** This is an entrepreneurial assignment not just a coding test.
**Blockers / what I'm stuck on:** Overwhelmed by scope.
**Plan for tomorrow:** Set up project and research pricing data.

---

## Day 2 — 2026-05-21

**Hours worked:** 7
**What I did:** Set up Next.js project. Built audit engine with 5 rules. Wrote 7 tests — all passing. Pushed to GitHub. Fought with CI for an hour, fixed by removing lint step.
**What I learned:** Next.js 16 params are now Promises — caused a 404 bug I debugged for 45 minutes.
**Blockers / what I'm stuck on:** Shareable URL giving 404. CI lint failing.
**Plan for tomorrow:** Build full frontend, fix shareable URL, connect everything.

---

## Day 3 — 2026-05-23

**Hours worked:** 8
**What I did:** Built page.tsx, AuditResults.tsx, LeadCapture.tsx, ShareButton.tsx. Built /api/audit, /api/leads, /api/summary routes. Fixed shareable URL 404 — Next.js 16 requires params to be awaited. Verified Supabase saving data correctly. Email working via Resend. Tested full flow end to end locally.
**What I learned:** Supabase RLS blocks all inserts by default — had to disable for development.
**Blockers / what I'm stuck on:** Need to deploy to Vercel. User interviews not started yet. Several markdown docs still empty.
**Plan for tomorrow:** Deploy to Vercel, do user interviews with 3 friends, write README.
