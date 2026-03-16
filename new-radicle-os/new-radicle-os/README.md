# New Radicle OS

The team operating system for New Radicle, built for Claude Cowork.

This plugin gives every team member the same shared workflows, team context, and communication templates — so Claude knows how New Radicle works from the moment a session starts.

## What's Included

### Skills

| Skill | Trigger | What it does |
|-------|---------|-------------|
| **share-with-team** | "share this with the team", "push to the hub" | Promotes artifacts into the Notion Document Hub with authority tagging |
| **load-context** | "catch me up", "load context", "brief me" | Intent-aware retrieval — constructs intent, pre-loads foundational docs, reports gaps, flags contradictions |
| **founder-agents** | "ask Rebecca/Johny/Kelly", "founder panel" | Simulates co-founder thinking styles for pressure-testing decisions |
| **internal-comms** | "write a 3P update", "draft a newsletter" | Templates for internal communications (status reports, updates, FAQs) |
| **assess-state** | "where do we stand", "how ready are we" | Evaluates readiness against a decision framework, scores gaps |
| **ai-security-audit** | "push to github", "security review" | Pre-push security gate (Mode A) or full AI security audit (Mode B) |
| **pre-publish** | "push changes", "publish plugin", "ship it" | Pre-publish pipeline: doc review → security gate → version bump → summary |

### The Knowledge Loop

These skills work together as a cycle:

1. **Work** — A team member does deep work in a Cowork session
2. **Share** — They say "share this with the team" → artifact lands in the Document Hub
3. **Load** — Another team member starts a session, says "catch me up" → Claude reads recent team output
4. **Work** — That person's session now has the full team context

## Setup

### Prerequisites

- Claude Cowork (Team or Enterprise plan)
- Notion workspace connected to Cowork

### Install

Install through the plugin manager, or load locally for testing:

```bash
claude --plugin-dir ./new-radicle-os
```

## Version History

- **0.4.0** — Add pre-publish pipeline skill (doc consistency → security gate → version bump). Share-with-team now auto-infers Context System Type. Documentation consistency fixes across all reference artifacts.
- **0.3.0** — Intent-aware retrieval (intent construction, authority tagging, gap reporting, contradiction handling). Add assess-state skill, 4 reusable components, ownership-structure session, trigger.json specs for all skills, ai-security-audit with pre-push gate.
- **0.2.0** — Add Context Index for index-first retrieval. Context System Type field on Knowledge Base.
- **0.1.0** — Initial release. Includes share-with-team, load-context, founder-agents, and internal-comms skills.
