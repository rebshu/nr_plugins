# Safer Alternatives Database

When a tool scores Orange (2.0-2.9) or Red (1.0-1.9), research and quick-score alternatives before recommending. This file provides a starting point — always verify with live research since policies change.

## How to Use

1. Look up the tool category below
2. Identify 2-3 alternatives
3. Quick-score each: run web searches on training policy, certifications, and incidents
4. Only recommend alternatives that score at least 1.0 composite points higher than the current tool
5. Note any trade-offs (features, cost, migration effort)

## LLM Providers

**If consumer ChatGPT scores low (training concern):**
- ChatGPT Team/Enterprise — same product, training excluded, organizational controls
- Claude Team — training excluded, ISO 42001
- Azure OpenAI Service — Microsoft-hosted, zero data retention, 100+ certifications
- Self-hosted Llama (via AWS Bedrock) — no data leaves your infrastructure

**If any consumer LLM scores low:**
- Upgrade to the same provider's enterprise tier (usually cheapest path)
- API access with zero data retention (OpenAI API, Anthropic API, Vertex AI)

## AI Coding Assistants

**If Cursor scores low (Privacy Mode / training concern):**
- GitHub Copilot Business ($19/user/mo) — training excluded by default at org level, admin controls, SOC 2, content exclusion policies
- GitHub Copilot Enterprise ($39/user/mo) — adds knowledge base, fine-tuning without data leaving org
- Claude Code on Claude Team/Enterprise — training excluded, filesystem access configurable
- Amazon Q Developer — AWS-hosted, no third-party data transfer, enterprise controls
- Tabnine Enterprise — can run on-premise, no code sent externally

**Key comparison points for coding tools:**
- Does training opt-out require per-developer action or is it organizational?
- Is code sent to one provider or multiple?
- Can specific repos/directories be excluded?
- Is there an audit trail of what code was sent?

## Meeting Notetakers

**If Otter.ai scores low (training, consent, litigation):**
- Zoom AI Companion — no third-party transfer, built into platform
- Google Meet AI notes — stays within Google boundary
- Microsoft Teams Copilot — stays within Microsoft boundary
- Fathom — no third-party training, free tier, but Zoom-only
- Fireflies.ai (enterprise) — SOC 2, zero-day retention with vendors, BAAs

**If any third-party notetaker scores low:**
- Switch to the built-in AI of your meeting platform (Zoom, Meet, Teams)
- This eliminates third-party data transfer entirely
- Trade-off: less feature-rich, but dramatically better security posture

**If meeting recording is needed for privileged/board conversations:**
- Don't use ANY AI notetaker — use a human notetaker
- If recording is necessary, use platform's native recording (not AI transcription) with explicit all-party consent documented

## Productivity AI (Docs, Sheets, Email)

**If Notion AI on Free/Plus scores low:**
- Notion Business ($20/user/mo) — full AI, SSO, audit logs, better controls
- Notion Enterprise — zero data retention with LLM providers
- Google Workspace with Gemini — no third-party transfer, strongest certification portfolio
- Microsoft 365 Copilot — no third-party transfer for core features, extensive admin controls

**If Microsoft 365 Copilot scores low (oversharing, Anthropic subprocessor):**
- Google Workspace Gemini — no third-party transfer, ISO 42001
- Restrict Copilot to specific user groups via admin controls
- Disable the Anthropic subprocessor connection if EU data boundary is a concern

## Design AI

**If Figma AI or Canva AI scores low:**
- Adobe Firefly Enterprise — trained only on licensed Adobe Stock, no third-party data
- Disable AI features in design tools (usually low-impact since AI is supplementary)
- For sensitive design work (pre-launch product), work locally and disable AI features for those files

## CRM / Revenue Ops AI

**If Salesforce Einstein scores low:**
- Einstein Trust Layer with data masking provides strong protections
- Ensure trust layer is properly configured — it's not automatic

**If HubSpot AI scores low:**
- Review HubSpot's AI settings — many features can be disabled per-portal
- For sensitive CRM data, disable AI features for specific pipelines/objects

## Shadow AI (the alternative is governance, not a tool)

**Shadow AI always scores Red. The alternatives are:**
1. AI Acceptable Use Policy (the #1 recommendation)
2. Approved tool list with specific tiers mandated
3. Enterprise plans of already-used tools (legitimize what people use, with protections)
4. Employee training on why consumer AI is risky for work data
5. Technical controls (DLP, OAuth app approval workflows, browser extension management)

## Research Approach for Unlisted Alternatives

When you need to evaluate a tool not listed here:

1. Search: `[tool name] privacy policy AI data training`
2. Search: `[tool name] SOC 2 ISO 27001 certifications`
3. Search: `[tool name] enterprise vs consumer data handling`
4. Check: Does it use third-party LLMs? Which ones?
5. Check: Is there a DPA / BAA available?
6. Score Domain 2 (Training) and Domain 4 (Security) as a minimum quick-score
7. If both ≥ 4, it's likely a viable alternative. If either ≤ 2, keep looking.
