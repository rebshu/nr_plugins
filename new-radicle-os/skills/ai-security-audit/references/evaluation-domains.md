# Evaluation Domains & Scoring Criteria

Use this reference during Phase 2 (Research) and Phase 3 (Score) to evaluate each AI tool.

## Domain 1: Data Flow & Residency

**What to research:**
- Where does user data go when AI features are used?
- Are third-party LLM providers involved? Which ones?
- What subprocessors handle the data?
- Where is data stored geographically?
- Is there a clear data flow diagram available?

**Search queries:**
- `[tool] data processing subprocessors AI`
- `[tool] where is data stored AI features`
- `[tool] third party AI providers`

**Scoring:**
- 5: All processing in-house or within clearly documented, contractually bound infrastructure. Data residency options available. Full data flow transparency.
- 4: Third-party processing with named providers under DPA. Regional processing options. Clear documentation.
- 3: Third-party processing documented but limited residency options. DPA exists but generic.
- 2: Third-party processing with limited transparency about subprocessors. No regional options.
- 1: Unclear where data goes. No DPA. Unnamed third parties. Data leaves organizational boundary without controls.

## Domain 2: Training & Model Improvement

**What to research:**
- Does the vendor use customer data to train AI models?
- Is this different for free vs paid vs enterprise tiers?
- What is the opt-out mechanism and who controls it?
- Is the no-training commitment contractual or only in a privacy policy?
- What happens to data already used before opt-out?

**Search queries:**
- `[tool] AI training data policy opt out 2025 2026`
- `[tool] does it train on user data`
- `[tool] enterprise data training policy`
- `[tool] privacy policy changes AI`

**Scoring:**
- 5: Contractual commitment (in MSA/DPA) to never train on customer data. No exceptions. Independent audit verification.
- 4: No training on paid/enterprise tiers with contractual backing. Clear opt-out for any applicable tiers.
- 3: No training with opt-out, but commitment is in privacy policy only (not contractual). Or: enterprise tier excluded but lower tiers train by default.
- 2: Trains on data by default with opt-out available, but opt-out is per-user (not organizational) or requires contacting support.
- 1: Trains on data with no opt-out. Or: policy is ambiguous/silent on training. Or: free tier trains with no disclosure.

## Domain 3: Access Control & Permissions

**What to research:**
- What organizational data can the AI access once enabled?
- Does it respect existing RBAC, DLP, and sensitivity labels?
- Can admins scope, disable, or restrict AI features?
- Is there an audit trail for AI-driven data access?
- Was the AI feature enabled by default?

**Search queries:**
- `[tool] admin controls AI features disable`
- `[tool] AI data access scope permissions`
- `[tool] DLP sensitivity labels AI`
- `[tool] AI audit log`

**Scoring:**
- 5: AI respects all existing access controls. Granular admin controls (per-user, per-group, per-data-type). Full audit logging. Disabled by default, requires explicit enablement.
- 4: AI respects access controls with admin toggle. Audit logging exists. May be enabled by default but with admin notification.
- 3: Admin can enable/disable globally but limited granularity. Some audit logging. AI may surface data users have technical access to but wouldn't normally see.
- 2: Limited admin controls. No audit trail for AI-specific access. AI broadens effective data access beyond normal workflows.
- 1: No admin controls. No audit trail. AI accesses all organizational data with no scoping. Enabled by default with no notification.

## Domain 4: Security Architecture & Incident History

**What to research:**
- What security certifications does the vendor hold?
- Are AI features specifically in scope for certifications?
- Has the vendor had AI-related security incidents or vulnerabilities?
- Has the vendor been subject to prompt injection or data exfiltration attacks?
- Does the vendor conduct AI-specific red teaming?

**Search queries:**
- `[tool] SOC 2 ISO 27001 ISO 42001 certifications`
- `[tool] security breach incident AI 2024 2025`
- `[tool] prompt injection vulnerability`
- `[tool] AI security red team`
- `[tool] data leak AI`

**Scoring:**
- 5: SOC 2 Type II + ISO 27001 + ISO 42001 (or equivalent) with AI features in scope. AI-specific red teaming. No known incidents. Bug bounty program covering AI.
- 4: SOC 2 Type II + ISO 27001 with AI in scope. AI security testing conducted. Minor incidents promptly disclosed and remediated.
- 3: SOC 2 Type II but AI features may not be fully in scope. Limited AI-specific security testing. No major incidents known.
- 2: Basic certifications without AI-specific coverage. No evidence of AI security testing. Or: known vulnerabilities with slow remediation.
- 1: No relevant certifications. Known unpatched vulnerabilities. History of data breaches. No security testing evidence.

## Domain 5: Intellectual Property Protection

**What to research:**
- Does the vendor's ToS grant any license to content processed by AI?
- Could proprietary information be extracted from models?
- Are AI-generated outputs owned by the user?
- Does the vendor create derivative works from user content?
- What IP indemnification does the vendor offer?

**Search queries:**
- `[tool] terms of service content license AI`
- `[tool] intellectual property AI outputs ownership`
- `[tool] AI indemnification`
- `[tool] data used to improve models`

**Scoring:**
- 5: Clear contractual language that all AI-processed content and outputs remain user's IP. IP indemnification provided. No derivative works. No content license beyond service delivery.
- 4: Strong IP protections in ToS. Outputs belong to user. Limited license only for service delivery. Indemnification available on enterprise plans.
- 3: IP protections exist but some ambiguity in ToS. No explicit indemnification. Outputs generally belong to user but edge cases unclear.
- 2: Broad content license in ToS. "Aggregated insights" may be derived from user data. No indemnification. Output ownership unclear.
- 1: Vendor claims license to content processed through AI. Data used for training (creating derivative works). No IP protections. Meeting transcripts or other content stored indefinitely on third-party servers.

## Domain 6: Regulatory & Legal Compliance

**What to research:**
- Does this tool trigger obligations under EU AI Act, GDPR, CCPA, HIPAA, or sector laws?
- Is it classified as high-risk under EU AI Act?
- Does it process personal data, biometric data, or health info?
- Are there jurisdictional consent requirements (all-party consent, BIPA)?
- What data subject rights mechanisms exist?
- Has the vendor faced regulatory enforcement?

**Search queries:**
- `[tool] GDPR compliance AI`
- `[tool] EU AI Act classification`
- `[tool] HIPAA BAA AI features`
- `[tool] regulatory fine enforcement AI`
- `[tool] biometric data BIPA`
- `[tool] all party consent recording`

**Scoring:**
- 5: Full regulatory mapping documented. DPIA completed for AI features. HIPAA BAA available. GDPR-compliant with DPA. All-party consent mechanisms (for recording tools). No enforcement history.
- 4: Strong compliance posture with most relevant regulations addressed. BAA available. DPA in place. Minor gaps in documentation.
- 3: Compliance claims made but limited documentation. BAA or DPA available on request. Some regulatory gaps (e.g., no EU AI Act classification yet). No enforcement actions.
- 2: Limited compliance documentation. No BAA. Generic DPA. Potential gaps in consent mechanisms. Or: regulatory enforcement in progress.
- 1: No compliance documentation. Active regulatory enforcement or fines. No consent mechanisms for recording. Processing biometric data without BIPA compliance. No DPA available.

## Domain 7: Operational Risk & Business Continuity

**What to research:**
- What happens when AI produces incorrect outputs?
- Is there human-in-the-loop oversight?
- What vendor lock-in risk exists?
- Can AI-processed data be exported?
- What is the tool's reliability and uptime?

**Search queries:**
- `[tool] AI accuracy hallucination`
- `[tool] data export portability`
- `[tool] AI SLA uptime`
- `[tool] vendor lock-in`

**Scoring:**
- 5: Clear accuracy disclosures. Human review encouraged/required for critical outputs. Full data export in standard formats. Strong SLA. No lock-in.
- 4: Accuracy limitations documented. Export available. Reasonable SLA. Limited lock-in.
- 3: Some accuracy disclosures. Export possible but limited format options. Standard SLA.
- 2: No accuracy disclosures. Limited export. AI outputs may be treated as authoritative without review. Significant lock-in.
- 1: No accuracy information. No export capability. AI-generated content (e.g., meeting minutes) used as official records without verification. Complete vendor lock-in.

---

## Composite Scoring & Tier Assignment

**Calculation:** Sum scores across all 7 domains, divide by 7.

**Tier mapping:**

| Composite | Tier | Color | Action |
|-----------|------|-------|--------|
| 4.0–5.0 | Approved | 🟢 Green | Document approval. Annual review. |
| 3.0–3.9 | Restricted | 🟡 Yellow | Define use boundaries. Quarterly review. |
| 2.0–2.9 | Remediate | 🟠 Orange | 60-day remediation deadline. Essential use only. |
| 1.0–1.9 | Prohibited | 🔴 Red | Block access. Assess exposure. Find alternatives. |

**Priority weighting (required in v2.0 — based on data sensitivity tier):**

### Sensitivity-Weighted Composite Calculation

Instead of simple average, apply weights based on the data sensitivity tier of each tool:

**Tier 1 (Critical) data — investor materials, legal, board, trade secrets:**
- Domains 2 (Training), 5 (IP), 6 (Regulatory): weight = 2.0
- All other domains: weight = 1.0
- Composite = weighted sum / sum of weights = weighted sum / 10.0

**Tier 2 (Sensitive) data — PII, financials, code, strategic plans:**
- Domains 2 (Training), 4 (Security), 6 (Regulatory): weight = 1.5
- All other domains: weight = 1.0
- Composite = weighted sum / sum of weights = weighted sum / 8.5

**Tier 3-4 (Internal/Low) data:**
- All domains: weight = 1.0
- Composite = simple average = sum / 7.0

### Worked Example

Tool: Notion AI | Tier 2 data (strategic plans + operations)
Scores: D1=2, D2=3, D3=3, D4=4, D5=3, D6=3, D7=3

Unweighted composite: (2+3+3+4+3+3+3) / 7 = 3.0

Weighted composite (Tier 2):
= (2×1.0 + 3×1.5 + 3×1.0 + 4×1.5 + 3×1.0 + 3×1.5 + 3×1.0) / 8.5
= (2 + 4.5 + 3 + 6 + 3 + 4.5 + 3) / 8.5
= 26.0 / 8.5
= 3.06

In this case weighting doesn't change the tier. But if D2 or D6 were lower, the weighted score would drop below 3.0, shifting to Orange — reflecting that training and regulatory risks matter more when sensitive data is involved.

### Blast Radius Modifier

After calculating weighted composite, apply the blast radius context to the action urgency (not the score itself):
- **Org-wide:** Elevate action timeline by one tier (Month 1 actions → Week 1)
- **Team-scoped:** Standard timeline
- **Individual:** De-prioritize timeline by one tier (Week 1 → Month 1), unless data sensitivity is Tier 1
- **Unknown:** Treat as Org-wide

---

## Research Tips

1. **Always check the vendor's own trust/security page first.** Most serious vendors have one (e.g., trust.openai.com, anthropic.com/transparency, slack.com/trust).
2. **Check for recent policy changes.** Many vendors changed AI data policies in 2024-2025. The current policy may be very different from what was in place 12 months ago.
3. **Differentiate tiers aggressively.** The same tool can score 5 on enterprise and 1 on free tier.
4. **Search for lawsuits.** AI notetakers and recording tools in particular have active litigation.
5. **Check subprocessor lists.** If a tool says "we use AI" but doesn't name the provider, that's a red flag.
6. **Look for "enabled by default" patterns.** Many AI features were rolled out as opt-out rather than opt-in.
7. **Cross-reference with the Otter.ai / EchoLeak / GeminiJack incidents** as benchmarks for the types of vulnerabilities that exist in AI-integrated platforms.
