---
name: assess-state
description: "Gather relevant context for a domain or decision area, map it against a set of building blocks or goals, score current readiness, and surface gaps. This is the universal 'where do we stand?' skill — the bridge between loading context and doing focused work. Use whenever someone asks: 'where are we on X?', 'what's the status of our Y?', 'how ready are we for Z?', 'assess where we stand', 'score our readiness', 'what gaps do we have?', or at the start of any decision-framework session."
---

# Assess State

Score where things stand against a structured framework. This skill composes with load-context (to pull what exists) and the scoring-system component (to produce calibrated scores) to answer the question: *given what we've done, how ready are we?*

## Why This Skill Exists

Every structured session has the same opening move: pull in what the team has already produced, map it against what's needed, and figure out where to focus. Without this, sessions either start from scratch (wasting prior work) or rely on the user to remember and narrate the current state (error-prone and slow).

This skill extracts that pattern into a reusable capability so any session — ownership structure, pricing strategy, hiring plan, go-to-market — can invoke it and get a scored assessment without re-implementing the logic.

## How It Relates to Other Skills

- **load-context** answers: *"what do we know?"* → retrieves documents from the hub
- **assess-state** answers: *"given what we know, where do we stand?"* → maps docs against a framework and scores readiness
- **Sessions** (like ownership-structure) answer: *"what should we do about it?"* → use the assessment to drive focused work

assess-state always composes with load-context. It never retrieves documents itself — it takes what load-context produces and evaluates it.

## Inputs

assess-state works in two modes depending on what's available:

### Mode 1: Framework-backed (structured)

When the session has a `framework-data.json`, assess-state uses it as the rubric:

1. Read the session's `framework-data.json` to get the full list of phases, building blocks, and scoring views.
2. Use load-context (topic mode) to pull documents relevant to each block's domain.
3. Map retrieved documents to building blocks by matching titles, descriptions, and content against block names and descriptions.
4. Score each block on every scoring view defined in the framework.
5. Output an updated framework-data.json with refreshed scores and document links.

### Mode 2: Domain-scan (unstructured)

When there's no pre-built framework — the user just asks "where are we on marketing?" — assess-state constructs a lightweight assessment:

1. Use load-context (topic mode) to pull all documents in the relevant domain.
2. Cluster the retrieved documents by theme (e.g., for marketing: positioning, channels, messaging, metrics).
3. For each cluster, assess:
   - **Coverage:** Do we have meaningful work here or just notes?
   - **Recency:** Is this current or stale?
   - **Completeness:** Are there obvious gaps in what's been produced?
4. Output a summary with per-cluster readiness scores using the standard readiness scale from the scoring-system component.

## Scoring Protocol

Use the scoring-system component's pre-built scales. For any assessment, at minimum produce a **readiness** score:

| Score | Meaning | Criteria |
|-------|---------|----------|
| 1 | Drafted, gaps remain | A document exists but it's exploratory, incomplete, or has open questions |
| 2 | Produced, pending sign-off | Substantive work done but not yet reviewed or agreed upon by the team |
| 3 | Produced, not fully closed | Good shape, minor gaps or pending updates |
| 4 | Complete & aligned | Done, reviewed, team-aligned, ready to build on |

If the session's framework-data.json defines additional scoring views (importance, risk, confidence), score those too. But readiness is always the baseline.

### Scoring rules

- **No document found for a block → readiness 1 at best.** Don't score something as ready if there's nothing produced.
- **Document exists but is 3+ months old and in a fast-moving area → cap at readiness 2.** Flag as potentially stale.
- **Multiple documents covering the same block → use the most recent and comprehensive one.** Note the others in document links.
- **Don't inflate scores.** Assess honestly. The whole point is to surface real gaps so the team focuses on the right things.
- **Explain your reasoning.** For each block, include a one-sentence rationale for the score you assigned.

## Output

assess-state produces three things:

### 1. Scored assessment (always)

A structured summary of where things stand, organized by phase or cluster:

```
Phase 1: WHO WE ARE
  Founding Principles  — readiness: 4 (complete, documented in "Founding Principles & Values")
  Branding & Identity  — readiness: 3 (brand guidelines exist, logo pending)
  How We Work Together — readiness: 3 (operating agreement drafted, not fully signed off)

Phase 2: HOW WE'RE SET UP
  Entity Structure     — readiness: 2 (Delaware C-corp decision made, docs in progress)
  ...
```

### 2. Gap analysis (always)

The blocks or clusters where readiness is lowest relative to importance (if importance scores exist) or absolute readiness. Surfaced as a prioritized list:

```
Biggest gaps (low readiness + high importance):
1. Starting Split (readiness: 1, importance: 4) — no quantitative model yet
2. Financial Picture (readiness: 1, importance: 3) — no financial baseline documented
3. Roles & Decision Rights (readiness: 2, importance: 3) — drafted but unclear on tie-breaking
```

### 3. Updated framework-data.json (framework-backed mode only)

If working from a framework, produce an updated copy of framework-data.json with:
- Refreshed readiness scores
- New or updated document links (from what load-context found)
- Any new blocks discovered during the scan (rare, but possible)

Don't overwrite the session's file directly — present the updates and let the user or the calling session decide whether to apply them.

## Composing with Sessions

Sessions that use assess-state should invoke it early in their workflow (typically Step 2, after load-context in Step 1). The session can then:

- Use the gap analysis to pre-populate a focus-area question (Gate 2 intake)
- Use the scored assessment to decide which workflow steps to skip (blocks already at readiness 4)
- Use the updated framework-data to generate an artifact showing current state

### Example composition in a session SKILL.md:

```
Step 1: Load context
  → invoke load-context in session-priming mode for the session's domain

Step 2: Assess state
  → invoke assess-state in framework-backed mode with this session's framework-data.json
  → receive: scored assessment, gap analysis, updated framework data

Step 3: Focus
  → use the gap analysis to suggest where to work
  → ask the user via AskUserQuestion
```

## What NOT To Do

- Don't produce the assessment without loading context first. The scores need to be grounded in actual documents, not guesses.
- Don't change scores in the session's framework-data.json without presenting them to the user. The assessment is a recommendation, not an automatic update.
- Don't assess domains where the team has zero documents. If load-context returns nothing for a domain, say "no prior work found" rather than scoring everything at 1.
- Don't treat this as a one-time audit. assess-state is designed to be run repeatedly — every time a session starts, it should re-assess based on current hub state.

## Tone

Clear-eyed and constructive. This skill tells the team where they actually are, not where they hope to be. But it's not a report card — it's a tool for focusing effort. Lead with what exists, then surface gaps as opportunities.
