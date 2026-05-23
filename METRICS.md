# Metrics

## North Star Metric

**Audits completed per week**

This is the North Star because everything downstream — leads captured,
consultations booked, customers converted — depends on people actually
finishing the audit. A completed audit means the user saw value. An
abandoned form means they didn't. This metric is the truest measure of
whether the tool is working.

Not "visits" (someone could land and immediately leave) and not "emails
captured" (that's a conversion metric, not a health metric). Completed
audits is the one number that tells us if the core product is doing its job.

## 3 Input Metrics That Drive the North Star

**1. Form completion rate (visits → audit completed)**
Target: above 25%. If this drops below 15%, the form is too long or
confusing. This tells us about UX quality. Instrument: track a
"audit_submitted" event vs total page visits.

**2. Time to first value (page load → results displayed)**
Target: under 8 seconds. If the audit takes too long, users drop off
before seeing results. This tells us about perceived speed and trust.
Instrument: measure API response time from form submit to results render.

**3. Shareable link copies per audit**
Target: above 10% of completed audits. If people copy and share their
results, that is organic distribution. Each share is a free acquisition
channel. This tells us if the results page is worth sharing. Instrument:
track "share_link_copied" click events.

## What to Instrument First

On day 1 of production I would add three events using a lightweight
analytics tool like Plausible or a simple Supabase log:

1. `audit_started` — user clicks submit on the form
2. `audit_completed` — results page renders with a valid auditId
3. `email_captured` — user submits their email in the lead capture form

These three alone give the full funnel. Everything else can wait until
these are stable.

## What Number Triggers a Pivot Decision

If the **audit-to-email conversion rate drops below 8%** for two consecutive
weeks, that is a signal that users are completing the audit but not finding
enough value to share their contact details. That means either:

- The savings numbers are too low to be compelling (audit engine problem)
- The email capture CTA is poorly positioned or worded (UX problem)
- The wrong users are arriving (distribution problem)

At that point the right move is to talk to 5 users who completed the audit
but did not enter their email and ask them directly why. Data tells you
something is wrong. Conversations tell you what to fix.

A pivot away from the core product would only be warranted if completed
audits are also low (below 20/week after a real launch effort) AND user
interviews show the premise itself is not valuable. That is a different
problem from a conversion problem.
