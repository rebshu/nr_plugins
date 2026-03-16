# Scorecard Output Guide

When generating the scorecard artifact in Phase 4, follow these specifications.

## React Artifact Structure

Build a single-file React component (.jsx) with these sections:

### 1. Header
- Title: "AI Security Audit — [Company Name or 'Your Organization']"
- Date of audit
- Number of tools assessed
- Overall risk posture (calculated from tool scores)

### 2. Executive Summary
- 3-4 sentence overview of findings
- Count of tools in each tier (Green/Yellow/Orange/Red)
- Top 3 critical findings

### 3. Critical Findings Banner
- If any tools scored Red or Orange, show them prominently at top
- Each finding should include: tool name, category, composite score, primary risk, and recommended action
- Use clear visual hierarchy — this is the first thing the reader should see

### 4. Scorecard Grid
For each tool, display:
- Tool name and category
- Tier badge (colored: 🟢🟡🟠🔴)
- **Data sensitivity badge** (🔴🟠🟡🟢 with label)
- **Blast radius indicator** (Org / Team / Individual)
- Composite score — show both weighted and unweighted if they differ
- **Financial exposure** (for Orange/Red items): "$XXK – $XXM"
- Mini bar chart or dot visualization showing score across all 7 domains
- Expandable detail section with:
  - Per-domain scores with brief evidence notes
  - Key findings (what we found)
  - **Safer alternatives** (for Orange/Red items): name, quick-score, trade-offs
  - Recommended action
  - Links to relevant vendor security pages

### 5. Category Summary
- Group tools by category
- Show category-level risk assessment
- Identify categories with no tools assessed (potential blind spots)

### 6. Financial Exposure Summary
- Total estimated exposure range across all findings
- Breakdown by finding (Orange/Red items only)
- Source citations for all estimates
- Caveat that these are order-of-magnitude estimates, not actuarial

### 7. Safer Alternatives (for Orange/Red tools)
- For each Orange/Red tool, show 1-2 alternatives with:
  - Name and tier
  - Quick-score composite
  - Key advantage over current tool
  - Trade-offs (features, cost, migration)

### 8. Data Flow Diagram
- Embed or reference the data flow visual
- Show: tool → provider → retention → protections
- Color-code by protection level (contractual vs policy-only vs none)

### 9. Recommended Actions
- **Replace the old generic action plan with the Quick Wins format**
- Four time horizons: Day 1 / Week 1 / Month 1 / Quarter 1
- Each action: What, Why, Who, Risk-if-skipped
- Financial exposure for urgent items

### 10. Methodology Footer
- Brief description of the 7 evaluation domains
- Framework references (NIST AI RMF, ISO 42001, OWASP Top 10 for LLMs)
- Disclaimer that this is a point-in-time assessment and vendor policies change

## Design Specifications

Use Tailwind CSS utility classes. Keep the design clean and editorial:

**Color palette:**
- Background: white or very light warm gray
- Text: dark charcoal (#1a1a2e or similar)
- Green tier: emerald-500 / emerald-50
- Yellow tier: amber-500 / amber-50
- Orange tier: orange-500 / orange-50
- Red tier: rose-500 / rose-50
- Accent: slate-600 for secondary text
- Borders: slate-200

**Typography:**
- Use system fonts (no external font loading in React artifacts)
- Large, clear headings
- Generous whitespace
- Score numbers should be prominent

**Interactivity:**
- Expandable/collapsible tool details (click to expand)
- Category filtering (show all / show by category / show by tier)
- Sort by: name, score (ascending/descending), category, tier

**Data structure for the scorecard:**
```javascript
const auditData = {
  metadata: {
    date: "2026-03-15",
    organization: "Company Name",
    toolsAssessed: 12,
    assessor: "AI Security Audit Skill v2.0",
    regulatoryProfile: {
      jurisdictions: ["US"],
      regulations: ["General"],
      euData: false,
      teamSize: "6-20"
    }
  },
  tools: [
    {
      name: "Tool Name",
      category: "Category Name",
      tier: "free|paid|enterprise",
      dataSensitivity: 1|2|3|4,  // NEW: 1=Critical, 2=Sensitive, 3=Internal, 4=Low
      blastRadius: "org|team|individual|unknown",  // NEW
      approvalStatus: "approved|organic|unknown",  // NEW
      users: "Everyone|Engineering|1-2 people",  // NEW
      scores: {
        dataFlow: { score: 4, notes: "..." },
        training: { score: 5, notes: "..." },
        accessControl: { score: 3, notes: "..." },
        security: { score: 4, notes: "..." },
        ipProtection: { score: 3, notes: "..." },
        regulatory: { score: 4, notes: "..." },
        operational: { score: 3, notes: "..." }
      },
      compositeUnweighted: 3.7,  // NEW: always show both
      compositeWeighted: 3.4,    // NEW: sensitivity-adjusted
      riskTier: "Yellow",
      financialExposure: {       // NEW: for Orange/Red only
        lowEstimate: 400000,
        highEstimate: 4000000,
        basis: "IP compromise baseline × Tier 2 sensitivity × team blast radius",
        source: "IBM Cost of Data Breach 2025"
      },
      alternatives: [            // NEW: for Orange/Red only
        {
          name: "Alternative Tool",
          quickScore: 4.1,
          advantage: "Training excluded by default at org level",
          tradeoff: "$19/user/month vs current pricing",
        }
      ],
      keyFindings: ["...", "..."],
      recommendedAction: "...",
      vendorUrl: "https://...",
      policyLastUpdated: "2026-01-15"  // NEW: drift signal
    }
  ],
  financialSummary: {  // NEW
    totalLowEstimate: 1000000,
    totalHighEstimate: 8000000,
    highestExposureTool: "Shadow AI",
    shadowAIPremium: 670000
  }
};
```

## Markdown Report Structure

The .md report should follow this outline:

```
# AI Security Audit Report
## [Organization] — [Date]

### Executive Summary
[3-4 sentences]

### Critical Findings
[Red and Orange items with immediate recommendations]

### Tool-by-Tool Assessment

#### [Category 1: LLM Providers]
##### [Tool Name] — [Tier Badge] [Composite Score]
- **Data Flow:** [Score] — [Evidence]
- **Training:** [Score] — [Evidence]
- **Access Control:** [Score] — [Evidence]
- **Security:** [Score] — [Evidence]
- **IP Protection:** [Score] — [Evidence]
- **Regulatory:** [Score] — [Evidence]
- **Operational:** [Score] — [Evidence]
- **Key Findings:** [...]
- **Recommendation:** [...]

[Repeat for each tool]

### Governance Recommendations
[Policy, process, and training recommendations]

### Methodology
[Framework references and disclaimer]
```

## Handling Large Assessments

If the user has 15+ tools:
1. Research and score the 10 highest-risk tools in detail
2. Provide quick assessments (composite score only) for remaining tools
3. Offer to deep-dive any specific tool the user wants more detail on
4. Note which tools were fully assessed vs quick-assessed in the output
