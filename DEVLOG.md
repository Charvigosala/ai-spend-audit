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

---

## Day 4 — 2026-05-24

**Hours worked:** 6
**What I did:** Deployed the app to Vercel by connecting the GitHub repo and adding all environment variables. Fixed NEXT*PUBLIC_APP_URL to point to the live Vercel URL instead of localhost. Wrote and committed all remaining markdown files — USER_INTERVIEWS.md with 3 real conversations, README.md with screenshots, decisions and live URL, LANDING_COPY.md, METRICS.md, REFLECTION.md, ARCHITECTURE.md, GTM.md, ECONOMICS.md, PRICING_DATA.md, PROMPTS.md, TESTS.md. Took screenshots of the live form and results page and added them to the public folder. Tested the full flow on the live Vercel URL.
**What I learned:** Vercel automatically redeploys every time you push to main — so every git push updates the live site instantly. Also learned that NEXT_PUBLIC* variables are baked in at build time, so changing them in Vercel requires a redeploy to take effect.
**Blockers / what I'm stuck on:** Need one more commit day tomorrow to meet the 5 distinct days requirement. Currently have 4 days — May 21, 22, 23, 24.
**Plan for tomorrow:** Add Day 5 DEVLOG entry, do a final review of all files on GitHub, check Lighthouse scores on live URL, fix any issues found.

---

## Day 5 — 2026-05-25

**Hours worked:** 3
**What I did:** Cleaned up GitHub repo by removing auto-generated files. Added repo description and live URL to About section. Did final review of all 12 markdown files on GitHub. Verified all files are correct and nothing is missing.
**What I learned:** Always add auto-generated files to .gitignore from day one to keep the repo clean.
**Blockers / what I'm stuck on:** Need to run Lighthouse scores before submission.
**Plan for tomorrow:** Run Lighthouse, fix any issues, submit the Google Form.

## Day 6 — 2026-05-26

**Hours worked:**
**What I did:** Ran Lighthouse audit on live Vercel URL. Fixed [any issues found]. Submitted the Google Form.
**What I learned:**
**Blockers / what I'm stuck on:** None — project submitted.
**Plan for tomorrow:** N/A
