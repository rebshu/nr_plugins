# AI Tool Categories & Intake Guide

Use this reference during Phase 2 (Intake) to walk the user through identifying all AI touchpoints.

## Enhanced Intake: For EVERY Tool Identified

After the user selects tools in each category, capture these additional fields:

### Data Sensitivity Classification
Ask: "What kind of data flows through [tool name]?"

| Tier | Label | Examples | Badge |
|------|-------|----------|-------|
| 1 | Critical | Investor materials, M&A, legal/privileged, board materials, trade secrets, API keys/credentials | 🔴 |
| 2 | Sensitive | Client PII, financial data, strategic plans, proprietary code, HR/personnel, health data | 🟠 |
| 3 | Internal | Internal comms, project plans, drafts, non-privileged meeting notes, design mockups | 🟡 |
| 4 | Low | Public-facing content, marketing materials, published docs, general research | 🟢 |

If the user is unsure, default to one tier higher than their guess.

### Team Access Mapping
Ask: "Who uses [tool name]?"
- Everyone in the organization → Blast radius: Org-wide
- A specific team (e.g., engineering, marketing) → Blast radius: Team
- 1-2 specific individuals → Blast radius: Individual
- Unknown / not sure → Treat as Org-wide

### Approval Status
Ask: "Was [tool name] formally evaluated and approved, or did it just start being used?"
- Formally approved → Lower shadow AI risk
- Adopted organically → Higher shadow AI risk, likely ungoverned
- Unknown → Treat as organic adoption

---

## Category 1: Core LLM / AI Providers

**What to ask:** "What AI assistants or LLM tools does your team use directly — either through APIs or consumer/enterprise products?"

**Common tools to list:**
- ChatGPT (Free / Plus / Pro / Team / Enterprise)
- Claude (Free / Pro / Max / Team / Enterprise / API)
- Google Gemini (consumer / Workspace / Vertex AI)
- Microsoft Copilot (free / Pro / M365 Copilot)
- Perplexity (Free / Pro / Enterprise)
- DeepSeek
- Mistral (Le Chat / API / La Plateforme)
- xAI Grok
- Custom/self-hosted models (Llama, etc.)

**Critical follow-up:** "What tier/plan are you on for each?" — This is the single most important question. Consumer/free tiers almost always have weaker privacy protections.

## Category 2: AI Coding Assistants

**What to ask:** "What AI tools do your developers use for writing, reviewing, or debugging code?"

**Common tools to list:**
- GitHub Copilot (Individual / Business / Enterprise)
- Cursor
- Claude Code
- Windsurf (Codeium)
- Amazon CodeWhisperer / Q Developer
- Tabnine
- JetBrains AI Assistant
- Sourcegraph Cody
- Replit AI

**Critical follow-up:** "Is the coding assistant configured to send code to external servers, or does it run locally?" and "Does it have access to private repositories?"

## Category 3: Productivity Platform AI

**What to ask:** "Which of your core work platforms have AI features enabled — even if you didn't actively turn them on?"

**Sub-categories:**

### Email AI
- Gmail Gemini features
- Outlook/Microsoft Copilot in email
- Superhuman AI
- Spark AI

### Document / Writing AI
- Google Docs Gemini (Help me write, etc.)
- Microsoft Word Copilot
- Notion AI
- Coda AI
- Grammarly

### Spreadsheet AI
- Google Sheets Gemini
- Microsoft Excel Copilot
- Rows AI
- Airtable AI

### Presentation AI
- Google Slides Gemini
- PowerPoint Copilot
- Gamma
- Beautiful.ai
- Canva AI presentations

### Search & Knowledge AI
- Microsoft Copilot enterprise search
- Google Workspace search with Gemini
- Glean
- Guru AI

**Critical follow-up:** "For Microsoft 365 and Google Workspace — are AI features enabled at the admin level? Do you know if they were turned on by default?" Many organizations discover AI features were auto-enabled without explicit admin action.

## Category 4: Communication & Meeting AI

**What to ask:** "What AI tools are used in or around your meetings, calls, and messaging?"

### Meeting Notetakers (HIGHEST RISK CATEGORY — flag this)
- Otter.ai
- Fireflies.ai
- Fathom
- Read AI
- Granola
- Supernormal
- tl;dv
- Fellow AI
- Avoma
- Chorus/ZoomInfo (sales-specific)

### Meeting Platform Built-in AI
- Zoom AI Companion
- Microsoft Teams Copilot (meeting features)
- Google Meet AI notes
- Webex AI Assistant

### Chat/Messaging AI
- Slack AI
- Microsoft Teams Copilot (chat features)
- Discord AI features

**Critical follow-ups:**
- "Are any of these joining meetings automatically via calendar integration?"
- "Do external participants (clients, partners, candidates) encounter these tools in your meetings?"
- "Has anyone noticed unfamiliar AI bots joining their meetings?" (shadow AI signal)
- "What tier are the notetakers on — free or paid?"

## Category 5: Customer & Revenue Operations AI

**What to ask:** "What AI features are active in your CRM, support, marketing, and sales tools?"

### CRM AI
- Salesforce Einstein / Agentforce
- HubSpot AI (Breeze)
- Pipedrive AI
- Zoho Zia

### Customer Support AI
- Intercom Fin
- Zendesk AI agents
- Freshdesk Freddy AI
- Ada
- Drift/Salesloft AI

### Marketing AI
- Jasper
- Copy.ai
- HubSpot Content AI
- Marketo AI
- Mailchimp AI

### Sales Intelligence AI
- Gong (conversation intelligence)
- Chorus/ZoomInfo
- Clari
- Apollo AI
- Outreach AI
- 6sense

**Critical follow-up:** "Do any of these tools process customer PII, health data, financial data, or data from regulated industries?" This dramatically changes the compliance requirements.

## Category 6: Engineering & Technical AI

**What to ask:** "Beyond coding assistants, what AI tools are used in your engineering, DevOps, or security stack?"

- PagerDuty AI
- Datadog AI
- New Relic AI
- Snyk AI (security scanning)
- CrowdStrike Charlotte AI
- SentinelOne Purple AI
- Wiz AI
- Natural language database query tools
- AI-powered testing tools (Testim, Mabl)
- CI/CD AI features

**Critical follow-up:** "Do any of these have access to production data or infrastructure credentials?"

## Category 7: HR, Legal & Finance AI

**What to ask:** "What AI tools are used in hiring, legal review, financial operations, or HR?"

### Recruiting / HR AI
- HireVue (video interview AI)
- Paradox (conversational AI recruiting)
- LinkedIn Recruiter AI
- Pymetrics / Harver
- Lattice AI
- Rippling AI

### Legal AI
- Harvey AI
- Evisort
- Ironclad AI
- DocuSign IAM / AI
- CoCounsel (Thomson Reuters)

### Finance AI
- Brex AI
- Ramp Intelligence
- Stampli AI
- Vic.ai
- Planful AI

**Critical follow-up:** "AI in HR and hiring is the most heavily regulated category under new AI laws (Colorado AI Act, Illinois HB 3773, EU AI Act high-risk classification). Are you aware of specific compliance requirements for AI used in employment decisions?"

## Category 8: Design & Creative AI

**What to ask:** "What AI tools are used for design, content creation, video, or audio?"

- Canva AI (Magic Studio)
- Figma AI
- Adobe Firefly / Photoshop AI
- Midjourney
- DALL-E / ChatGPT image generation
- Runway (video)
- Descript (audio/video editing AI)
- ElevenLabs (voice)
- Synthesia (AI video)
- Luma AI

**Critical follow-up:** "Are any AI-generated images, videos, or voice content used in customer-facing materials? Are they disclosed as AI-generated?" Increasingly relevant under EU AI Act transparency requirements.

## Category 9: Shadow AI Discovery

**What to ask (sensitively — this isn't about blame):** "In most organizations, employees adopt AI tools faster than IT can track them. Let me ask a few questions to help surface tools that might be flying under the radar."

**Discovery questions:**
1. "Have you noticed any unfamiliar AI bots joining your meetings or calendar?"
2. "Do employees have a way to request approval for new AI tools, or do they typically just sign up?"
3. "Have you audited OAuth grants and third-party app permissions recently?"
4. "Are there browser extensions with AI features installed on company devices?"
5. "Do employees use personal AI accounts (personal ChatGPT, personal Claude) for any work tasks?"
6. "Has anyone forwarded work emails, documents, or data to an AI tool via copy-paste?"
7. "Are there any AI features in tools you use that were enabled by default without you turning them on?"

**Key insight to share with the user:** IBM's 2025 Cost of Data Breach Report found that 80% of workers use AI, but only 22% use exclusively employer-provided tools. 47% use personal accounts. Shadow AI breaches cost $670,000 more than standard incidents.
