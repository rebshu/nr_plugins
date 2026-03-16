# Quick Wins Action Plan Template

This is the most important output of the audit. If someone reads nothing else, this should be enough to act on. Generate as a standalone .md file.

## Format

```markdown
# AI Security — Action Plan
## [Organization Name] | [Date]

*This is a prioritized action list from the AI Security Audit conducted on [date]. [X] tools were assessed across [Y] categories. Overall risk posture: [Score] / 5.0 ([Tier]).*

---

### 🔴 Day 1 — Do Right Now

These are settings to toggle, configurations to verify, and immediate risks to address. Each should take less than 15 minutes.

**Action 1: [Title]**
- What: [Specific action — e.g., "Open Cursor → Settings → verify Privacy Mode is ON"]
- Why: [One sentence — e.g., "With Privacy Mode OFF, your codebase is being used to train Cursor's models"]
- Who: [Role/person — e.g., "Every developer using Cursor"]
- Risk if skipped: [Consequence — e.g., "Proprietary code enters third-party training pipelines"]
- 💰 Estimated exposure: [Range from cost model]

**Action 2: [Title]**
[Same format]

---

### 🟡 Week 1 — This Week

Policies to draft, team communications to send, and configurations that require more setup.

**Action 3: [Title]**
- What: [Specific action]
- Why: [One sentence]
- Who: [Role/person]
- Deliverable: [What gets produced — e.g., "AI Acceptable Use Policy (template provided in audit package)"]

**Action 4: [Title]**
[Same format]

---

### 🟠 Month 1 — This Month

Tier upgrades to evaluate, alternatives to trial, training to conduct.

**Action 5: [Title]**
- What: [Specific action]
- Why: [One sentence]
- Cost: [If applicable — e.g., "Notion Business upgrade: $20/user/month"]
- Benefit: [What it solves]
- Decision needed by: [Date]

**Action 6: [Title]**
[Same format]

---

### 📋 Quarter 1 — This Quarter

Governance structures, vendor reviews, monitoring setup.

**Action 7: [Title]**
- What: [Specific action]
- Why: [One sentence]
- Cadence: [How often this recurs]

---

### Summary

| Timeframe | Actions | Critical? |
|-----------|---------|-----------|
| Day 1 | [count] | [Y/N] |
| Week 1 | [count] | [Y/N] |
| Month 1 | [count] | [N] |
| Quarter 1 | [count] | [N] |

**Total estimated exposure if no action taken: $[Low] – $[High]**
```

## Prioritization Rules

When building the action plan:

1. **Day 1 items must be settings toggles or configurations.** Nothing that requires writing, approval, or budget. Just "open this, check that, toggle this." Maximum 15 minutes per action.

2. **Week 1 items are documentation and communication.** Writing the AI AUP, sending it to the team, configuring consent settings in meeting tools. Things one person can do in a few hours.

3. **Month 1 items involve decisions.** Tier upgrades, tool switches, budget requests. Things that need discussion or approval.

4. **Quarter 1 items are structural.** Governance committee, vendor review cadence, training programs. Things that need planning and recurring commitment.

5. **Red-tier findings always generate Day 1 or Week 1 actions.** Never push a Red finding to Month 1.

6. **Orange-tier findings generate Week 1 or Month 1 actions.** Include a specific remediation deadline (60 days from audit date).

7. **Financial exposure estimates only for Day 1 and Week 1 items.** This creates urgency for the right things.

8. **Every action must name a "Who."** Even if it's just "[Founder name]" or "[Ops lead]" — actions without owners don't get done.
