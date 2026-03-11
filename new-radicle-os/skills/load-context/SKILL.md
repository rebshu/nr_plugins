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
- `Created time` (auto)

## How It Works

### Mode 1: General Briefing ("catch me up", "what's the latest")

When the user wants a general overview of what the team has been working on:

1. **Query the Document Hub** using `notion-search` for recent items. Focus on the last 2-3 weeks of activity.

2. **Scan the results** and group them by Category. For each recent item, note the title, description, who created it, and when.

3. **Present a concise briefing** organized by theme, not chronologically. Something like:

   "Here's what's been active in the Document Hub recently:

   **Product:** [2-3 items with one-line summaries]
   **Business Operations:** [1-2 items]
   **Client Research:** [1-2 items if any]

   Want me to pull up any of these in detail?"

4. **Offer to go deeper.** If the user wants to read a specific doc, use `notion-fetch` to pull the full page content and summarize it or present it directly.

### Mode 2: Topic-Specific Context ("I need to know about our client landscape")

When the user needs context on a specific topic:

1. **Search the Document Hub** using `notion-search` with the relevant keywords scoped to the data source.

2. **Pull the most relevant 2-3 pages** using `notion-fetch`. Read their full content.

3. **Synthesize into a briefing.** Don't just list the docs — extract the key knowledge and present it as a coherent summary. The user shouldn't have to read through multiple pages.

4. **Cite your sources.** At the end, link to the Notion pages so the user can go deeper if needed.

### Mode 3: Session Priming ("I'm about to work on X, load the relevant context")

When the user is about to start a task and wants Claude loaded with the right background:

1. **Understand the task** — what kind of work is the user about to do? Client-facing? Product? Strategy?

2. **Map to relevant categories** — use the task description to identify which Document Hub categories are most relevant.

3. **Pull and internalize** — fetch the 3-5 most relevant documents. Read them fully. Don't summarize back to the user unless asked — just confirm "I've read through [doc titles] and I'm up to speed."

4. **Proceed with the task.** The user's next request should benefit from the context you just loaded.

## What NOT To Do

- Don't load everything. The Document Hub has 60+ items. Be selective based on what's relevant.
- Don't make the user wait through a long summary if they just want to get to work. In Mode 3, a brief confirmation is enough.
- Don't present raw database query results. The user wants knowledge, not a table of Notion properties.
- Don't load context that's clearly stale (6+ months old) unless specifically relevant to the current task.

## Tone

Fast and useful. The user is trying to get oriented, not read a report. Keep summaries tight, offer depth on demand, and get out of the way once context is loaded.
