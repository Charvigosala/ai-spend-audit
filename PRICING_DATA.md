# Pricing Data Sources

## Cursor

- Hobby: $0/user/month � https://cursor.sh/pricing � verified 2026-05-21
- Pro: $20/user/month � https://cursor.sh/pricing � verified 2026-05-21
- Business: $40/user/month � https://cursor.sh/pricing � verified 2026-05-21
- Enterprise: $80/user/month � https://cursor.sh/pricing � verified 2026-05-21

## GitHub Copilot

- Individual: $10/user/month � https://github.com/features/copilot#pricing � verified 2026-05-21
- Business: $19/user/month � https://github.com/features/copilot#pricing � verified 2026-05-21
- Enterprise: $39/user/month � https://github.com/features/copilot#pricing � verified 2026-05-21

## Claude

- Free: $0 � https://www.anthropic.com/pricing � verified 2026-05-21
- Pro: $20/user/month � https://www.anthropic.com/pricing � verified 2026-05-21
- Max: $100/user/month � https://www.anthropic.com/pricing � verified 2026-05-21
- Team: $30/user/month � https://www.anthropic.com/pricing � verified 2026-05-21
- Enterprise: $60/user/month � https://www.anthropic.com/pricing � verified 2026-05-21

## ChatGPT

- Free: $0 � https://openai.com/chatgpt/pricing � verified 2026-05-21
- Plus: $20/user/month � https://openai.com/chatgpt/pricing � verified 2026-05-21
- Team: $30/user/month � https://openai.com/chatgpt/pricing � verified 2026-05-21
- Enterprise: $60/user/month � https://openai.com/chatgpt/pricing � verified 2026-05-21

## OpenAI API

- Pay as you go: usage based � https://openai.com/api/pricing � verified 2026-05-21

## Anthropic API

- Pay as you go: usage based � https://www.anthropic.com/pricing � verified 2026-05-21

## Gemini

- Free: $0 � https://one.google.com/about/plans � verified 2026-05-21
- Pro: $20/user/month � https://one.google.com/about/plans � verified 2026-05-21
- Ultra: $30/user/month � https://one.google.com/about/plans � verified 2026-05-21

## Windsurf

- Free: $0 � https://windsurf.com/pricing � verified 2026-05-21
- Pro: $15/user/month � https://windsurf.com/pricing � verified 2026-05-21
- Team: $35/user/month � https://windsurf.com/pricing � verified 2026-05-21

## Audit Rules — How Savings Are Calculated

All savings figures are pure math: `currentSpend - (recommendedPlan.pricePerSeat × seats)`
No numbers are hardcoded. Every recommendation traces back to this pricing table.

### Rule 1: Cheaper plan exists from same vendor

If a lower-priced plan supports the team's seat count, recommend it.
Example: ChatGPT Team ($30/seat) for 2 users → ChatGPT Plus ($20/seat) saves $20/month.

### Rule 2: Team plan overkill for small teams

If fewer than 3 users are on a "Team" plan, recommend the individual Pro/Plus plan.
Reasoning: Team plans add collaboration features that have no value for 1-2 users.

### Rule 3: Overlapping coding tools

If a team pays for both Cursor and GitHub Copilot (or Windsurf), flag the overlap.
Reasoning: Both tools do AI code completion. Running both is redundant for most teams.
Cursor is recommended as the primary since it has a more integrated IDE experience.

### Rule 4: Use case mismatch

If a team's primary use case is coding and they pay for Gemini Pro/Ultra, recommend downgrading to Free.
Reasoning: Gemini adds limited value over Cursor or Copilot for pure coding workflows.

### Rule 5: API vs subscription comparison

If a team spends over $100/month on API direct usage with 5+ users, flag for review.
Reasoning: At that scale, a Team subscription may offer better value than per-token billing.
