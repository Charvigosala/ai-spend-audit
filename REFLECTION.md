# Reflection

## 1. The hardest bug you hit this week

The hardest bug was the shareable URL giving a 404 error even though the
folder structure looked correct. My first hypothesis was that the [auditId]
folder name with square brackets was not being recognized by Next.js on
Windows. I tried deleting and recreating the folder multiple times. The
actual cause turned out to be a Next.js 16 breaking change — params in
dynamic routes are now Promises and must be awaited before accessing
properties like params.auditId. I found this by reading the error message
carefully which pointed to the Next.js migration docs.

## 2. A decision you reversed mid-week

I initially planned to use the Anthropic API for the AI summary feature
since the assignment preferred it. I reversed this after realizing the
free tier requires a credit card which I did not have. I switched to Groq
which offers Llama 3 on a genuinely free tier with no card required. The
prompt engineering is identical and the output quality is comparable for
a 100-word paragraph. I documented this assumption in the DEVLOG rather
than treating it as a shortcut.

## 3. What I would build in week 2

In week 2 I would add a PDF export of the full audit report since that is
the most requested feature for sharing with managers who prefer documents
over links. I would also add a benchmark mode showing how a team's AI spend
per developer compares to similar-sized teams — this makes the results more
compelling even when absolute savings are low. Finally I would set up proper
Supabase RLS policies and a Credex consultation booking flow directly in
the app instead of linking to an external page.

## 4. How I used AI tools

I used Claude as my primary assistant throughout the week for generating
boilerplate code, debugging TypeScript errors, and drafting the markdown
documentation. I used it heavily for the initial file structure and API
route setup. I did not trust it for the audit engine logic — I wrote the
pricing rules and savings calculations myself because those needed to be
defensible and the AI kept producing overly generous savings numbers that
would not hold up to scrutiny. One specific time the AI was wrong: it
generated a version of the results page with an unclosed JSX tag that
caused a cascade of TypeScript errors. I had to read the component line
by line to find it.

## 5. Self-ratings

| Dimension                | Rating | Reason                                                                                            |
| ------------------------ | ------ | ------------------------------------------------------------------------------------------------- |
| Discipline               | 5/10   | Lost the first two days and had to compress the work into fewer days than planned                 |
| Code quality             | 7/10   | TypeScript types are solid, components are clean, but test coverage is limited to the engine only |
| Design sense             | 7/10   | The results page is clean and shareable but the form could use better visual hierarchy            |
| Problem solving          | 8/10   | Debugged the Next.js params issue and CI failures independently by reading docs carefully         |
| Entrepreneurial thinking | 6/10   | GTM and economics are reasoned but user interviews happened late in the week                      |
