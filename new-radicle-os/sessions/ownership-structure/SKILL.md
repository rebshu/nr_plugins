---
name: ownership-structure
description: "Guide a founding ownership split decision through a structured framework of building blocks. Use this skill whenever a founder wants to: work through equity split decisions, track progress on ownership-related building blocks, assess readiness of the founding split conversation, or generate the ownership structure dashboard. Triggers on: 'ownership structure', 'founding split', 'equity split', 'cap table framework', 'ownership building blocks', 'how's the split looking', or any request related to tracking and advancing the founding ownership decision."
---

# Ownership Structure Session

Guide the team through a structured founding ownership split decision. This session uses the decision-framework component to decompose the ownership decision into 17 building blocks across 6 phases, track readiness, assess importance, and link to underlying documents.

## Session overview

This is an Evaluate-phase session in the Finance domain, operating in the Validating context. It composes four existing skills (load-context, assess-state, founder-agents, share-with-team) with the decision-framework component to produce a trackable ownership decision architecture.

## Components used

- `components/decision-framework` — for the overall framework map artifact
- `components/building-block` — for each trackable work item
- `components/scoring-system` — for the readiness + importance dual-lens view
- `components/document-registry` — for linking blocks to deliverables

## Workflow

### Step 1: Load context → Assess state

Invoke load-context (session priming mode) to pull ownership-related documents from the Document Hub. Then invoke assess-state in framework-backed mode with `sessions/ownership-structure/framework-data.json` as the rubric.

assess-state will:
- Map retrieved documents against the 17 building blocks
- Score readiness and importance for each block
- Produce a gap analysis (low readiness + high importance blocks)
- Return an updated framework-data with refreshed scores and document links

Use the gap analysis to inform the focus-area question in the next step.

### Step 2: Identify focus area

Ask the user which phase or block they want to work on. Use the AskUserQuestion tool:

```
Header: "Focus area"
Question: "Which area of the ownership structure do you want to work on?"
Options:
- "Foundations (vision alignment, founder assessment, roles)" — Phase 3, the inputs to the decision
- "Ownership frameworks (axes, standards, triggers)" — Phase 4, how to think about the split
- "The decision itself (starting split, scenarios, option pool)" — Phase 5, the actual numbers
- "Review the full map" — Generate/update the dashboard artifact
```

### Step 3: Work the block

Depending on what the user chose, facilitate the relevant work:

- **If working on a specific block:** Guide the conversation to produce the deliverable for that block. Use the block's description (from framework-data.json) to understand what needs to be produced. Use founder-agents for blocks that benefit from multi-founder perspective (especially Vision Alignment, Founder Assessment, Roles & Decision Rights, Starting Split).

- **If reviewing the full map:** Generate the decision framework artifact using the component. Read `sessions/ownership-structure/framework-data.json` for the current state and render it as a React artifact following the instructions in `components/decision-framework/COMPONENT.md`.

### Step 4: Checkpoint — after producing a deliverable

```
Header: "Next step"
Question: "Block complete. What do you want to do?"
Options:
- "Share to Document Hub and work on next block"
- "Run founder panel review on what we just produced"
- "Update the full dashboard and assess overall readiness"
- "Done for now — save progress"
```

### Step 5: Share and update

- Use share-with-team to push deliverables to the Document Hub
- Update the framework-data.json with new scores
- Regenerate the dashboard artifact if requested

## Tone

This is a high-stakes, high-care conversation. The ownership split affects the founding team's relationship for years. Be thorough, precise, and sensitive to the relational dimensions. Don't rush to the numbers — the foundations matter.
