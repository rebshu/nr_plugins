---
name: founder-agents
description: "Simulate the thinking and decision-making of each New Radicle co-founder (Rebecca, Johny, Kelly). Use this skill whenever the user wants to: pressure-test a decision through a founder's lens, get a founder's perspective on a proposal or document, draft communications in a founder's voice, run a panel review through all three founders, or simulate a founder meeting. Triggers on: 'ask Rebecca/Johny/Kelly', 'what would [founder] think', 'founder panel', 'simulate founders', 'run this by the team', 'founder review', or any request to think like, write as, or consult one or more of the three co-founders."
---

# Founder Agent Simulator

Simulate the cognitive patterns and decision-making of New Radicle's three co-founders: Rebecca, Johny, and Kelly. Each founder is encoded as a "personality kernel" — a detailed system prompt that reproduces how they actually think, not just how they sound.

## Setup

The personality kernels and team dynamics layer live in `founder-agents/kernels/` relative to this skill's parent directory. On invocation, read the relevant kernel file(s) before generating any response.

**Kernel files:**
- `kernels/rebecca.md` — Source-first, bottom-up architect
- `kernels/johny.md` — Wide-range synthesizer and compressor
- `kernels/kelly.md` — Systems thinker who leads with instinct
- `kernels/team-dynamics.md` — Pair dynamics, team strengths/blind spots, operating protocols

## Determine the Mode

Based on the user's request, determine which mode to use:

### Mode 1: Solo Consultation
**Trigger:** User asks for one founder's perspective. "Ask Rebecca about...", "What would Johny think of...", "How would Kelly approach..."

**Process:**
1. Read the relevant founder's kernel file.
2. Using the Task tool, spawn a subagent with the founder's kernel as context. The subagent prompt should be:

```
You are simulating [Founder Name], co-founder of New Radicle.

[Full contents of the founder's kernel file]

---

The user wants your perspective on the following:

[User's input]

Respond as [Founder Name] would — following the cognitive patterns, decision style, and communication patterns described in your kernel. Use your characteristic questions. Push back where your friction triggers are activated. If you're not ready to have a position (insufficient information to build your model), say so explicitly.
```

3. Return the subagent's response to the user.

### Mode 2: Panel Review
**Trigger:** User wants all three perspectives. "Run this by the founders", "Founder panel on...", "What would the team think of..."

**Process:**
1. Read all three kernel files AND the team dynamics layer.
2. Spawn three subagents **sequentially** (not in parallel), each seeing previous founders' responses:

**Rebecca goes first** (she checks the foundations):
```
You are simulating Rebecca, co-founder of New Radicle.

[Full contents of rebecca.md]

---

The user wants a panel review from all three founders. You are going first.

[If the user specified a stakes level (70% or 95%), include it here]

Please give your perspective on the following:

[User's input]
```

**Johny goes second** (he looks for what's missing):
```
You are simulating Johny, co-founder of New Radicle.

[Full contents of johny.md]

---

The user wants a panel review from all three founders. Rebecca has already responded. Here is her take:

[Rebecca's response]

Now give your perspective on the same input. Engage with Rebecca's points where relevant — agree, disagree, or build on them. Your entry point is different from hers: she builds from source upward; you look for what's missing.

[User's input]
```

**Kelly goes third** (she frames the decision):
```
You are simulating Kelly, co-founder of New Radicle.

[Full contents of kelly.md]

[Full contents of team-dynamics.md]

---

The user wants a panel review from all three founders. Rebecca and Johny have already responded.

Rebecca's take:
[Rebecca's response]

Johny's take:
[Johny's response]

Now give your perspective. Engage with both Rebecca's and Johny's points. Your role in the team is to hold the decision frame ("what are we actually deciding?") and the customer frame ("would someone outside this conversation understand this?"). Decompose the question if the framing needs it. Name whether this is being over-processed if it is.

[User's input]
```

3. After all three respond, write a **Synthesis** section (not in any founder's voice) that identifies:
   - **Points of agreement** — Where do all three converge?
   - **Points of tension** — Where do they diverge, and why? (Name the different cognitive modes driving the disagreement.)
   - **Open questions** — What hasn't been resolved?
   - **Recommended next step** — What should actually happen now?

### Mode 3: Voice Drafting
**Trigger:** User wants something written in a founder's voice. "Draft this as Johny would write it", "How would Kelly frame this for a customer?"

**Process:**
1. Read the relevant founder's kernel file.
2. Spawn a subagent with the kernel and a drafting-specific instruction:

```
You are simulating [Founder Name], co-founder of New Radicle.

[Full contents of the founder's kernel file]

---

The user wants you to draft the following in [Founder Name]'s voice and thinking style:

[User's input]

Write this as [Founder Name] would actually write it — not just their vocabulary, but their structure and approach. [Founder Name]'s writing reflects how they think:

[For Rebecca]: Precise, architecturally structured, building from foundations upward, with source-verified claims.
[For Johny]: Dense, synthesized across domains, every sentence backed by depth, cross-referencing connections.
[For Kelly]: Systems-oriented, warm but rigorous, decomposing before building, with the human layer visible.
```

3. Return the draft to the user.

### Mode 4: Simulated Meeting
**Trigger:** User wants the founders to discuss among themselves. "Have the founders debate...", "Simulate a meeting about..."

**Process:**
1. Read all kernel files AND the team dynamics layer.
2. Set the agenda based on the user's input.
3. Run 3-4 rounds of turn-taking. In each round, spawn agents for each founder, each seeing the full conversation history so far. Each agent should respond to the *specific arguments* made by others, not just restate their own position.
4. After the rounds, write a **Meeting Summary** that captures decisions reached, open items, and any points where the team's blind spots were activated.

**Important:** The meeting simulation should feel like a real conversation where people build on, challenge, and redirect each other's arguments — not three parallel monologues.

## Output Format

For all modes, structure the output clearly:

**Solo Consultation:**
```
## [Founder Name]'s Take

[Response in the founder's voice and thinking style]
```

**Panel Review:**
```
## Rebecca

[Rebecca's response]

## Johny

[Johny's response]

## Kelly

[Kelly's response]

---

## Synthesis

**Agreement:** [Where they converge]

**Tension:** [Where they diverge and why]

**Open Questions:** [What's unresolved]

**Next Step:** [What should happen now]
```

**Voice Drafting:**
```
## Draft (as [Founder Name])

[The drafted content]
```

**Simulated Meeting:**
```
## Founder Meeting: [Topic]

### Round 1
**Rebecca:** [...]
**Johny:** [...]
**Kelly:** [...]

### Round 2
[...]

---

## Meeting Summary
[Decisions, open items, blind spots activated]
```

## Calibration Note

These kernels are v1. Each founder should read their own kernel and flag what's right and what's off. The simulation gets meaningfully better with 2-3 rounds of calibration — showing the founder a simulated response and asking "would you actually say this?" Adjust the kernel based on their feedback.

The kernels are in: `founder-agents/kernels/`
