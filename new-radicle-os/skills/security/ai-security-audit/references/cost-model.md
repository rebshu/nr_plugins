# Financial Exposure Estimation Model

Use this model to estimate the financial exposure for Orange and Red findings. All estimates should be presented as **ranges**, not point estimates. Always cite the source.

## Baseline Data Sources

### IBM Cost of a Data Breach Report 2025
- **Average total cost of a data breach:** $4.88M (global), $9.36M (US)
- **Shadow AI premium:** $670K additional cost when shadow/unmanaged AI is involved
- **AI-related breach cost (13% of organizations):** 97% of those lacked proper AI access controls
- **Average cost per lost/stolen record:** $165
- **Healthcare sector:** $10.93M average (highest by industry)
- **Financial sector:** $6.08M average

### Regulatory Fine Ranges

**EU AI Act (effective Aug 2, 2026 for high-risk systems):**
- Prohibited practices: up to €35M or 7% of global annual turnover (whichever higher)
- High-risk non-compliance: up to €15M or 3% of global turnover
- Incorrect information to authorities: up to €7.5M or 1% of global turnover
- For SMEs: proportionally reduced caps

**GDPR:**
- Standard violations: up to €10M or 2% of global turnover
- Severe violations: up to €20M or 4% of global turnover
- Precedent: Italy fined OpenAI €15M in Dec 2024 (first GenAI GDPR fine)

**CCPA/CPRA:**
- $2,500 per unintentional violation
- $7,500 per intentional violation
- No cap on aggregate

**BIPA (Illinois):**
- $1,000 per negligent violation
- $5,000 per intentional/reckless violation
- No cap. Class actions routinely reach $100M+ settlements
- Relevant if any tool collects voiceprints (speaker identification features)

**HIPAA:**
- Tier 1 (unknowing): $100-$50,000 per violation, $25,000 annual max per category
- Tier 4 (willful neglect, uncorrected): $50,000 per violation, $1.5M annual max
- Criminal penalties possible

### Litigation Benchmarks

**AI notetaker litigation:**
- Otter.ai: 4+ active federal lawsuits (2025) — ECPA, CIPA, BIPA claims
- Potential per-recording damages under wiretap statutes: $1,000-$10,000
- Class action scale: thousands of meetings × multiple participants = massive potential exposure

**Shadow AI data leak precedent:**
- Samsung (2023): After employees leaked source code via ChatGPT, Samsung banned ChatGPT entirely. Cost not publicly disclosed but included: incident response, internal investigation, policy overhaul, employee retraining, and reputational damage.

**Deepfake / AI-powered fraud:**
- Arup (2025): Lost $25.5M to deepfake video conference

## Estimation Framework

For each Orange or Red finding, estimate exposure using this framework:

### Step 1: Identify the Exposure Type

| Type | Baseline Range | Adjustment Factor |
|------|---------------|-------------------|
| Data training exposure (proprietary data in model) | $50K - $500K | × data sensitivity tier |
| Regulatory non-compliance | Fine range per regulation | × likelihood of enforcement |
| Shadow AI breach premium | $670K | Per IBM 2025 |
| Third-party data retention exposure | $100K - $1M | × volume of data × retention period |
| Consent/recording violation | $1K - $10K per incident | × number of affected meetings |
| IP compromise (code in training) | $200K - $2M | × uniqueness of IP |

### Step 2: Apply Data Sensitivity Multiplier

| Sensitivity Tier | Multiplier |
|-----------------|------------|
| Tier 1 (Critical) | 3.0x |
| Tier 2 (Sensitive) | 2.0x |
| Tier 3 (Internal) | 1.0x |
| Tier 4 (Low) | 0.5x |

### Step 3: Apply Blast Radius Multiplier

| Blast Radius | Multiplier |
|-------------|------------|
| Org-wide | 2.0x |
| Team-scoped | 1.0x |
| Individual | 0.5x |
| Unknown | 2.0x (assume worst) |

### Step 4: Present as Range

Always present as: **Low estimate – High estimate**

Example calculation for Cursor with Privacy Mode OFF:
- Exposure type: IP compromise (code in training) — $200K - $2M
- Data sensitivity: Tier 2 (proprietary code) — 2.0x
- Blast radius: Team (engineering) — 1.0x
- **Estimated exposure: $400K – $4M**

Example for Shadow AI:
- Exposure type: Shadow AI breach premium — $670K baseline
- Data sensitivity: Tier 1 (investor materials likely) — 3.0x
- Blast radius: Unknown — 2.0x
- **Estimated exposure: $670K – $4M**

## How to Present Financial Exposure

In the scorecard and report:

```
💰 Estimated Exposure: $400K – $4M
   Based on: IP compromise baseline ($200K-$2M) × Tier 2 sensitivity (2.0x) × team blast radius (1.0x)
   Source: IBM Cost of Data Breach 2025, adjusted for data sensitivity
```

**Important caveats to always include:**
1. These are rough estimates based on industry benchmarks, not actuarial calculations
2. Actual exposure depends on factors outside this model (insurance coverage, specific data involved, jurisdiction)
3. The purpose is to establish an order-of-magnitude business case for remediation, not precise financial prediction
4. Reputational damage is not quantified but can exceed direct financial costs
