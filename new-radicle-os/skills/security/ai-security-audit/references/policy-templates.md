# Policy Templates

Generate these as separate .md files tailored to the audit findings. Replace all [BRACKETED] fields with actual findings.

## Template 1: AI Acceptable Use Policy

```markdown
# AI Acceptable Use Policy
## [Organization Name]
### Effective: [Date] | Version 1.0

#### Purpose
This policy defines how AI tools may be used for [Organization] work. It protects our intellectual property, client data, and regulatory compliance while enabling productive use of AI.

#### Scope
This policy applies to all team members, contractors, and advisors who perform work for [Organization].

#### Approved AI Tools

The following tools are approved for work use at the specified tiers:

| Tool | Approved Tier | Approved Uses | Required Settings |
|------|--------------|---------------|-------------------|
| [Tool 1] | [Tier] | [Uses] | [Settings] |
| [Tool 2] | [Tier] | [Uses] | [Settings] |
| [Tool 3] | [Tier] | [Uses] | [Settings] |

#### Prohibited Uses

The following are prohibited regardless of which tool is used:

1. **Personal AI accounts for work.** Do not use personal ChatGPT, Claude, Gemini, or other AI accounts for any work-related task. Consumer tiers typically train on your inputs.
2. **Sensitive data in any AI tool.** The following data types must NEVER be entered into any AI tool without explicit approval from [Role]:
   - [List from audit: e.g., investor materials, term sheets, cap tables]
   - [Client/customer PII]
   - [Passwords, API keys, credentials]
   - [Legal/privileged communications]
   - [Board materials]
3. **AI meeting recording without consent.** AI notetakers may only be used in meetings where [consent requirements from audit findings]. See Meeting AI Policy for details.
4. **Unapproved AI tools.** Any AI tool not on the approved list above requires approval from [Role] before use.

#### Required Configurations

All team members using approved AI tools must verify these settings:

[Pre-fill from audit findings, e.g.:]
- [ ] Claude: "Improve Claude" toggle OFF (Settings → Data Controls)
- [ ] Cursor: Privacy Mode ON (Settings → Privacy Mode)
- [ ] [Other tool-specific settings]

#### Requesting New AI Tools

To request approval for a new AI tool:
1. Submit tool name, intended use, and tier/plan to [Role/email]
2. [Role] will evaluate using the AI Vendor Risk Questionnaire
3. Approval or denial will be communicated within [X] business days

#### Violations

Violations of this policy should be reported to [Role]. Depending on severity, violations may result in [consequences appropriate to organization].

#### Review

This policy will be reviewed [quarterly/annually] and updated as AI tools and regulations evolve. Last review: [Date].
```

## Template 2: AI Vendor Risk Assessment Questionnaire

```markdown
# AI Vendor Risk Assessment Questionnaire
## [Organization Name]

Complete this questionnaire for any AI tool before approving it for organizational use.

### Tool Information
- Tool name:
- Vendor:
- Tier/plan being evaluated:
- Intended use:
- Data types that will be processed:
- Number of users:
- Requested by:
- Assessment date:

### Domain 1: Data Flow & Residency
1. Where is data processed geographically?
2. List ALL third parties that handle our data when AI features are used:
3. Is there a data flow diagram available? (Attach or link)
4. What data residency options are available?
5. Is there a Data Processing Agreement (DPA) available?

### Domain 2: Training & Model Improvement
6. Is our data used to train or improve AI models? (Y/N)
7. If yes, at which tiers? Is opt-out available?
8. Is the no-training commitment in the MSA/DPA (contractual) or only in the privacy policy?
9. If we opt out, what happens to data already processed?
10. When was the training/data policy last updated?

### Domain 3: Access Control & Permissions
11. What organizational data can the AI feature access?
12. Does it respect existing RBAC / permission structures?
13. Can admins disable AI features for specific users/groups?
14. Is there an audit log for AI-driven data access?
15. Was the AI feature enabled by default, or does it require explicit activation?

### Domain 4: Security Architecture
16. List security certifications held (SOC 2, ISO 27001, ISO 42001, etc.):
17. Are AI features specifically in scope for these certifications?
18. Has the vendor had any AI-related security incidents? (Research independently)
19. Does the vendor conduct AI-specific red teaming / penetration testing?
20. Is there a bug bounty program covering AI features?

### Domain 5: IP Protection
21. Does the ToS grant the vendor any license to content processed by AI?
22. Who owns AI-generated outputs?
23. Does the vendor offer IP indemnification?
24. Could our data be extracted from models? What technical measures prevent this?

### Domain 6: Regulatory Compliance
25. What regulatory frameworks does the vendor claim compliance with?
26. Is a BAA available (if HIPAA applies)?
27. Is GDPR compliance documented with DPA?
28. Has the vendor faced regulatory enforcement or fines?
29. For recording tools: how is all-party consent obtained?
30. Does the tool process biometric data (voiceprints, facial recognition)?

### Domain 7: Operational Risk
31. What accuracy/reliability commitments exist?
32. Can all AI-generated content be exported in standard formats?
33. What happens to our data if we terminate the service?
34. What is the AI feature's uptime SLA?

### Assessment Summary
- Composite score (1-5):
- Risk tier (Green/Yellow/Orange/Red):
- Recommendation (Approve/Restrict/Remediate/Deny):
- Required configurations before use:
- Reviewer:
- Review date:
```

## Template 3: Meeting AI Recording Policy

Only generate this template if meeting notetakers or recording AI were found in the audit.

```markdown
# Meeting AI Recording & Transcription Policy
## [Organization Name]
### Effective: [Date]

#### Purpose
This policy governs the use of AI-powered meeting recording, transcription, and summarization tools to protect confidentiality, comply with recording consent laws, and manage IP exposure.

#### Approved Meeting AI Tools
| Tool | Approved For | Excluded From |
|------|-------------|---------------|
| [e.g., Zoom AI Companion] | Internal team meetings, non-sensitive | Board, legal, HR, investor |
| [e.g., Fireflies] | [Specific approved uses] | [Excluded meeting types] |

#### Consent Requirements

**All-party consent is required.** Before any AI recording:
1. The meeting organizer must notify all participants that AI recording/transcription will be used
2. Notification must occur BEFORE the meeting starts (pre-meeting email or verbal announcement)
3. Any participant may decline recording — if declined, AI recording must be disabled for that meeting
4. For meetings involving participants in California, Illinois, or other all-party consent states, written/electronic consent must be documented

**For [approved tool]:** Enable pre-meeting consent emails in tool settings.

#### Meeting Types Where AI Recording is PROHIBITED

The following meeting types must NEVER use AI recording or transcription:
- [ ] Board meetings and board committee meetings
- [ ] Conversations with legal counsel (attorney-client privilege risk)
- [ ] HR/personnel discussions (performance reviews, disciplinary, termination)
- [ ] Investor meetings and fundraising discussions
- [ ] M&A discussions
- [ ] Meetings involving health information (HIPAA)
- [ ] Meetings where any participant requests no recording

#### Data Handling
- Meeting transcripts and recordings are [Organization] property
- Transcripts should be reviewed for accuracy before being treated as official records
- AI-generated action items must be verified by a human — AI hallucinations can fabricate commitments
- Recordings should be deleted when no longer needed per our data retention schedule

#### External Meetings
When meeting with clients, partners, or other external parties:
- Default: AI recording OFF unless explicitly approved by all parties
- If an external party's AI notetaker attempts to join our meeting, [policy: allow/deny/ask]

#### Review
This policy will be reviewed [quarterly]. Meeting AI tools will be re-assessed per the AI security audit framework.
```

## Tailoring Instructions

When generating these templates:
1. Replace ALL [BRACKETED] fields with actual data from the audit
2. Pre-fill the approved tools table from the Green and Yellow-tier tools
3. Pre-fill prohibited uses from the Red and Orange findings
4. Pre-fill required configurations from specific tool findings
5. Adapt consent requirements to the jurisdictions identified in Phase 1
6. If HIPAA applies, add PHI-specific provisions
7. If EU data processing applies, add GDPR data subject rights provisions
