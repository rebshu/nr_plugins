# Plugin Marketplace Architecture Spec

**Dual-track: New Radicle implementation + Cogs generalization**
**v0.1 · March 2026**

---

## Architecture Summary

The marketplace architecture has five layers, each of which generalizes from NR's concrete implementation to a Cogs-portable abstraction. The layers build on each other: the Knowledge Loop is the foundation, Workflow States provide routing logic, the Context Stack handles retrieval, Session Packaging turns ad-hoc work into repeatable experiences, and the Marketplace is the discovery and installation surface.

The key insight: NR's plugin is already a marketplace of one. Generalizing each layer means Cogs customers can build their own marketplaces — with their own skills, knowledge backends, agent kernels, and session templates — using the same primitives NR built first.

---

## Layer 1: Knowledge Loop

The foundation. Work flows into persistent storage and back out as context.

**NR Implementation:** Work → share-with-team (with authority tagging) → Notion Document Hub → load-context (with intent construction) → Work. The Context Index (a flat Notion page) serves as a scannable table of contents. Five categories, metadata per entry includes description, context system type, context authority (Foundational/Referential/Exploratory), date, and creator. Authority tags (🔒/⟡) make foundational and exploratory docs visually scannable. File Share MCP handles rich artifacts via GitHub Pages.

**Cogs Abstraction:** `KnowledgeLoop` interface with pluggable `ShareTarget` and `ContextSource` implementations. The loop pattern (work → capture → store → retrieve → work) is universal. The backend (Notion, Google Drive, custom DB, vector store) is a configuration choice.

**Generalization points:**

- `ShareTarget` — where artifacts go (Notion, Confluence, GitHub, custom API)
- `ContextSource` — where context comes from (same backend, but read-optimized)
- `IndexStrategy` — how the system navigates the knowledge base (flat index, hierarchical, vector, hybrid)
- `MetadataSchema` — what gets captured at share time (NR uses 3 fields; other orgs may need more or fewer)

---

## Layer 2: Workflow States

The routing logic that determines which marketplace items surface when. This is the personalization engine.

**Schema:** `Stage → Goal[] → Step[] → SessionType[]`

Each `SessionType` maps to a marketplace item (plugin, skill, or session template). The state machine determines which items are "recommended" vs "available" vs "hidden" for a given org at a given moment.

**NR Implementation (current state):**

| Stage | Goals | Session Types |
|-------|-------|--------------|
| Formation | Define founding team dynamics, establish knowledge infrastructure | Founder kernel workshop, knowledge loop setup |
| Pre-Seed → Seed | Cap table modeling, market positioning | Cap table session, competitive deep-dive, positioning workshop |
| Seed → Series A | Productize core offering, scale team operations | Product architecture session, pricing workshop, comms template buildout, onboarding session design |

NR's workflow states are currently implicit — the team runs sessions based on what they need. This architecture makes them explicit and routable.

**Cogs Abstraction:**

```
OrgProfile {
  id: string
  stage: CompanyStage          // Drives marketplace filtering
  goals: Goal[]                // Active goals within stage
  completedSteps: StepRef[]    // Progress tracking
  teamSize: number             // Affects which sessions are relevant
  industry: string             // Optional vertical filtering
}

CompanyStage {
  id: string
  name: string
  description: string
  goals: Goal[]
  transitions: StageTransition[]  // When does this stage end?
}

Goal {
  id: string
  name: string
  steps: Step[]
  relevantSessions: SessionRef[]
  completionCriteria: string
}
```

Each Cogs customer defines their own stages (or picks from templates: "SaaS Startup", "Agency", "Enterprise Team", etc.). The state machine is the same; the content differs.

**Key design decision:** Stages are not strictly linear. An org can have multiple active goals across stages. The state machine is a filter, not a funnel — it surfaces relevant items without hiding everything else.

---

## Layer 3: Context Retrieval Stack

Four sub-layers, from executable skills down to persistent storage. Each is a generalization point.

### 3a. Skills (Executable Knowledge)

Skills are instructions that guide Claude through workflows. They activate on natural language triggers, pull in supporting files, and compose with each other.

**NR Implementation:** Seven skills — load-context (with intent construction, gap reporting, contradiction handling), share-with-team (with authority tagging), founder-agents, internal-comms, assess-state, ai-security-audit (pre-push security gate + full org audit), pre-publish (doc consistency → security gate → version bump pipeline). Each is a SKILL.md file with frontmatter triggers, workflow instructions, and references to supporting assets (personality kernels, template examples).

**Cogs Interface:** `SkillBundle` — a portable set of SKILL.md files with triggers, workflows, and supporting assets. Skills declare their dependencies (MCPs, other skills, context sources) and their outputs (artifacts, knowledge entries, decisions).

**Generalization notes:** The skill format is already portable — it's markdown with frontmatter. What Cogs adds is a dependency declaration and a composition model. A session template can specify "this session uses skills X, Y, Z from plugins A, B, C" and the marketplace resolves the graph at install time.

### 3b. Loading Techniques

How context enters the session window.

**NR Implementation:** Intent-aware, index-first retrieval (construct intent → read Context Index → pre-load foundational docs → score remaining by archetype → fetch selectively). Three loading modes: general briefing (Orient), topic-specific lookup (Explore), session priming (archetype inferred from task). Foundational docs bypass scoring and pre-load when domain matches. Exploratory docs are deprioritized and flagged when included.

**Cogs Interface:** `ContextLoader` — pluggable strategies for pulling org knowledge into sessions.

Available techniques (NR uses the first three; Cogs supports all):

1. **Index-first scan** — read a table of contents, fetch selectively. Best for structured knowledge bases with < 200 items.
2. **Search-fallback** — keyword search against the knowledge base when the index doesn't match. Degrades gracefully.
3. **Progressive disclosure** — summary first, detail on demand. Preserves context window budget.
4. **Vector retrieval** — embed queries and knowledge entries, retrieve by semantic similarity. Best for large, unstructured knowledge bases (500+ items).
5. **Hybrid** — index-first for known categories + vector for open-ended queries. Best of both.
6. **Workflow-triggered** — the state machine automatically loads context relevant to the current step. Zero user friction.

### 3c. Mapping Techniques

How the system decides what context is relevant.

**NR Implementation (v0.3.0):** Intent-aware filtering across seven signals. The retrieval system constructs an IntentPayload (archetype, goal, entity type, domain) before scoring, then uses it to route context selection.

**Cogs Interface:** `RelevanceEngine` — pluggable scoring that combines multiple signals.

Scoring signals:

- **Category match** — does this doc's category match the task's domain?
- **Recency** — how old is this entry? Recent entries weighted higher for briefings.
- **Context type** — task priming prefers Decisions and References over Explorations.
- **Context authority** — foundational docs pre-load unconditionally (bypass scoring); exploratory docs carry a deprioritization penalty and are flagged when served.
- **Archetype affinity** — different archetypes weight different context types. Decide → Decision + Reference. Build → Reference + Artifact. Orient → even distribution.
- **Semantic similarity** — how close is the doc's embedding to the query's embedding?
- **Workflow affinity** — does this doc's metadata map to the current stage/goal/step?
- **Author relevance** — was this doc created by a relevant team member for the current task?

NR currently uses signals 1-5 by default (manual, index-first, intent-aware). Gap reporting surfaces missing context per archetype. Contradiction detection flags conflicting docs rather than silently serving both. A standalone Gemini embedding service provides an opt-in vector path for signal 6 (semantic retrieval), with automatic fallback to index-first if the vector API fails or quality degrades. Cogs can offer signals 6-8 as configurable upgrades.

### 3d. Knowledge Backends

Where org knowledge lives persistently.

**NR Implementation:** Notion Document Hub (database + Context Index page) + GitHub Pages (rich file hosting via File Share MCP).

**Cogs Interface:** `KnowledgeBackend` — any system that stores, retrieves, and indexes team knowledge.

Supported backends (Cogs should offer adapters for):

- Notion databases (NR's choice)
- Google Drive (common for non-technical teams)
- GitHub repos (common for engineering teams)
- Confluence (enterprise)
- Vector stores — Pinecone, Weaviate, Qdrant (for semantic retrieval)
- Custom APIs (for orgs with existing knowledge systems)
- Hybrid — structured DB for metadata + vector store for semantic search

### Implemented Vector Retrieval Path (NR)

Current implementation contract for semantic retrieval:

1. Extract Notion Knowledge Base pages.
2. Chunk content deterministically with chunking version metadata.
3. Generate embeddings via `gemini-embedding-2-preview` with a `60 RPM` limiter.
4. Store vectors in PostgreSQL + pgvector with watermark-based incremental refresh.
5. Serve semantic search through a retrieval API (`/search`), with consumer-side fallback to index-first retrieval.

---

## Layer 4: Session Packaging

How to turn ad-hoc sessions into repeatable, installable experiences. The session template is the atomic unit of the marketplace.

### Session Template Schema

```
SessionTemplate {
  id: string
  name: string
  description: string
  triggers: string[]              // NL phrases that activate this session

  // Context requirements
  context: {
    required: ContextRef[]        // Must be loaded before session starts
    optional: ContextRef[]        // Loaded if available
    userInput: InputField[]       // Gathered from user at session start
  }

  // Workflow definition
  workflow: {
    steps: WorkflowStep[]        // Ordered steps, can include branching
    skills: SkillRef[]           // Skills this session composes
    checkpoints: Checkpoint[]    // Points where user confirms direction
  }

  // Output packaging
  outputs: {
    artifacts: ArtifactSpec[]    // What gets produced
    shareTargets: ShareTarget[]  // Where outputs go (hub, file share, etc.)
  }

  // Marketplace metadata
  metadata: {
    stages: CompanyStage[]       // When this session is relevant
    goals: GoalRef[]             // Which goals it serves
    author: string
    version: string
    estimatedDuration: string    // "30 min", "1 hour", etc.
  }
}
```

### NR Sessions to Package

| Session | Source | Status | Stage | Skills Used |
|---------|--------|--------|-------|-------------|
| Cap Table Modeling | Kelly's ad-hoc session | Candidate | Pre-Seed → Seed | load-context, founder-agents, share-with-team |
| Competitive Deep-Dive | Multiple sessions | Candidate | Seed → Series A | load-context, share-with-team |
| Founder Panel Review | Regular pattern | Candidate | All | founder-agents, load-context |
| 3P Update Generation | Weekly pattern | Candidate | All | internal-comms, load-context |
| New Member Onboarding | Not yet run | Design needed | All | load-context |

### Packaging Process (how to turn an ad-hoc session into a template)

1. **Identify the pattern** — which sessions does the team run repeatedly? What's the common structure?
2. **Extract the workflow** — what are the steps? Where does the user make decisions? What context is needed?
3. **Declare dependencies** — which skills, MCPs, and context sources does this session need?
4. **Define outputs** — what artifacts does this session produce? Where do they go?
5. **Map to stages/goals** — when is this session relevant in the org's lifecycle?
6. **Test with the team** — run the packaged session 2-3 times, refine based on friction points.
7. **Publish to marketplace** — make it installable for other team members (NR) or other orgs (Cogs).

---

## Layer 5: Marketplace

The discovery, installation, and composition surface.

### Item Types

| Type | Description | NR Examples | Cogs Examples |
|------|-------------|-------------|---------------|
| **Plugin** | Bundle of skills, context, MCPs. The OS. | New Radicle OS (7 skills, 3 kernels, 4 templates) | "SaaS Starter Kit", "Agency OS", "Engineering Team Pack" |
| **Session** | Repeatable workflow with context + outputs. | Cap table modeling, competitive deep-dive | "Board deck prep", "Sprint retro", "Customer interview synthesis" |
| **MCP** | External service connector. | File Share Server | Google Drive adapter, Slack connector, CRM bridge |
| **Kernel** | Agent personality. Cognitive patterns encoded. | Rebecca, Johny, Kelly founder kernels | Customer personas, domain expert simulations, leadership archetypes |

### Composition Model

`Marketplace → Plugin[] → (Skill[] + MCP[] + Kernel[])`

Sessions compose across plugins. A cap table session might use skills from a finance plugin, kernels from the org's founder plugin, and MCPs from a data connector plugin. The marketplace resolves this dependency graph at install time.

### Marketplace Operations

**Discovery:** Browse by stage + goal. Filter by item type. Search by keyword. Recommended items surface based on `OrgProfile.stage` and active goals.

**Installation:** Install resolves dependencies. "Install this session" = install its required skills + configure its context sources + connect its MCPs. One click, full setup.

**Composition:** Installed items can reference each other. Skills from Plugin A can be used in Sessions from Plugin B. Kernels are available to any skill that needs agent simulation. MCPs are shared across all skills.

**Updates:** Plugins version independently. Marketplace shows available updates. Breaking changes are flagged. Orgs can pin versions.

### Cogs Marketplace Infrastructure

What Cogs provides as a platform:

- **Marketplace shell** — the UI for browsing, installing, and managing items
- **Dependency resolver** — automatically installs required skills, MCPs, and context sources
- **Stage templates** — pre-built stage progressions for common org types (SaaS, Agency, Enterprise)
- **Org profile manager** — tracks stage, goals, team size, and drives personalization
- **Publishing pipeline** — how item authors submit, review, and publish marketplace items
- **Telemetry** — which items are installed, used, and valued (with consent)

What each org provides:

- **Their own items** — skills, sessions, kernels specific to their team
- **Their knowledge backend** — where their persistent context lives
- **Their org profile** — stage, goals, team composition
- **Community contributions** — items they publish back to the shared marketplace

---

## Generalization Summary

| NR Concrete | Cogs Abstract | Interface |
|-------------|---------------|-----------|
| Notion Document Hub | Any knowledge backend | `KnowledgeBackend` |
| Context Index (flat page) | Any indexing strategy | `IndexStrategy` |
| 5 categories | Org-defined taxonomy | `MetadataSchema` |
| share-with-team skill | Share pipeline | `ShareTarget` |
| load-context skill | Context loading | `ContextLoader` |
| Founder personality kernels | Agent kernels | `AgentKernel` |
| Ad-hoc sessions | Session templates | `SessionTemplate` |
| Single plugin install | Marketplace catalog | `MarketplaceCatalog` |
| Implicit workflow states | Explicit state machine | `OrgProfile + CompanyStage` |

The pattern is consistent: NR made a concrete choice at each layer. Cogs abstracts that choice into an interface, making it configurable per org. NR becomes the reference implementation — the proof that the abstractions work.

---

## Trigger Architecture (Addendum)

Triggers are the routing layer between "user says something" and "marketplace serves the right experience." At four skills, flat phrase lists work. At forty, they collide. The trigger system has three layers and six task archetypes.

### Three Trigger Layers

**Layer 1 — Phrase triggers.** Direct phrase match. User says "cap table" → cap table session activates. This is what NR has today in SKILL.md descriptions. Works at small scale, collision-prone at marketplace scale.

**Layer 2 — Intent triggers.** User describes a goal without using a skill's magic words. "I need to figure out how dilution works if we raise at 10M" maps to the cap table session by intent, not phrase. Each session template declares intent patterns as semantic fields: `domain + action + object`. The marketplace matches on intent signatures, not string equality.

**Layer 3 — State triggers.** No user input needed. The marketplace surfaces items based on `OrgProfile.stage` and active goals. Pre-seed companies see cap table sessions as "recommended." State triggers are additive (they suggest, not gate).

### Six Task Archetypes

Every user request maps to one of these. The archetype is the universal routing layer — org-specific content plugs into it.

| Archetype | Description | NR Skills | Example Sessions |
|-----------|-------------|-----------|-----------------|
| **Orient** | Getting situated, loading context | load-context | General briefing, topic deep-load, onboarding |
| **Explore** | Research, mapping, discovery | (none yet) | Competitive deep-dive, market mapping |
| **Decide** | Evaluation, modeling, trade-offs | (founder-agents as proxy) | Cap table modeling, pricing workshop |
| **Build** | Creation, drafting, prototyping | internal-comms | 3P update, board deck prep, product spec |
| **Review** | Feedback, pressure-testing | founder-agents | Founder panel, pre-send review |
| **Share** | Publishing, making work available | share-with-team | Document Hub share, team broadcast |

These follow the natural work loop: Orient → Explore → Decide → Build → Review → Share → (loop back).

### Resolution Rules

1. Phrase match wins over intent match
2. Intent match wins over state surfacing
3. Archetype disambiguates collisions (e.g., "run this by the team" — produced something? Share. Evaluating something? Review.)
4. State triggers are additive, never blocking
5. Multi-match prompts selection (present top 2-3 to user)
6. Composed triggers chain (a session can trigger another session's skill as a sub-step)

### TriggerSpec Schema

```
TriggerSpec {
  // Layer 1
  phrases: string[]
  keywords: string[]

  // Layer 2
  archetype: Orient | Explore | Decide | Build | Review | Share
  intentPatterns: string[]
  domain: string[]
  action: string[]
  object: string[]

  // Layer 3
  stages: CompanyStage[]
  goals: GoalRef[]
  timeTriggers: TimeTrigger[]
  eventTriggers: EventTrigger[]

  // Resolution
  priority: number
  exclusive: boolean
  composable: boolean
}
```

### Migration Path

Start by adding `archetype` and `domain/action/object` to NR's existing SKILL.md descriptions. Backward-compatible — Claude's phrase matching still works, but structured fields enable intent matching and collision resolution. State triggers come when OrgProfile is built.

---

## Structured Intake System (Addendum)

AskUserQuestion isn't a one-off convenience — it's marketplace infrastructure. Four structured gates enforce decision points throughout the session flow, replacing Claude's improvisation with declared, repeatable questions.

### Four Gates

**Gate 0 — Org Profile Setup** (Cogs only, one-time). Before the state machine can route, it needs to know who the org is. AskUserQuestion collects stage, active goals, and team shape. This builds the OrgProfile that drives all Layer 3 (state) triggers.

**Gate 1 — Trigger Disambiguation.** When multiple sessions match with similar confidence, the marketplace router fires AskUserQuestion to let the user choose. This replaces Claude guessing. The key design choice: offer a "compose" option when candidates span different archetypes ("Get founder perspectives, THEN share to hub").

**Gate 2 — Session Intake.** Each session template declares its required inputs as structured questions. Fired on session init, after context auto-loads. Questions can be conditional (show Q3 only if Q1 was answered "priced round"), can auto-fill from loaded context (`defaultFromContext`), and can be skipped entirely if context already provides the answer (`skipIf`).

**Gate 3 — Mid-Session Checkpoints.** Declared in the workflow definition. Fire at pre-defined moments — typically after a modeling or analysis step completes. Options can chain to other sessions ("Run founder panel"), add dynamic steps ("Add a 4th scenario"), or advance to output packaging. Checkpoints can auto-advance if a condition is met.

### Design Principle

Questions are authored once and fired many times. The session author designs the intake; the user just answers. This is the difference between "a skill Claude improvises with" and "a product experience the org can rely on." For Cogs, intake schemas are the primary customization surface — orgs can tweak questions without touching workflow logic.

### Key Schema Additions to SessionTemplate

```
SessionTemplate (updated) {
  intake: {
    questions: IntakeQuestion[]
    contextPreload: ContextRef[]
    skipIf: SkipCondition[]
  }

  IntakeQuestion {
    header: string                    // Max 12 chars
    question: string
    options: IntakeOption[] {
      label: string
      description?: string
      setsParam: string               // Maps answer to session parameter
      value: any
    }
    multiSelect?: boolean
    conditional?: {
      dependsOn: string               // Header of prerequisite question
      showWhen: string | string[]
    }
    defaultFromContext?: {
      contextField: string
      fallback: string
    }
  }

  workflow.checkpoints: Checkpoint[] {
    afterStep: number
    condition?: string
    header: string
    question: string
    options: CheckpointOption[] {
      label: string
      description: string
      goTo: number | "next" | "end"
      chainSession?: string
      addSteps?: WorkflowStep[]
    }
    autoAdvance?: {
      condition: string
      defaultOption: number
    }
  }
}
```

---

## What to Build Next

**Immediate (NR):**
1. Package Kelly's cap table session as the first `SessionTemplate`
2. ~~Make workflow states explicit — add stage/goal metadata to Document Hub entries~~ Partially done: Context Authority and Context System Type fields now live on the Knowledge Base. Full workflow state metadata (stage/goal) deferred to v0.4.0.
3. ~~Add stage-aware filtering to load-context~~ Done (v0.3.0): Intent construction with archetype-aware filtering, authority-based pre-loading, gap reporting, and contradiction handling are shipped.

**Near-term (Cogs foundation):**
4. Define the `SessionTemplate` schema as a formal spec (JSON Schema or similar)
5. Build a second knowledge backend adapter (Google Drive) to prove the `KnowledgeBackend` interface works
6. Design the dependency resolution algorithm for cross-plugin composition

**Medium-term (Cogs product):**
7. Build the marketplace shell UI
8. Create 2-3 stage templates ("SaaS Startup", "Agency", "Enterprise Team")
9. Publish NR OS as the first marketplace listing
10. Design the publishing pipeline for community items
