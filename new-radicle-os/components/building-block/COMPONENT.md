# Building Block

The atomic unit of a decision framework. A tracked work item with status, description, output summary, and document references.

## When to use

Any session that produces multiple discrete deliverables or tracks multiple workstreams. Building blocks appear inside a DecisionFrameworkMap but can also be used standalone as a progress tracker.

## Data shape

```
BuildingBlock {
  id: string              — Unique identifier
  name: string            — Display name (e.g., "Founding Principles")
  description: string     — What this block is ("What it is" in the tooltip)
  output: string          — What was produced ("What we produced" in the tooltip)
  documentLinks: []       — References to deliverables
  scores: {}              — Score per scoring view (keyed by view id, value 1-4)
}
```

## Rendering

Each building block renders as a card with:
- **Name** as the card label
- **Status dots** below the name (from the active scoring view)
- **Hover tooltip** with structured sections:
  - Label field (from the active scoring view: "WHAT IT IS" or "IMPORTANCE TO FOUNDING SPLIT")
  - Description text
  - "WHAT WE PRODUCED" section (if output is provided)
  - "DOCUMENT" section with link(s)

## Tooltip structure

The tooltip adapts based on which scoring view is active:
- In readiness view: shows "WHAT IT IS" + description, "WHAT WE PRODUCED" + output
- In importance view: shows "IMPORTANCE TO [DECISION]" + importance rationale
- Tooltips always end with document links if available

## Connecting to the knowledge loop

When a building block has document links, those should reference either:
- Notion Document Hub pages (created via share-with-team)
- External URLs (GitHub, Google Drive, etc.)
- File Share MCP URLs (for rich artifacts)

The document-registry component tracks these connections across all blocks.
