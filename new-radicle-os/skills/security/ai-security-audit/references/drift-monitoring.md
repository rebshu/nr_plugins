# Drift Monitoring & Recurring Audit Guide

AI security is not a point-in-time exercise. Vendor policies change, new features auto-enable, employees adopt new tools, and regulations take effect. This reference defines the ongoing monitoring cadence.

## Monitoring Checklist Output Format

Generate as a standalone .md file tailored to the audit findings:

```markdown
# AI Security Monitoring Checklist
## [Organization Name] | Established [Date]

### Weekly: Shadow AI Scan (5 minutes)
- [ ] Check for new OAuth app authorizations in Google Workspace admin
- [ ] Review any unfamiliar meeting participants/bots in recent calendar events
- [ ] Note any new AI tools mentioned by team members in Slack/chat

### Monthly: Settings Verification (15 minutes)
[Pre-fill from audit findings — each verified setting becomes a monthly check]
- [ ] Cursor: Privacy Mode still ON for all developers
- [ ] Claude: "Improve Claude" toggle still OFF for all users
- [ ] Fireflies: Pre-meeting consent emails still enabled
- [ ] [Tool]: [Setting] still [correct state]
- [ ] Check for AI features newly enabled by default in existing platforms
- [ ] Review any new team members — verify they have correct AI tool configurations

### Quarterly: Vendor Policy Review (30 minutes)
Check each vendor's security/trust page for policy changes:
[Pre-fill with actual URLs from the audit]
- [ ] Claude: https://privacy.claude.com — last checked [date]
- [ ] Cursor: https://cursor.com/security — last checked [date]
- [ ] Notion: https://www.notion.com/help/notion-ai-security-practices — last checked [date]
- [ ] Fireflies: https://fireflies.ai/security — last checked [date]
- [ ] Google Workspace: https://support.google.com/a/answer/15706919 — last checked [date]
- [ ] Zoom: https://zoom.us/en/ai-assistant — last checked [date]
- [ ] [Additional tools from audit]

Re-score any tool where policy has changed since last check.
Re-score all Yellow-tier tools.

### Quarterly: Regulatory Calendar Check (15 minutes)
Review upcoming regulatory effective dates:
[Pre-fill from regulatory-profiles.md based on applicable jurisdictions]
- [ ] EU AI Act milestones (next: Aug 2, 2026 — full high-risk enforcement)
- [ ] State AI law effective dates (Colorado Jun 2026, etc.)
- [ ] GDPR enforcement actions against AI providers (search recent news)
- [ ] FTC AI enforcement actions (search recent news)
- [ ] EU-US Data Privacy Framework status

### Annually: Full Re-Audit
- Run the complete AI Surface Audit skill again
- Compare scores to previous audit — identify drift
- Update all policy templates
- Brief leadership on changes

### Trigger Events — Immediate Re-Assessment
If any of these occur, re-assess the affected tool immediately:

**Vendor triggers:**
- [ ] Vendor announces privacy policy or ToS change
- [ ] Vendor discloses a security incident or breach
- [ ] Vendor launches new AI features (especially auto-enabled ones)
- [ ] Vendor changes pricing tiers (may affect data handling by tier)
- [ ] Vendor is acquired or merges with another company

**Organization triggers:**
- [ ] New team member joins (onboard with AI AUP + tool configurations)
- [ ] Team member departs (revoke AI tool access, review data exposure)
- [ ] Organization starts processing a new data type (health, financial, EU personal data)
- [ ] Organization enters a new regulatory jurisdiction
- [ ] M&A activity (due diligence should include AI security audit of target)

**External triggers:**
- [ ] New AI-related regulation takes effect
- [ ] Major AI security incident in the news (assess if your tools are affected)
- [ ] Industry peer experiences AI-related breach
- [ ] EU-US Data Privacy Framework adequacy decision changes
```

## Recommended Cadences by Risk Profile

| Organization Profile | Full Re-Audit | Quarterly Review | Monthly Checks |
|---------------------|---------------|-----------------|----------------|
| Early-stage, <10 people, general business | Annually | Light (30 min) | Settings only |
| Growth-stage, 10-50, handles PII | Semi-annually | Full (1 hour) | Settings + shadow scan |
| Regulated industry (health, finance, gov) | Quarterly | Full (1 hour) | All checks |
| Enterprise, 100+, multiple jurisdictions | Quarterly | Full + vendor calls | All checks + automated |

## Drift Signals to Watch For

These patterns suggest your AI security posture is drifting:

1. **New tools appearing without approval** — someone signed up for a new AI tool and it's spreading
2. **Vendor policy change without internal review** — you see news about a vendor changing their data practices but haven't updated your assessment
3. **Feature auto-enablement** — a platform you use rolls out new AI features that are on by default
4. **Team growth without AI onboarding** — new people join but don't get configured with the right settings
5. **Score decay** — tools that were Yellow start looking Orange as you learn more about their practices
6. **Regulatory catch-up** — a new law takes effect and you haven't assessed its impact on your AI tools

## Versioning

Each monitoring cycle should note:
- Date of check
- Any changes found
- Actions taken
- Next scheduled check

Keep a running log — this becomes valuable for compliance documentation and audit trails.
