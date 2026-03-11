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
- `Context System Type` (select): Exploration, Decision, Reference, Artifact
- `Description` (text)
- `Date` (date)
- `Created by` (person)
- `Reviewers` (person)
- `Link` (text)
- `Tags` (relation)
- `Type` (relation)
- `File Upload` (file)
- `Created time` (auto)
- `Last updated time` (auto)
- `Last edited by` (person)

### Context System Types — What They Mean

These types determine document priority for context loading:

- **Reference** — Foundational, long-lived docs: architecture, specs, frameworks. These are the HIGHEST priority for session priming because they define how the company works.
- **Decision** — Recorded decisions with rationale. Important for understanding why things are the way they are.
- **Artifact** — Concrete outputs: decks, specs, tools, templates. Useful when the user is about to build something similar.
- **Exploration** — Research, brainstorms, early thinking. Lower priority for priming but valuable for topic-specific context.

## How It Works

### Step 0: Always Start With a Search

Before doing anything else, run a search against the Document Hub to see what's there. Use the `notion-search` tool scoped to the data source:

```
notion-search with:
  query: [relevant keywords OR broad term like "architecture" or "strategy"]
  data_source_url: "collection://2a07bdc3-cd5f-803a-b047-000b336435fe"
```

This gives you the lay of the land. From here, branch into the appropriate mode.

### Mode 1: General Briefing ("catch me up", "what's the latest")

When the user wants a general overview of what the team has been working on:

1. **Search broadly** — run 2-3 searches with different queries to cover recent activity:
   - Search for recent items (the search results include timestamps — focus on last 2-3 weeks)
   - If initial results are thin, try broader terms: "update", "new", or category names

2. **Fetch the 3-5 most recent/relevant pages** using `notion-fetch` to get actual content (not just titles).

3. **Present a concise briefing** organized by theme, not chronologically:

   "Here's what's been active in the Document Hub recently:

   **Product:** [2-3 items with one-line summaries]
   **Business Operations:** [1-2 items]
   **Customer Research:** [1-2 items if any]

   Want me to pull up any of these in detail?"

4. **Offer to go deeper.** If the user wants to read a specific doc, use `notion-fetch` on that page.

### Mode 2: Topic-Specific Context ("I need to know about our client landscape")

When the user needs context on a specific topic:

1. **Search the Document Hub** using `notion-search` with targeted keywords scoped to the data source.

2. **Pull the most relevant 2-3 pages** using `notion-fetch`. Read their full content.

3. **Synthesize into a briefing.** Don't just list the docs — extract the key knowledge and present it as a coherent summary. The user shouldn't have to read through multiple pages.

4. **Cite your sources.** At the end, link to the Notion pages so the user can go deeper.

### Mode 3: Session Priming ("I'm about to work on X, load the relevant context")

This is the most important mode and the one that needs to be most reliable. When the user is about to start a task and wants Claude loaded with the right background:

1. **Understand the task** — what kind of work is the user about to do? Client-facing? Product? Strategy?

2. **Always start with Reference docs** — search for foundational documents first. These include architecture docs, company OS docs, and core frameworks. Run:
   - `notion-search` with query "architecture" or "company OS" scoped to the data source
   - `notion-search` with query related to the user's specific task domain

3. **Fetch and read 3-5 documents** using `notion-fetch`. Prioritize in this order:
   - Reference docs relevant to the task domain
   - Recent Decision docs (last 30 days) in the relevant category
   - Artifacts that the user might build on
   - Explorations only if directly relevant

4. **Confirm briefly** — don't recite everything back. Just say:
   "I've loaded context from [doc titles]. I'm up to speed on [1-sentence summary of what you now understand]. Ready to go."

5. **Proceed with the task.** The user's next request should benefit from the context you just loaded.

### Fallback: If Search Returns Nothing Useful

If `notion-search` comes back empty or with irrelevant results:
- Try different search terms — use category names ("Product", "Business operations"), key concepts ("architecture", "strategy", "client"), or known doc titles
- Try a broader search without the data_source_url filter to check if content lives elsewhere in the workspace
- If still nothing: tell the user what you searched for and that the Document Hub may not have content on that topic yet. Don't silently proceed without context.

## What NOT To Do

- **Don't skip the search step.** Even if you think you know what's in the hub, always query it. Content changes between sessions.
- **Don't load everything.** The Document Hub has 60+ items. Be selective based on what's relevant.
- **Don't make the user wait through a long summary if they just want to get to work.** In Mode 3, a brief confirmation is enough.
- **Don't present raw database query results.** The user wants knowledge, not a table of Notion properties.
- **Don't load context that's clearly stale (6+ months old)** unless specifically relevant to the current task.
- **Don't silently fail.** If you can't find relevant context, say so. The user would rather know you tried and came up empty than assume you're primed when you're not.

## Tone

Fast and useful. The user is trying to get oriented, not read a report. Keep summaries tight, offer depth on demand, and get out of the way once context is loaded.
