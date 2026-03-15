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

## The Context Index

The team maintains an auto-generated index page that serves as a table of contents for the Document Hub. **Always read this first** before searching or fetching individual docs.

**Context Index page ID:** `3207bdc3-cd5f-8115-baa7-f4168d62086b`

The index is organized by category (Product, Planning, Business Operations, Customer Research, Industry Knowledge Share). Each entry has the doc title, a link, a one-sentence description, the context type (Exploration/Decision/Reference/Artifact), the date, and who created it.

**Why index-first:** The index lets you scan 50+ docs in one fetch instead of running multiple searches and hoping you find the right ones. Read the index, identify which docs are relevant, then fetch only those.

### Vector Retrieval (Opt-in)

An optional retrieval service can be used for semantic lookup when keyword/index scans are weak:

- `POST /search` with `{ "query": "...", "top_k": 5 }`
- Returns ranked chunks with cosine-similarity scores from the Knowledge Base embedding index.
- Use only when explicitly asked for semantic retrieval or when index-first/search fallback cannot find relevant material.
- If the API is unavailable or quality is low, fall back immediately to index-first retrieval.

## How It Works

### Step 0: Read the Context Index (All Modes)

Before doing anything else, fetch the Context Index page:

```
notion-fetch with id: "3207bdc3-cd5f-8115-baa7-f4168d62086b"
```

Scan the entries. Note which docs exist in each category, when they were added, and their descriptions. This gives you a map of the team's knowledge before you start pulling individual pages.

If the index is empty or very sparse, fall back to `notion-search` against the Document Hub data source directly.

### Mode 1: General Briefing ("catch me up", "what's the latest")

When the user wants a general overview of what the team has been working on:

1. **Read the Context Index** (Step 0). Identify entries added in the last 2-3 weeks across all categories.

2. **Group by category.** For each recent item, use the description from the index — don't fetch full pages yet.

3. **Present a concise briefing** organized by theme, not chronologically. Something like:

   "Here's what's been active in the Document Hub recently:

   **Product:** [2-3 items with one-line summaries from the index]
   **Business Operations:** [1-2 items]
   **Client Research:** [1-2 items if any]

   Want me to pull up any of these in detail?"

4. **Offer to go deeper.** If the user wants to read a specific doc, use `notion-fetch` to pull the full page content and summarize it or present it directly.

### Mode 2: Topic-Specific Context ("I need to know about our client landscape")

When the user needs context on a specific topic:

1. **Read the Context Index** (Step 0). Scan for entries whose titles or descriptions match the topic. Identify the 2-3 most relevant docs.

2. **Fetch the relevant pages** using `notion-fetch` on the URLs from the index. Read their full content.

3. **If the index doesn't have good matches**, fall back to `notion-search` with the relevant keywords scoped to the data source.

4. **Synthesize into a briefing.** Don't just list the docs — extract the key knowledge and present it as a coherent summary. The user shouldn't have to read through multiple pages.

5. **Cite your sources.** At the end, link to the Notion pages so the user can go deeper if needed.

### Mode 3: Session Priming ("I'm about to work on X, load the relevant context")

When the user is about to start a task and wants Claude loaded with the right background:

1. **Read the Context Index** (Step 0). Map the user's task to relevant categories and identify the most useful docs.

2. **Prioritize by context type.** For task priming, prefer Decision and Reference docs over Exploration docs — the user needs settled knowledge, not open-ended thinking.

3. **Fetch the top 3-5 docs** using `notion-fetch`. Read them fully. Don't summarize back to the user unless asked — just confirm "I've read through [doc titles] and I'm up to speed."

4. **Proceed with the task.** The user's next request should benefit from the context you just loaded.

### Mode 4: Semantic Retrieval (Opt-in)

When the user asks open-ended questions that do not map cleanly to known index entries:

1. Start with Step 0 and quick index scan as normal.
2. If confidence is low, query the vector retrieval API for top semantic matches.
3. Validate returned chunks for relevance and recency before presenting them.
4. If vector results are noisy or stale, fall back to index-first + targeted `notion-search`.
5. Tell the user when semantic retrieval was used and still cite source pages.

## What NOT To Do

- Don't load everything. The Document Hub has 60+ items. Be selective based on what's relevant.
- Don't make the user wait through a long summary if they just want to get to work. In Mode 3, a brief confirmation is enough.
- Don't present raw database query results. The user wants knowledge, not a table of Notion properties.
- Don't load context that's clearly stale (6+ months old) unless specifically relevant to the current task.
- Don't force vector retrieval for every request. Index-first remains the default unless semantic mode is needed.

## Tone

Fast and useful. The user is trying to get oriented, not read a report. Keep summaries tight, offer depth on demand, and get out of the way once context is loaded.
