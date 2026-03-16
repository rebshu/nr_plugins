# Version Bump Strategy

The plugin follows semantic versioning (semver). The bump type is inferred from what changed, not chosen arbitrarily.

## Decision Tree

### → Patch (X.Y.Z → X.Y.Z+1)

The user wouldn't notice a difference. Nothing new, nothing removed, nothing behaves differently.

**Examples:**
- Fixing a typo in a SKILL.md
- Updating a description for clarity
- Adding a reference file that supports existing behavior
- Correcting a consistency drift between files (schema alignment, stale references)
- Updating reference artifacts to reflect already-shipped state (e.g., changing "proposed" to "shipped")
- Adding examples or edge case documentation

### → Minor (X.Y.Z → X.Y+1.0)

The user would notice something new or different. A skill behaves differently, a new capability exists, or the knowledge base schema changed.

**Examples:**
- Adding a new skill (e.g., pre-publish, assess-state)
- Adding a new field to the Notion database (e.g., Context Authority)
- Changing retrieval behavior in load-context (e.g., adding intent construction, gap reporting)
- Adding a new question to share-with-team's metadata collection
- Adding a new mode to an existing skill
- Changing the Context Index entry format
- Adding new components or sessions

### → Major (X.Y.Z → X+1.0.0)

Existing workflows would break. Someone relying on the previous behavior would get different results.

**Examples:**
- Removing a skill
- Changing the Notion data source ID
- Restructuring the Context Index format in a way that breaks existing entries
- Removing a field from the Notion database that skills depend on
- Fundamentally changing how load-context selects docs (not adding to it, but replacing the approach)

Major bumps should be rare. If you're considering one, the change should be significant enough to warrant a migration plan.

## Multiple Changes in One Push

When a push contains multiple changes at different levels, the highest level wins:

- 3 patch changes + 1 minor change = minor bump
- 5 minor changes + 1 major change = major bump

List all changes in the README version history entry, even the patch-level ones — the entry is the changelog.

## Version History Entry Format

```markdown
- **X.Y.Z** — [1-2 sentence summary of the most important change]. [Additional changes if any].
```

Examples:
```markdown
- **0.3.0** — Add intent-aware retrieval (intent construction, authority tagging, gap reporting, contradiction handling). Add assess-state skill, 4 reusable components, ownership-structure session, and trigger.json specs for all skills.
- **0.3.1** — Fix documentation consistency between load-context and share-with-team schema sections. Update reference artifacts to reflect v0.3.0 shipped state.
```

## Pre-Publish Version Check

Before bumping, verify:
1. The current version in plugin.json matches the latest README entry
2. The bump you're about to apply doesn't skip a version (0.3.0 → 0.5.0 without 0.4.0)
3. The README entry you're writing accurately describes the diff
