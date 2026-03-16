# Documentation Consistency Checklist

Run each check below. Mark CONSISTENT or DRIFT. Any DRIFT blocks the push.

## 1. Notion Schema Alignment

**Files to compare:**
- `skills/load-context/SKILL.md` → Schema section
- `skills/share-with-team/SKILL.md` → Schema section
- Actual Notion database (data source `2a07bdc3-cd5f-803a-b047-000b336435fe`)

**What to check:**
- Same field names listed in both skill files
- Same field types and option values (especially select/multi_select options)
- Same defaults described (e.g., Context Authority defaults to Referential)
- If you can query the Notion database schema, verify the skill files match reality

**Common drift patterns:**
- A field gets added to Notion but only one skill file gets updated
- Option values change in Notion (e.g., a new category) but skill files still list the old set
- Default values described in share-with-team don't match what load-context expects

## 2. Context Index Format

**Files to compare:**
- `skills/share-with-team/SKILL.md` → Step 5 (index entry format)
- `skills/load-context/SKILL.md` → Context Index description + Step 0 filtering

**What to check:**
- The entry format that share-with-team writes matches what load-context expects to parse
- Authority tags (🔒 Foundational, ⟡ Exploratory) are described consistently in both files
- Context System Type values mentioned in both files match
- Any new fields added to the index format are referenced in load-context's scanning instructions

## 3. Skill Inventory

**Files to compare:**
- `README.md` → skill table
- `skills/` directory listing
- `plugin.json` → description

**What to check:**
- Every skill directory has a row in the README table
- No README entries for skills that don't exist
- plugin.json description mentions key skills accurately
- Skill count in any reference artifacts matches reality

## 4. Cross-Skill References

**What to check:**
- load-context references share-with-team's output format (the Context Index entries) — do they match?
- share-with-team references the Context Index page ID — is it the same ID load-context uses?
- ai-security-audit's Mode A is referenced by pre-publish — does the mode still exist and work as described?
- assess-state references the Document Hub — does it use the same data source ID?

## 5. Version Consistency

**Files to compare:**
- `.claude-plugin/plugin.json` → version field
- `README.md` → Version History section

**What to check:**
- plugin.json version matches the latest entry in README's version history
- The version history entry accurately describes what changed in that version
- No version entries for versions that were never published

## 6. Reference Artifacts (workspace folder)

**Files to check (if they exist):**
- `marketplace-architecture-spec.md` — Layer 3 (Context Retrieval) should reflect current load-context behavior
- `plugin-architecture-overview.jsx` — skill count, knowledge loop description
- `intent-aware-retrieval-schema.jsx` — v0.3.0 labeled as shipped, not proposed

**What to check:**
- Architecture descriptions match what the skills actually do
- Skill counts and names are current
- Phase labels (proposed/shipped/planned) reflect actual status
- Any "build next" sections are updated when items get completed
