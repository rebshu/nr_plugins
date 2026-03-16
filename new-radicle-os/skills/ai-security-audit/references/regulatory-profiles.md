# Regulatory Profiles & Jurisdiction Weighting

## Phase 1 Questions

Use `ask_user_input_v0` with these questions at the start of every audit.

### Question 1: Operating Jurisdictions
- US only
- US + EU/EEA
- US + UK
- Global (US + EU + APAC or other)
- Other (ask to specify)

### Question 2: Regulatory Regimes
- General business (no specific sectoral regulation)
- Healthcare (HIPAA applies)
- Financial services (SEC, FINRA, SOX apply)
- Government / public sector (FedRAMP, FISMA)
- Education (FERPA applies)
- None specifically known

### Question 3: EU Data Processing
- Yes — we process personal data of EU/EEA residents
- No
- Unsure (treat as Yes for scoring purposes)

### Question 4: Most Sensitive Data Category
- Investor/fundraising materials (term sheets, cap tables, pitch decks, board materials)
- Client/customer PII (names, emails, financial info, health info)
- Health/medical data (PHI under HIPAA)
- Financial data (non-public financial information)
- Proprietary code/IP (trade secrets, unreleased product)
- Strategic plans (M&A, competitive intelligence, go-to-market)
- None particularly sensitive

### Question 5: Team Size
- 1-5 (startup/early stage — fewer controls expected, higher per-person risk)
- 6-20 (growth stage — governance gap most acute)
- 21-100 (scaling — formal controls expected)
- 100+ (enterprise — mature governance expected)

## How Regulatory Profile Affects Scoring

### Domain 6 (Regulatory) Calibration

The base scoring criteria in evaluation-domains.md apply regardless. But the regulatory profile shifts what "adequate" means:

**Healthcare (HIPAA):**
- Any tool without BAA availability = automatic score of 1 in Domain 6
- Any tool that cannot guarantee zero data retention = maximum score of 2
- Meeting notetakers require special scrutiny — PHI in verbal form is still PHI

**Financial Services:**
- SEC/FINRA record retention rules apply to AI-generated summaries
- Any tool that could create discoverable records must be assessed for e-discovery
- AI outputs used in client communications may trigger suitability obligations

**EU Data Processing (GDPR):**
- Any tool without DPA = automatic score of 1 in Domain 6
- Any tool without EU data residency option = maximum score of 3
- Transfer Impact Assessment required for US-based processing
- EU AI Act GPAI obligations apply to providers of models you use
- If EU-US Data Privacy Framework is invalidated, all US API calls require SCCs

**Government (FedRAMP):**
- Any tool without FedRAMP authorization = automatic score of 1 in Domain 6
- Consumer-tier tools categorically fail this requirement

**Education (FERPA):**
- Student data in AI tools requires explicit consent or directory information exception
- Meeting recordings of student interactions trigger FERPA

### Cross-Cutting Regulatory Calendar (2026)

Note these upcoming dates in the monitoring checklist:
- **Feb 2, 2025** (PAST): EU AI Act — prohibited practices and AI literacy effective
- **Aug 2, 2025** (PAST): EU AI Act — GPAI model obligations effective
- **Aug 2, 2026** (UPCOMING): EU AI Act — full high-risk system requirements effective
- **Jun 30, 2026** (UPCOMING): Colorado AI Act enforcement begins
- **Jan 1, 2026** (PAST): California SB 53 effective (frontier AI risk frameworks)
- **Jan 1, 2026** (PAST): Illinois HB 3773 effective (AI in employment decisions)
- **Ongoing**: FTC "Operation AI Comply" enforcement actions
- **At risk**: EU-US Data Privacy Framework adequacy decision
