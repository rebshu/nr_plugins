---
name: share-with-team
description: "Promote artifacts, decisions, research, or any meaningful output from the current Cowork session into the team's shared Document Hub in Notion. Use this skill whenever the user says something like 'share this with the team', 'push this to the hub', 'save this to Notion', 'the team should see this', 'add this to the knowledge base', 'promote this', or any variation of wanting to make their current work available to other team members. Also trigger when someone says 'log this', 'publish this', or 'send this to the doc hub'. This skill handles the full flow: identifying what to share, collecting lightweight metadata, creating the Notion page, and confirming the share."
---

# Share With Team

Promote work from the current Cowork session into New Radicle's shared Document Hub in Notion. The goal is to close the loop between individual AI-assisted work and team-wide context — making what one person produces available to everyone without manual copy-paste or doc sprawl.

## Why This Skill Exists

The team uses Claude Cowork for deep individual work — research, strategy, decisions, frameworks. But that work dies in the session unless someone manually moves it to Notion. This skill makes sharing a one-step action: the user says "share this with the team" and the artifact lands in the Document Hub, properly tagged and described, ready for the next person's session to pick up.

## The Document Hub

The team's shared knowledge base lives in Notion:

- **Data source ID:** `2a07bdc3-cd5f-803a-b047-000b336435fe`
- **Database name:** Knowledge Base (part of the Document Hub)

**Schema:**
- `Item Name` (title) — clear, descriptive name for the artifact
- `Category` (multi_select) — one or more of: `Industry knowledge share`, `Business operations`, `Customer research`, `Planning`, `Product`
- `Description` (text) — 1-3 sentence summary of what this is and why it matters
- `Date` (date) — when it was created
- `Link` (text) — optional, if the artifact has a URL
- `Created by` (person) — the user who shared it

## How It Works

### Step 0: Look Up the Current User

Before anything else, call `notion-get-users` with `user_id: "self"` to get the current user's Notion ID. You'll need this for the `Created by` field. Do this in the background — don't mention it to the user.

### Step 1: Identify What's Being Shared

Look at the current conversation and figure out what the user wants to share. This could be:

- **A file** that was created during the session (a doc, presentation, spreadsheet, etc.)
- **An analysis or framework** that emerged from the conversation
- **A decision or conclusion** that the team needs to know about
- **Research findings** from a deep dive
- **A strategy or plan** that was developed

If it's not obvious what the user wants to share, ask: "What specifically should I share — the [artifact A], the [analysis B], or something else from our conversation?"

If the content is a file, note the file path. The artifact's content will go into the Notion page body.

### Step 2: Collect Metadata

Ask the user a few quick questions using the AskUserQuestion tool. Keep it lightweight — the point is speed, not bureaucracy.

**Question 1: Title**
Suggest a title based on the conversation. Let the user confirm or change it. Don't ask in a separate round-trip if you can suggest something good.

**Question 2: Category**
Present the categories and suggest the most likely one(s) based on the content:
- Industry knowledge share
- Business operations
- Customer research
- Planning
- Product

**Question 3: Quick description**
Draft a 1-2 sentence description of what this is and why the team should care. Let the user approve or edit.

**Optional: Link**
If the artifact has a relevant URL (a Claude public artifact link, a Google Doc, a GitHub repo, etc.), include it. If not, skip — don't ask about it.

Combine all three questions into a single AskUserQuestion call to minimize back-and-forth. The Category question should use `multiSelect: true` since items can have multiple categories.

### Step 3: Prepare the Content

Convert the artifact into clean Notion-compatible markdown. The goal is for the page to be useful on its own — someone reading it in Notion shouldn't need to have been in the original conversation.

**For conversational outputs** (analysis, frameworks, decisions):
- Extract the key content from the conversation
- Structure it with clear headers
- Add a brief "Context" section at the top: what was being discussed and why
- Strip out conversational back-and-forth — just the substance

**For files:**
- Include a summary of the file's contents in the page body
- If the file exists at a path, mention it in the page
- Link to it if there's a URL

**For decisions:**
- Frame it as: What was decided, why, what alternatives were considered
- This is especially valuable for the team — decisions without context are useless

### Step 4: Create the Notion Page

Use the `notion-create-pages` tool with the Document Hub data source:

```
parent: { data_source_id: "2a07bdc3-cd5f-803a-b047-000b336435fe" }
```

Set the properties:
- `Item Name`: the title
- `Category`: the selected categories formatted as a JSON array string, e.g. `"[\"Planning\", \"Product\"]"`
- `Description`: the summary
- `date:Date:start`: today's date in YYYY-MM-DD format
- `date:Date:is_datetime`: 0
- `Created by`: the user ID from Step 0, formatted as a JSON array string, e.g. `"[\"user://uuid\"]"`
- `Link`: the URL if one exists, otherwise omit

Set the page content to the prepared markdown. Use standard markdown — Notion's page content format supports headers, bullet lists, bold, links, and code blocks. Keep it clean and readable.

### Step 5: Update the Context Index

After creating the page, append an entry to the **Context Index** page in Notion. This is the team's auto-generated table of contents that helps load-context find the right docs efficiently.

**Context Index page ID:** `3207bdc3-cd5f-8115-baa7-f4168d62086b`

1. Fetch the current Context Index page using `notion-fetch` with the page ID.
2. Find the section matching the artifact's primary category (e.g., `## Product`, `## Planning`, `## Business Operations`, `## Customer Research`, `## Industry Knowledge Share`). If the artifact has multiple categories, add it under the primary/first one.
3. Use `notion-update-page` with the `update_content` command to append a new entry under that category section. Replace the "*No entries yet*" placeholder if it's the first entry in that section.

Each index entry should be a single line in this format:
```
- **[Title]** ([Notion page URL]) — [1-sentence description]. [Context System Type if set]. Added [date] by [creator first name].
```

Example:
```
- **Pricing Strategy v2** (https://www.notion.so/abc123) — Revised pricing framework based on competitor analysis and customer interviews. Decision. Added 2026-03-10 by Rebecca.
```

4. Also update the "**Last updated:**" date at the top of the index page to today's date.

Do this silently — don't mention the index update to the user.

### Step 5.5: Mark for Embedding Refresh (When Enabled)

If the semantic retrieval pipeline is enabled, new/updated Knowledge Base pages are eligible for embedding refresh on the next incremental run.

- Eligibility rule: page is new OR `last_edited_time` changed OR content hash changed.
- The embedding pipeline is asynchronous; do not block page creation on embedding completion.
- If semantic retrieval is temporarily degraded, index-first retrieval remains the default fallback path.

### Step 6: Confirm

Tell the user it's done. Provide:
- The Notion page URL so they can verify
- A one-line summary of what was shared

Keep the confirmation brief. Something like: "Done — I've added **[Title]** to the Document Hub under [Category]. [Notion link]"

## Tone

This skill should feel fast and frictionless. The user just said "share this with the team" — they don't want to fill out a form. Suggest smart defaults for everything, ask only what you need to, and get it done in one round of questions max.

## Edge Cases

**Nothing obvious to share:** If the conversation has been pure back-and-forth with no clear artifact, ask the user what they'd like to capture. Don't guess.

**Multiple artifacts:** If the session produced several distinct things, ask which one(s) to share. Offer to share multiple as separate pages if needed.

**Already exists:** If the title sounds like something that might already be in the Document Hub, do a quick search using `notion-search` with the title keywords before creating a duplicate. If you find a close match, ask whether they want to update the existing page or create a new one.

**Duplicate check search:** Use `notion-search` with the artifact's title keywords and filter by the Document Hub data source. A match within the last 30 days on a similar title is worth flagging.
