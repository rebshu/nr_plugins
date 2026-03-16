---
name: load-context
description: "Pull shared team context from the New Radicle Document Hub in Notion so Claude understands the business, current strategy, and recent team output. Use this skill whenever a team member starts a substantive work session and needs Claude to 'know the business' — triggered by phrases like 'catch me up', 'load context', 'what's the latest', 'brief me', 'what has the team been working on', 'pull in our docs', or any request that implies Claude should have background knowledge about New Radicle before doing work. Also use when the user asks Claude to do something strategic, client-facing, or product-related and Claude doesn't yet have company context loaded for this session."
---

# Load Context

Pull shared team knowledge from the New Radicle Document Hub in Notion so Claude has the context it needs to do useful work. This is the retrieval side of the team's knowledge loop — share-with-team puts knowledge in, load-context pulls it out.

## Why This Skill Exists

Every Cowork session starts fresh. Claude doesn't remember what happened in previous sessions or what other team members have been working on. This skill bridges that gap by pulling the most relevant recent knowledge from the team's shared Document Hub, so Claude can immediately operate with awareness of the business, current strategy, and recent decisions.

## The Document Hub

The team's shared knowledge base lives in Notion:

- **Data source ID:** `2a07bdc3-cd5f-803a-b047-000b336435fe`
- **Database name:** Knowledge Base (part of the Document Hub)

**Schema:**
- `Item Name` (title)
- `Category` (multi_select): Industry knowledge share, Business operations, Customer research, Planning, Product
- `Description` (text)
- `Date` (date)
- `Created by` (person)
- `Link` (text)
- `Context System Type` (select): Exploration, Decision, Reference, Artifact
- `Context Authority` (select): Foundational, Referential (default), Exploratory
- `Created time` (auto)

## The Context Index

The team maintains an auto-generated index page that serves as a table of contents for the Document Hub. **Always read this first** before searching or fetching individual docs.

**Context Index page ID:** `3207bdc3-cd5f-8115-baa7-f4168d62086b`

The index is organized by category (Product, Planning, Business Operations, Customer Research, Industry Knowledge Share). Each entry has the doc title, a link, a one-sentence description, the context type (Exploration/Decision/Reference/Artifact), an optional authority tag (🔒 Foundational or ⟡ Exploratory — Referential entries have no tag since it's the default), the date, and who created it.

**Why index-first:** The index lets you scan 50+ docs in one fetch instead of running multiple searches and hoping you find the right ones. Read the index, identify which docs are relevant, then fetch only those.

## How It Works

### Step -1: Construct Intent (All Modes)

Before fetching the Context Index, determine the user's intent by identifying these four fields:

**Archetype** — what type of work is this?
- **Orient**: getting situated, catching up, onboarding
- **Explore**: research, mapping, discovery, "tell me about X"
- **Decide**: evaluation, trade-offs, "should we X or Y"
- **Build**: creation, drafting, producing a deliverable
- **Review**: feedback, pressure-testing, "is this right"
- **Share**: publishing, making work available

**Goal** — what outcome does the user want? One sentence.

**Entity type** — what domain entity is this about?
(client, product, market, team, competitive, financial, legal, etc.)

**Domain** — which knowledge domains are relevant?
(Used to identify foundational docs for pre-loading.)

For Mode 1 (general briefing): archetype = Orient, no specific goal.
For Mode 2 (topic lookup): archetype = Explore, goal = the topic.
For Mode 3 (session priming): infer from the user's task description.

Hold these in mind as you proceed to Step 0. They'll guide which docs you prioritize.

### Step 0: Read the Context Index (All Modes)

Before doing anything else, fetch the Context Index page:

```
notion-fetch with id: "3207bdc3-cd5f-8115-baa7-f4168d62086b"
```

Scan the entries. Note which docs exist in each category, when they were added, and their descriptions. This gives you a map of the team's knowledge before you start pulling individual pages.

If the index is empty or very sparse, fall back to `notion-search` against the Document Hub data source directly.

After scanning the index, filter using the intent from Step -1:

1. **Pre-load foundational docs.** Scan for entries tagged 🔒 Foundational whose domain matches the intent. Fetch these first — they're constraints, not suggestions. Brand guidelines for a client proposal. Legal requirements for a compliance task. These form the context floor.

2. **Prioritize by archetype.** Use the archetype to weight which context types matter most:
   - Orient/Explore → prefer Exploration and Reference docs
   - Decide → prefer Decision and Reference docs
   - Build → prefer Reference and Artifact docs, plus any Decision docs that set constraints on the deliverable
   - Review → prefer Decision docs (what was the intent?) and Reference docs (what are the standards?)
   - Share → light context only, enough to frame the output

3. **Deprioritize exploratory docs.** Entries tagged ⟡ Exploratory should only be included if they're highly relevant to the goal. When presenting exploratory content, flag it: "Note: this is still being evaluated by the team."

### Mode 1: General Briefing ("catch me up", "what's the latest")

When the user wants a general overview of what the team has been working on. Intent: archetype = Orient, no specific goal.

1. **Read the Context Index** (Step 0). Identify entries added in the last 2-3 weeks across all categories. Foundational docs don't need to be pre-loaded for Orient — this is a scan, not a task.

2. **Group by category.** For each recent item, use the description from the index — don't fetch full pages yet.

3. **Present a concise briefing** organized by theme, not chronologically. Something like:

   "Here's what's been active in the Document Hub recently:

   **Product:** [2-3 items with one-line summaries from the index]
   **Business Operations:** [1-2 items]
   **Client Research:** [1-2 items if any]

   Want me to pull up any of these in detail?"

4. **Offer to go deeper.** If the user wants to read a specific doc, use `notion-fetch` to pull the full page content and summarize it or present it directly.

### Mode 2: Topic-Specific Context ("I need to know about our client landscape")

When the user needs context on a specific topic. Intent: archetype = Explore, goal = the topic.

1. **Read the Context Index** (Step 0). Scan for entries whose titles or descriptions match the topic. Identify the 2-3 most relevant docs. If any foundational docs match the topic's domain, include them.

2. **Fetch the relevant pages** using `notion-fetch` on the URLs from the index. Read their full content.

3. **If the index doesn't have good matches**, fall back to `notion-search` with the relevant keywords scoped to the data source.

4. **Synthesize into a briefing.** Don't just list the docs — extract the key knowledge and present it as a coherent summary. The user shouldn't have to read through multiple pages.

5. **Cite your sources.** At the end, link to the Notion pages so the user can go deeper if needed.

### Mode 3: Session Priming ("I'm about to work on X, load the relevant context")

When the user is about to start a task and wants Claude loaded with the right background:

1. **Construct intent** (Step -1). Parse the user's task into archetype, goal, entity type, and domain.

2. **Pre-load foundational context** from Step 0. These are loaded unconditionally for the matching domain.

3. **Read the Context Index** (Step 0). Use the archetype to prioritize which docs to fetch — Decision docs for Decide tasks, Process/Reference docs for Build tasks, etc.

4. **Prioritize by context type.** For task priming, prefer Decision and Reference docs over Exploration docs — the user needs settled knowledge, not open-ended thinking. But if exploratory docs are directly relevant to the goal, include them with a flag.

5. **Fetch the top 3-5 docs** using `notion-fetch`. Read them fully. Confirm: "I've loaded [foundational docs] as baseline context and [scored docs] for your specific task."

6. **Proceed with the task.** The user's next request should benefit from the context you just loaded.

### Gap Check (Modes 2 and 3)

After selecting docs to load, do a quick gap check against the intent:

**For Decide archetype:** Did you find Decision docs (context type = Decision) relevant to the goal? If not, flag it: "I don't have a documented decision framework for [domain] — you may want to capture whatever you decide here back to the Hub."

**For Build archetype:** Did you find Reference or Artifact docs that establish standards or templates? If not: "I don't have existing templates or standards for [deliverable type] — we'll be working from scratch."

**For Review archetype:** Did you find the original Decision doc that established what's being reviewed? If not: "I couldn't find the original decision or brief for this — I'll review against general standards, but the team might want to document the original intent."

**For all archetypes:** If the intent domain had no foundational docs, note it briefly: "No foundational constraints loaded for [domain] — if there are brand, legal, or process requirements I should know about, flag them."

Keep gap reports to 1-2 sentences max. They're prompts, not reports. The goal is to surface blind spots without slowing the user down.

## Handling Contradictions

When two or more retrieved docs make conflicting claims — different numbers, different strategic directions, different timelines — do not silently present both as if they agree. Instead:

1. **Flag the conflict explicitly.** "Note: [Doc A] says the market is $2B (TAM, 2025 analysis) while [Doc B] estimates $800M (SAM, Q1 2026 research). Presenting both — the team may want to reconcile these."

2. **Provide context for each side.** Include when each doc was created, who created it, and the methodology if visible.

3. **Don't pick a winner.** The retrieval system surfaces information; the team resolves conflicts. If one doc is foundational and the other is exploratory, note the authority difference — but still present both.

4. **Common contradiction patterns to watch for:**
   - Market sizing (different methodologies, different scopes)
   - Competitive positioning (evolving landscape)
   - Strategic direction (before/after a pivot)
   - Headcount or financial projections (different dates)

The principle: contradictions are information. Silent resolution is data loss. Always surface, never suppress.

## What NOT To Do

- Don't load everything. The Document Hub has 60+ items. Be selective based on what's relevant.
- Don't make the user wait through a long summary if they just want to get to work. In Mode 3, a brief confirmation is enough.
- Don't present raw database query results. The user wants knowledge, not a table of Notion properties.
- Don't load context that's clearly stale (6+ months old) unless specifically relevant to the current task.

## Tone

Fast and useful. The user is trying to get oriented, not read a report. Keep summaries tight, offer depth on demand, and get out of the way once context is loaded.
