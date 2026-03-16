---
name: pre-publish
description: "Run the full pre-publish pipeline for the New Radicle OS plugin before pushing changes. This skill orchestrates documentation consistency review, AI security gate (via ai-security-audit Mode A), version bump inference, and final summary before code goes to GitHub. Use this skill whenever someone says 'push changes', 'publish plugin', 'release update', 'push this version', 'ship it', 'push to marketplace', 'ready to publish', or any variation of wanting to push plugin changes to the repo. Also trigger when the user says 'pre-publish check', 'release checklist', or 'what needs to happen before we push'. This skill MUST run before any git push of plugin changes — it is the standardized gate between local work and published code."
---

# Pre-Publish Pipeline

The standardized gate between working on the plugin locally and pushing changes to the repo. Every push goes through the same sequence: verify docs are consistent, run the AI security gate, bump the version, and confirm.

## Why This Exists

Without a checklist, pushes are ad hoc. Someone updates a SKILL.md but forgets to update the schema description in the README, or bumps behavior without bumping the version, or ships without running security review. This skill makes the pipeline explicit and repeatable — the same steps every time, nothing skipped.

## The Pipeline

All file paths below are relative to the plugin root (`nr_plugins/new-radicle-os/`). When this skill triggers, locate the plugin root first — it contains `.claude-plugin/plugin.json`.

Four phases, run in order. Each phase produces a PASS or FAIL. A FAIL in any phase blocks the push until resolved.

### Phase 1: Documentation Consistency Review

Cross-reference the plugin's documentation to catch drift between files. Read `references/consistency-checklist.md` for the full checklist, but the core checks are:

1. **Schema alignment** — Do the Notion field definitions in load-context SKILL.md and share-with-team SKILL.md match each other? Do they match what's actually in the Notion database? Check field names, types, and option values.

2. **Skill count** — Does the README's skill table list every skill that exists in the `skills/` directory? Are any missing or removed?

3. **Version string** — Does plugin.json's version match what the README's version history describes?

4. **Cross-references** — When one skill references another (e.g., load-context references the Context Index format that share-with-team writes), do the formats still match?

5. **Reference artifact consistency** — Do the .jsx and .md reference artifacts in the workspace folder reflect the current state of the implementation? Check for stale "proposed" labels, outdated skill counts, or superseded architecture descriptions.

**How to run this phase:**

Read these files and cross-reference:
- `skills/load-context/SKILL.md` — schema section, Context Index description
- `skills/share-with-team/SKILL.md` — schema section, index entry format, metadata questions
- `skills/engineering/ai-security-audit/SKILL.md` — mode descriptions
- `skills/assess-state/SKILL.md` — any cross-skill references
- `skills/founder-agents/SKILL.md` — any cross-skill references
- `skills/internal-comms/SKILL.md` — any cross-skill references
- `.claude-plugin/plugin.json` — version, description
- `README.md` — skill table, version history

Also check any reference artifacts in the workspace folder (the parent repo directory) that describe the plugin's architecture. Common files to check: `marketplace-architecture-spec.md`, `plugin-architecture-overview.jsx`, `intent-aware-retrieval-schema.jsx`.

**Output:** List of findings, each marked CONSISTENT or DRIFT. Any DRIFT finding must be resolved before proceeding.

### Phase 2: AI Security Gate

Chain to the existing `ai-security-audit` skill in Mode A (Pre-Push Security Gate).

The security audit skill already knows how to scope a push, run targeted intake, score across security domains, and return a gate decision (PASS / PASS WITH CONDITIONS / BLOCK). Don't duplicate that work — invoke it.

**How to run this phase:**

Read `skills/engineering/ai-security-audit/SKILL.md` and follow Mode A (Pre-Push Security Gate). Tell the user: "Running AI security gate on plugin changes..." then:
1. Scope the push surface — what skills changed, what data flows are affected, what Notion API calls are made
2. Focus on: prompt injection vectors in SKILL.md instructions, data source IDs and API keys in skill files, whether share-with-team constrains which Notion pages it writes to, whether load-context could leak foundational docs to unauthorized contexts
3. Return the gate decision

**If BLOCK:** Stop. The user must resolve security findings before proceeding.
**If PASS WITH CONDITIONS:** Present conditions. The user decides whether to resolve now or accept risk.
**If PASS:** Continue to Phase 3.

### Phase 3: Version Bump

Infer the appropriate semver bump from what changed, present it for confirmation, and apply it.

Read `references/version-strategy.md` for the full decision tree, but the summary:

- **Patch** (0.3.0 → 0.3.1): SKILL.md wording changes, doc corrections, fixing inconsistencies, adding reference files. No new behavior from the user's perspective.
- **Minor** (0.3.0 → 0.4.0): New skills added, new schema fields on the Notion database, new retrieval behavior, new questions in share-with-team, new sections in load-context that change what gets retrieved. The user would notice something different.
- **Major** (0.x.0 → 1.0.0): Breaking changes — existing skill behavior changes enough that sessions or workflows relying on old behavior would produce different results. Extremely rare.

**How to infer the bump:**

1. Read the current version from `.claude-plugin/plugin.json`
2. Look at what files changed (check git diff if available, otherwise ask the user what changed this session)
3. Classify each change as patch/minor/major
4. The highest classification wins — if any change is minor, the whole bump is minor
5. Present the recommendation: "Based on [what changed], I recommend bumping from 0.3.0 → 0.3.1 (patch). This is a [patch/minor/major] because [reason]. Confirm or override?"

**After confirmation:**

1. Update `plugin.json` version field
2. Add an entry to README.md's Version History section
3. Confirm: "Version bumped to X.Y.Z. plugin.json and README updated."

### Phase 4: Pre-Push Summary

Present a final summary for the user to approve before the actual push:

```
## Pre-Publish Summary

Version: 0.3.0 → 0.3.1
Changes: [1-3 line summary of what changed]

Documentation: ✓ Consistent (N checks passed)
Security gate: ✓ PASS
Version bump: ✓ 0.3.1 applied

Ready to push. Proceed?
```

If the user confirms, the push can proceed (via normal git workflow — this skill doesn't run git push itself, it gates the decision).

## What This Skill Does NOT Do

- **Run git commands.** This skill reviews and gates. The actual push is a separate action.
- **Replace ai-security-audit.** It chains to Mode A. The full audit (Mode B) is a separate workflow for organizational reviews.
- **Auto-fix drift.** When Phase 1 finds inconsistencies, it reports them. The user (or Claude) fixes them, then re-runs.
- **Handle marketplace publishing.** This covers pushing to the plugin's git repo. Marketplace listing updates are a separate concern.

## Tone

Methodical but not bureaucratic. This is a checklist, not a compliance audit. Move briskly through passing checks, spend time only on findings that matter. The goal is confidence before pushing — not a report for its own sake.
