# New Radicle OS

The team operating system for New Radicle, built for Claude Cowork.

This plugin gives every team member the same shared workflows, team context, and communication templates — so Claude knows how New Radicle works from the moment a session starts.

## What's Included

### Skills

| Skill | Trigger | What it does |
|-------|---------|-------------|
| **share-with-team** | "share this with the team", "push to the hub" | Promotes artifacts from a Cowork session into the Notion Document Hub |
| **load-context** | "catch me up", "load context", "brief me" | Pulls recent team knowledge from the Document Hub into the current session |
| **founder-agents** | "ask Rebecca/Johny/Kelly", "founder panel" | Simulates co-founder thinking styles for pressure-testing decisions |
| **internal-comms** | "write a 3P update", "draft a newsletter" | Templates for internal communications (status reports, updates, FAQs) |

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

- **0.1.0** — Initial release. Includes share-with-team, load-context, founder-agents, and internal-comms skills.
