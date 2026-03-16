---
name: ai-security-audit
description: Run an interactive AI security and privacy audit for any business. This skill walks users through identifying every AI tool and integration in their organization, researches the actual security policies and risk posture of each tool, and generates a scored risk assessment with visual scorecard, prioritized action plan, cost-of-inaction estimates, policy templates, and safer alternatives. Use this skill whenever someone asks about AI security assessment, AI privacy audit, AI tool risk evaluation, AI governance review, evaluating AI tools for security, shadow AI discovery, AI vendor risk assessment, or anything related to assessing the security and privacy posture of AI tools used in a business. Also trigger this skill when the user asks to push code to GitHub or run git push (for example: "push this to GitHub", "push this branch", "open a PR and push"). This pre-push trigger ensures AI security review runs before code publication. Also triggers on "audit my AI tools", "what are the risks of the AI tools we use", "AI security scorecard", "evaluate our AI stack", "AI risk assessment", "AI acceptable use policy", or "help me secure our AI tools". Always use this skill even if the user only mentions a single tool — the skill will scope appropriately.
---

# AI Security Audit Skill v2.0

## Overview

This skill conducts a comprehensive AI security and privacy audit. It maps every AI touchpoint, researches actual vendor policies, scores risk weighted by data sensitivity, and produces a full output package: interactive scorecard, prioritized action plan, financial exposure estimates, data flow diagram, exportable policy templates, safer alternatives for high-risk tools, and a drift monitoring checklist.

## Mode Selection

Choose the mode based on user intent:

### Mode A: Pre-Push Security Gate (default for GitHub push requests)

Use this mode when the user says things like "push to github", "git push", "open a PR and push", or asks for a pre-push security check.

**Goal:** fast go/no-go decision before code publication.

**Use only these references by default:**
- `references/categories.md`
- `references/evaluation-domains.md`
- `references/regulatory-profiles.md` (only if regulated data/jurisdiction risk appears)
- `references/alternatives-database.md` (only if a finding is Orange/Red)

**Do not generate full audit artifacts in this mode unless explicitly requested.**
Skip scorecard UI, policy templates, drift checklist, and full action-plan package.

#### Pre-Push Workflow

1. **Scope the push surface**
   - Identify what is being pushed (repo/app/service), and whether changes involve code assistants, LLM APIs, CI/CD AI, meeting bots, customer data, secrets, or regulated data.
2. **Run targeted intake**
   - Use the `categories.md` model but only for directly relevant tools and integrations in this push path.
3. **Run focused scoring**
   - Score at least Domains 2, 3, 4, 5, 6.
   - Include Domains 1 and 7 when data flow or operational continuity risk is implicated.
4. **Return gate decision**
   - **PASS:** no critical blockers detected.
   - **PASS WITH CONDITIONS:** push allowed only if listed fixes are completed immediately.
   - **BLOCK:** do not push until blockers are resolved.

#### Pre-Push Output Format

```
## Pre-Push AI Security Gate

Decision: PASS | PASS WITH CONDITIONS | BLOCK

Scope reviewed:
- ...

Top findings:
- [Severity] [Finding] -> [Why it matters]

Required before push:
- [Concrete fix]

Recommended after push:
- [Follow-up improvement]
```

### Mode B: Full AI Security Audit

Use this mode for full organizational audits and governance outputs.

## Workflow - Full Audit Mode (6 Phases)

### Phase 1: Context — Regulatory Profile & Organization Shape

Before mapping tools, establish context that affects scoring weight. Read `references/regulatory-profiles.md` for question set and weight mappings.

**Ask upfront (use `ask_user_input_v0`):**
1. Where does the organization operate? (US / US+EU / Global / Other)
2. What regulations apply? (General / HIPAA / Financial / Government / Education / None specific)
3. Process EU resident data? (Yes / No / Unsure)
4. Most sensitive data category? (Investor materials / Client PII / Health / Financial / Code-IP / Strategic plans / None)
5. Team size? (1-5 / 6-20 / 21-100 / 100+)

This drives Domain 6 (Regulatory) calibration and data sensitivity weighting.

### Phase 2: Intake — Map Surface with Sensitivity & Access

Walk through tool categories per `references/categories.md`. For each tool, capture:
1. **Tier** (Free / Paid / Enterprise)
2. **Data sensitivity** — classify per the 4-tier model:
   - 🔴 Tier 1 Critical: investor materials, M&A, legal/privileged, board, trade secrets, credentials
   - 🟠 Tier 2 Sensitive: client PII, financials, strategic plans, proprietary code, HR, health data
   - 🟡 Tier 3 Internal: comms, project plans, drafts, non-privileged meeting notes, design
   - 🟢 Tier 4 Low: public content, marketing, published docs, general research
3. **Who uses it** (Everyone / Team / 1-2 people / Unknown)
4. **Approval status** (Approved / Organic adoption / Unknown)

Present full inventory with sensitivity and access columns for confirmation.

### Phase 3: Research — Investigate + Identify Alternatives

Research per `references/evaluation-domains.md`. Enhancements:
- For any tool trending Orange or Red during research, immediately look up alternatives in `references/alternatives-database.md` and quick-score them
- Track vendor policy last-updated dates — flag changes within 12 months
- Note whether protections are contractual (MSA/DPA) or policy-only

### Phase 4: Score — Weighted Evaluation + Financial Exposure

Score per `references/evaluation-domains.md` with sensitivity weighting:
- **Tier 1 data:** Domains 2, 5, 6 at 2.0x weight
- **Tier 2 data:** Domains 2, 4, 6 at 1.5x weight
- **Tier 3-4 data:** All domains at 1.0x

Assess blast radius per tool (Org-wide / Team / Individual / Unknown→Org-wide).

For Orange and Red findings, estimate financial exposure per `references/cost-model.md`.

### Phase 5: Output — Generate the Full Package

**5 outputs** (save all to `/mnt/user-data/outputs/`):

1. **Interactive Scorecard** (React .jsx) — per `references/scorecard-template.md`. Includes sensitivity badges, weighted scores, financial exposure, alternatives for Orange/Red tools.

2. **Quick Wins Action Plan** (.md) — per `references/action-plan-template.md`. Four time horizons: Day 1 / Week 1 / Month 1 / Quarter 1. Standalone doc for ops handoff. This is the most important output.

3. **Detailed Report** (.md) — Full findings with regulatory context, data sensitivity table, weighted scores, financial exposure, alternatives, policy references, monitoring checklist.

4. **Data Flow Diagram** — Use Figma `generate_diagram` (if connected) or Visualizer to show: tools → providers → retention periods → contractual protections. Makes the architecture legible at a glance.

5. **Policy Templates** (.md files) — Tailored from `references/policy-templates.md`:
   - AI Acceptable Use Policy (pre-filled with findings)
   - Vendor Risk Questionnaire (based on 7 domains)
   - Meeting AI Policy (if notetakers found)

### Phase 6: Monitor — Drift Detection Setup

Generate a Monitoring Checklist per `references/drift-monitoring.md`:
- Vendor trust/security URLs to check quarterly
- Settings to verify monthly (Privacy Mode toggles, training opt-outs)
- Regulatory calendar (upcoming effective dates)
- Shadow AI discovery prompts
- Re-audit trigger events
- Recommended cadence based on risk profile

---

## Reference Files

Read these as needed during each phase:
- `references/categories.md` — Tool categories, intake questions, data sensitivity classification
- `references/evaluation-domains.md` — 7 domains, scoring criteria, weighted scoring math
- `references/regulatory-profiles.md` — Regulatory intake, jurisdiction-specific weight adjustments
- `references/alternatives-database.md` — Safer alternatives lookup for common tools
- `references/cost-model.md` — Financial exposure estimation methodology
- `references/policy-templates.md` — AI AUP, vendor questionnaire, meeting AI policy templates
- `references/action-plan-template.md` — Quick Wins output format
- `references/scorecard-template.md` — React scorecard output specs
- `references/drift-monitoring.md` — Ongoing monitoring checklist format

## Key Guidelines

- **Data sensitivity changes everything.** A 3.5 tool processing investor decks is more dangerous than a 2.5 processing marketing copy. Always classify before scoring.
- **Alternatives must be verified.** Quick-score any suggested alternative before recommending it.
- **Financial estimates: conservative, sourced, ranges.** Use IBM/Ponemon baselines. Never invent numbers.
- **Policy templates must be tailored.** Fill with actual findings, tool names, and configurations from this audit.
- **Quick Wins is the most important output.** If the user reads nothing else, this should be enough to act on.
- **The data flow diagram tells the story** better than any score table for board/investor audiences.
- **Tier matters enormously.** Same tool, different tier = different risk profile. Always verify.
- **Shadow AI is the biggest gap.** Push gently. Most orgs have 3-5x more AI than they think.
